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

-- ============================================================================
-- Solicitações de projeto — formulário público submetido via /api/project-requests.
-- Só o admin (email definido em ADMIN_EMAIL / lib/admin.ts) consulta via /clientes.
-- ============================================================================

CREATE TABLE IF NOT EXISTS project_requests (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID          REFERENCES users(id) ON DELETE SET NULL,
    name            VARCHAR(120)  NOT NULL,
    email           VARCHAR(255)  NOT NULL,
    phone           VARCHAR(32),
    project_type    VARCHAR(40)   NOT NULL,
    description     TEXT          NOT NULL,
    budget          VARCHAR(60),
    timeline        VARCHAR(60),
    references_info TEXT,
    status          VARCHAR(24)   NOT NULL DEFAULT 'new',
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    CONSTRAINT project_requests_type_check CHECK (
        project_type IN ('web', 'mobile', 'fullstack', 'saas', 'landing', 'other')
    ),
    CONSTRAINT project_requests_status_check CHECK (
        status IN ('new', 'contacted', 'in-progress', 'closed-won', 'closed-lost')
    )
);

CREATE INDEX IF NOT EXISTS idx_project_requests_created_at
    ON project_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_requests_status
    ON project_requests(status);
CREATE INDEX IF NOT EXISTS idx_project_requests_email
    ON project_requests(email);

DROP TRIGGER IF EXISTS trg_project_requests_updated_at ON project_requests;
CREATE TRIGGER trg_project_requests_updated_at
    BEFORE UPDATE ON project_requests
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
