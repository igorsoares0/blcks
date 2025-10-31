# 📸 Screenshot Generation Guide

Este guia explica como gerar screenshots automaticamente de todos os blocos para usar como previews na listagem.

## 🚀 Como usar

### 1. Inicie o servidor de desenvolvimento

Primeiro, certifique-se de que o Next.js está rodando:

```bash
npm run dev
```

O servidor deve estar rodando em `http://localhost:3000`

### 2. Execute o script de geração

Em **outro terminal**, execute:

```bash
npm run generate-screenshots
```

### 3. Aguarde o processo

O script irá:
- ✅ Buscar a lista de blocos via API
- ✅ Abrir cada bloco em uma página isolada
- ✅ Tirar um screenshot de 1200x675px (16:9)
- ✅ Salvar em `public/previews/{categoria}/{id}.png`

**Tempo estimado**: ~2-3 minutos para 108 blocos

## 📁 Estrutura gerada

Após a execução, você terá:

```
public/
└── previews/
    ├── navbar/
    │   ├── navbar-1.png
    │   ├── navbar-2.png
    │   └── ...
    ├── hero/
    │   ├── hero-1.png
    │   ├── hero-2.png
    │   └── ...
    ├── features/
    ├── cta/
    ├── footer/
    └── ... (todas as categorias)
```

## ⚙️ Configuração

Você pode customizar o script editando `scripts/generate-screenshots.js`:

```javascript
const SCREENSHOT_WIDTH = 1200;      // Largura do screenshot
const SCREENSHOT_HEIGHT = 675;      // Altura do screenshot (16:9)
const BASE_URL = 'http://localhost:3000';  // URL do servidor
```

## 🔧 Troubleshooting

### Erro: "Failed to fetch blocks"
**Solução**: Certifique-se de que o servidor Next.js está rodando em `http://localhost:3000`

### Erro: "Failed to screenshot X"
**Solução**:
- Verifique se o bloco existe em `/preview/[blockId]`
- Verifique se o componente está renderizando corretamente
- Verifique o console para erros específicos

### Screenshots ficam cortados
**Solução**: Ajuste `SCREENSHOT_HEIGHT` no script para capturar mais conteúdo

### Puppeteer não instala no Windows/WSL
**Solução**:
```bash
npm install -D puppeteer --unsafe-perm=true --allow-root
```

## 🎨 Melhorias futuras

- [ ] Adicionar modo dark/light para screenshots
- [ ] Gerar screenshots em múltiplas resoluções
- [ ] Adicionar watermark nos previews
- [ ] Comprimir imagens automaticamente
- [ ] Gerar apenas blocos específicos (filtro por categoria)

## 📝 Notas

- Os screenshots são gerados em **alta qualidade** (2x deviceScaleFactor)
- O script pula blocos que falharem e continua com os próximos
- Você pode rodar o script quantas vezes quiser (sobrescreve existentes)
- As imagens são automaticamente usadas pelo componente `BlockPreviewThumbnail`
