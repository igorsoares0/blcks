# 🔐 Sistema de Autenticação - Guia de Setup

Este guia irá te ajudar a configurar o sistema de autenticação completo do Blcks.

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando
- Conta Mailgun (ou usar sandbox)
- Conta Google Cloud (para OAuth)

---

## 🚀 Setup Passo a Passo

### 1. Configurar Banco de Dados PostgreSQL

**Opção A: PostgreSQL Local**
```bash
# Instalar PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Criar banco de dados
createdb blcks

# URL de conexão
postgresql://postgres:password@localhost:5432/blcks
```

**Opção B: Supabase (Recomendado)**
1. Criar conta em [supabase.com](https://supabase.com)
2. Criar novo projeto
3. Copiar a "Connection String" em Settings > Database
4. Use a string que começa com `postgresql://postgres...`

---

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/blcks"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cole-aqui-o-secret-gerado"

# Google OAuth
GOOGLE_CLIENT_ID="seu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu-client-secret"

# Mailgun
MAILGUN_API_KEY="sua-api-key"
MAILGUN_DOMAIN="seu-domain.com"
MAILGUN_FROM="Blcks <noreply@seu-domain.com>"

# App
APP_URL="http://localhost:3000"
APP_NAME="Blcks"
```

---

### 3. Gerar NEXTAUTH_SECRET

Execute no terminal:
```bash
openssl rand -base64 32
```

Copie o resultado e cole no `.env` como `NEXTAUTH_SECRET`.

---

### 4. Configurar Mailgun

**Opção A: Sandbox (Desenvolvimento)**
1. Criar conta em [mailgun.com](https://mailgun.com)
2. Ir para Sending > Domains
3. Usar o domínio sandbox (ex: `sandboxXXX.mailgun.org`)
4. Copiar a API Key
5. Adicionar emails autorizados em "Authorized Recipients"

```bash
MAILGUN_API_KEY="sua-api-key-aqui"
MAILGUN_DOMAIN="sandboxXXX.mailgun.org"
MAILGUN_FROM="Blcks <mailgun@sandboxXXX.mailgun.org>"
```

**Opção B: Domínio Próprio (Produção)**
1. Adicionar seu domínio no Mailgun
2. Configurar DNS records (MX, TXT, CNAME)
3. Verificar domínio
4. Usar seu domínio

```bash
MAILGUN_DOMAIN="mg.seudominio.com"
MAILGUN_FROM="Blcks <noreply@seudominio.com>"
```

---

### 5. Configurar Google OAuth

1. Ir para [Google Cloud Console](https://console.cloud.google.com)
2. Criar novo projeto ou selecionar existente
3. Ir para "APIs & Services" > "Credentials"
4. Criar "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://seudominio.com/api/auth/callback/google` (prod)
7. Copiar Client ID e Client Secret

```bash
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"
```

---

### 6. Rodar Migrations do Prisma

```bash
# Gerar Prisma Client
npx prisma generate

# Criar e aplicar migrations
npx prisma migrate dev --name init

# Ver banco de dados (opcional)
npx prisma studio
```

---

### 7. Testar o Sistema

```bash
# Rodar servidor de desenvolvimento
npm run dev
```

Abra http://localhost:3000 e teste:

1. **Signup**: Criar nova conta
2. **Email Verification**: Verificar email (check console em dev)
3. **Login**: Fazer login com email/senha
4. **Google OAuth**: Login com Google
5. **Forgot Password**: Testar recuperação de senha
6. **Dashboard**: Acessar área protegida

---

## 📧 Testando Emails em Desenvolvimento

### Ver emails no console
Durante desenvolvimento, os emails também aparecem no console do terminal.

### Mailgun Sandbox
- Apenas emails autorizados em "Authorized Recipients" receberão emails
- Adicione seu email pessoal para testes

### Ferramentas úteis
- [MailHog](https://github.com/mailhog/MailHog) - SMTP server local
- [Mailtrap](https://mailtrap.io) - Serviço de email testing
- Console logs - Os links de verificação/reset aparecem no terminal

---

## 🔒 Segurança

### Checklist de Segurança

✅ **NUNCA** commitar o arquivo `.env`
✅ Usar `NEXTAUTH_SECRET` forte (32+ caracteres)
✅ HTTPS obrigatório em produção
✅ Rate limiting em produção (recomendado)
✅ Monitorar tentativas de login falhas
✅ Backup regular do banco de dados

### Em Produção

Atualize as URLs no `.env`:
```bash
NEXTAUTH_URL="https://seudominio.com"
APP_URL="https://seudominio.com"
```

Configure também:
- Mailgun com domínio próprio verificado
- Google OAuth com redirect URI de produção
- PostgreSQL com conexão segura (SSL)
- Variáveis de ambiente no host (Vercel, Railway, etc)

---

## 🗂️ Estrutura de Arquivos Criados

```
/src
├── /app
│   ├── /api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── /auth
│   │   ├── /login/page.tsx                # Página de login
│   │   ├── /signup/page.tsx               # Página de cadastro
│   │   ├── /verify-email/page.tsx         # Verificação de email
│   │   ├── /forgot-password/page.tsx      # Esqueci a senha
│   │   └── /reset-password/page.tsx       # Redefinir senha
│   ├── /dashboard/page.tsx                # Área protegida
│   └── middleware.ts                      # Proteção de rotas
│
├── /lib
│   ├── auth.ts                            # Configuração NextAuth
│   ├── db.ts                              # Cliente Prisma
│   └── /email
│       ├── mailgun.ts                     # Cliente Mailgun
│       ├── templates.ts                   # Templates HTML
│       └── send.ts                        # Funções de envio
│
├── /actions
│   ├── signup.ts                          # Cadastro
│   ├── login.ts                           # Login
│   ├── verify-email.ts                    # Verificação
│   ├── forgot-password.ts                 # Solicitar reset
│   ├── reset-password.ts                  # Resetar senha
│   └── logout.ts                          # Logout
│
├── /components
│   ├── /auth                              # Componentes de auth
│   └── /providers
│       └── session-provider.tsx           # Provider de sessão
│
└── /types
    └── next-auth.d.ts                     # TypeScript types

/prisma
└── schema.prisma                          # Schema do banco
```

---

## 🐛 Troubleshooting

### Erro: "Invalid client_id"
- Verificar `GOOGLE_CLIENT_ID` no `.env`
- Confirmar redirect URI no Google Cloud Console

### Emails não chegam
- Verificar `MAILGUN_API_KEY` e `MAILGUN_DOMAIN`
- Sandbox: adicionar email em "Authorized Recipients"
- Verificar console do terminal (logs dos emails)

### Erro: "Database connection failed"
- Verificar se PostgreSQL está rodando
- Confirmar `DATABASE_URL` no `.env`
- Testar conexão: `npx prisma db push`

### Erro: "NEXTAUTH_SECRET is not set"
- Gerar secret: `openssl rand -base64 32`
- Adicionar no `.env`

### Token de verificação expirado
- Tokens expiram em 24h (verificação) ou 1h (reset)
- Solicitar novo link
- Em desenvolvimento: ajustar tempo em `actions/signup.ts`

---

## 📚 Recursos Adicionais

- [NextAuth.js Docs](https://next-auth.js.org)
- [Prisma Docs](https://www.prisma.io/docs)
- [Mailgun Docs](https://documentation.mailgun.com)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

## 🎯 Próximos Passos

Após setup básico funcionar, você pode:

1. Customizar templates de email
2. Adicionar mais providers OAuth (GitHub, etc)
3. Implementar 2FA (autenticação de dois fatores)
4. Adicionar roles e permissões
5. Implementar rate limiting
6. Adicionar logs de auditoria
7. Configurar testes automatizados

---

**Pronto!** 🎉 Seu sistema de autenticação está configurado e funcionando!

Se tiver problemas, revise cada passo ou abra uma issue no repositório.
