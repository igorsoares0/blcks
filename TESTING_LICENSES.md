# 🧪 Testing License Logic

Este guia mostra como testar a lógica de permissões de licença **sem precisar do Stripe**.

## 📋 Pré-requisitos

1. App rodando (`npm run dev`)
2. Banco de dados configurado
3. Conta de usuário criada no app

---

## 🚀 Como Testar

### 1. Criar conta no app

Vá para http://localhost:3000/auth/signup e crie uma conta:
- Email: `test@example.com`
- Nome: `Test User`
- Senha: qualquer uma

**Importante:** Verifique o email usando o link que aparece no console.

---

### 2. Criar Licença Fake

**Para licença Individual ($49):**
```bash
npx tsx scripts/test-license-logic.ts create test@example.com individual
```

**Para licença Team ($149):**
```bash
npx tsx scripts/test-license-logic.ts create test@example.com team
```

Você verá:
```
✅ Found user: Test User (clxxx...)
📝 Creating individual license...
✅ License created: clyyy...
✅ User cache updated

🎉 Test license created successfully!
```

---

### 3. Testar Acesso

**Opção A: No navegador**

1. Faça login com a conta criada
2. Vá para a home page
3. Tente acessar blocos premium (hero-3, about-3, etc)
4. Você deve conseguir ver todos os blocos!

**Opção B: Via script**
```bash
npx tsx scripts/test-license-logic.ts test test@example.com
```

Você verá:
```
📊 User: Test User (clxxx...)

✅ Has Active License: true
📋 License Type: individual

🎫 License Details:
  - ID: clyyy...
  - Type: individual
  - Status: active
  - Is Owner: true

🔐 Testing Block Access:
  hero-1 (free): ✅ Accessible
  hero-3 (premium): ✅ Accessible
  about-1 (free): ✅ Accessible
  about-3 (premium): ✅ Accessible
```

---

### 4. Testar SEM Licença

**Limpar licença:**
```bash
npx tsx scripts/test-license-logic.ts cleanup test@example.com
```

Agora:
1. Recarregue a página no navegador
2. Blocos premium devem estar bloqueados 🔒
3. Apenas blocos free devem estar acessíveis

---

### 5. Listar Todas as Licenças

```bash
npx tsx scripts/test-license-logic.ts list
```

Mostra todas as licenças ativas no banco:
```
📋 All Active Licenses:

1. Test User (test@example.com)
   Type: individual
   Status: active
   Purchased: 10/21/2025

2. Another User (user2@example.com)
   Type: team
   Status: active
   Purchased: 10/21/2025
   Team: 3/5 seats
```

---

## 🧪 Cenários de Teste

### Teste 1: Usuário sem licença
```bash
# Garantir que não tem licença
npx tsx scripts/test-license-logic.ts cleanup test@example.com

# Testar
npx tsx scripts/test-license-logic.ts test test@example.com
```

**Esperado:**
- Has Active License: `false`
- License Type: `none`
- Premium blocks: `🔒 Locked`

---

### Teste 2: Licença Individual
```bash
# Criar licença individual
npx tsx scripts/test-license-logic.ts create test@example.com individual

# Testar
npx tsx scripts/test-license-logic.ts test test@example.com
```

**Esperado:**
- Has Active License: `true`
- License Type: `individual`
- Premium blocks: `✅ Accessible`

---

### Teste 3: Licença Team
```bash
# Criar licença team
npx tsx scripts/test-license-logic.ts create test@example.com team

# Testar
npx tsx scripts/test-license-logic.ts test test@example.com
```

**Esperado:**
- Has Active License: `true`
- License Type: `team`
- Team Members: `1/5 seats` (só o owner)
- Premium blocks: `✅ Accessible`

---

## 📊 Estatísticas Esperadas

### Sem Licença
- Total blocks: 110
- Accessible: 33 (free)
- Locked: 73 (premium)

### Com Licença (Individual ou Team)
- Total blocks: 110
- Accessible: 110 (todos)
- Locked: 0

---

## 🐛 Troubleshooting

### Erro: "User not found"
**Solução:** Crie a conta no app primeiro em /auth/signup

### Erro: "Cannot find module"
**Solução:** Certifique-se de rodar `npm install -D tsx`

### Licença não está funcionando no app
**Solução:**
1. Faça logout e login novamente
2. Limpe o cache do navegador
3. Verifique se o usuário está autenticado

---

## 🔄 Workflow de Teste Completo

```bash
# 1. Criar conta no app
# Ir para http://localhost:3000/auth/signup

# 2. Testar SEM licença (deve bloquear premium)
npx tsx scripts/test-license-logic.ts test test@example.com

# 3. Criar licença
npx tsx scripts/test-license-logic.ts create test@example.com individual

# 4. Testar COM licença (deve liberar tudo)
npx tsx scripts/test-license-logic.ts test test@example.com

# 5. Limpar quando terminar
npx tsx scripts/test-license-logic.ts cleanup test@example.com
```

---

## ✅ Checklist de Validação

Antes de integrar com Stripe, validar:

- [ ] Usuário sem licença vê apenas blocos free
- [ ] Usuário sem licença vê badge "Premium 🔒" nos blocos pagos
- [ ] Criar licença individual funciona
- [ ] Criar licença team funciona
- [ ] Usuário com licença vê todos os blocos
- [ ] Cache do usuário (hasActiveLicense) está sincronizado
- [ ] Limpar licença remove acesso aos blocos premium
- [ ] Script de teste funciona sem erros

---

**Próximo passo:** Quando tudo estiver funcionando, integrar com Stripe (Fase 4)! 🚀
