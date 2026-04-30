# VTT para TXT

Converta arquivos de legenda `.vtt` em texto simples formatado.

Especialmente util para converter transcrições do Microsoft Teams para texto legível

## Formato de saída

```
HH:MM:SS Falante: Texto da legenda
```

## Configuração

### Pré-requisitos

- [Bun](https://bun.sh) instalado

### Instalação

```bash
bun install
```

### Servidor de desenvolvimento

```bash
bun run dev
```

Acesse `http://localhost:4321`.

## Build

```bash
bun run build
```

Os arquivos de produção ficam em `dist/`.

## Deploy no Cloudflare Pages

1. Conecte o repositório no [Cloudflare Pages](https://pages.cloudflare.com)
2. Configure o projeto:
   - **Framework preset:** Astro
   - **Build command:** `bun run build`
   - **Output directory:** `dist`
   - **Node.js version:** não necessário (build estático)
3. Clique em **Save and Deploy**

## Stack

- [Bun](https://bun.sh) — runtime e gerenciador de pacotes
- [Astro](https://astro.build) — framework web
- [Svelte 5](https://svelte.dev) — componentes reativos
- [TailwindCSS](https://tailwindcss.com) — estilização
