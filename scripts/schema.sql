-- ============================================================================
-- Schema inicial — Autenticação e cadastro de usuários
--
-- Como rodar:
--   1) Neon Console → SQL Editor → colar e executar; OU
--   2) psql "$DATABASE_URL" -f scripts/schema.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabela única de usuários. Atende tanto login via Google quanto cadastro manual.
-- password_hash é NULL para usuários que entraram só via OAuth.
CREATE TABLE IF NOT EXISTS users (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(120) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    email_verified  TIMESTAMPTZ,
    image           TEXT,
    phone           VARCHAR(32),
    password_hash   VARCHAR(255),
    provider        VARCHAR(32)  NOT NULL DEFAULT 'credentials',
    provider_id     VARCHAR(255),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT users_provider_check CHECK (provider IN ('google', 'credentials'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);

-- Trigger para manter updated_at coerente.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
