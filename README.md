# Saber Espírita - Calendário Instagram

Este projeto é uma aplicação web dedicada à visualização de um calendário com conteúdo espírita, desenvolvido com foco em um design moderno, minimalista e responsivo.

## 🎨 Design e Conceito

O projeto segue a filosofia de **Minimalismo Espiritual Moderno**, buscando clareza, serenidade e funcionalidade.

- **Cores**: Azul profundo, Dourado suave, Branco e Cinza neutro.
- **Tipografia**: Playfair Display (títulos) e Inter (corpo).
- **Elementos**: Ícones sutis, espaço negativo generoso e foco na leitura.

Para mais detalhes sobre as decisões de design, consulte o arquivo [ideas.md](./ideas.md).

## 🚀 Tecnologias Utilizadas

### Frontend (`client`)

- **React** (v19)
- **Vite** (Build tool e servidor de desenvolvimento)
- **TailwindCSS** (Estilização)
- **shadcn/ui** (Componentes de UI reutilizáveis baseados em Radix UI)
- **wouter** (Roteamento leve)
- **React Query** / **Zod** / **React Hook Form** (Gerenciamento de estado e formulários)

### Backend (`server`)

- **Node.js** com **Express**
- Serve os arquivos estáticos do frontend em produção.
- Preparado para expansão de API.

## 🛠️ Pré-requisitos

- **Node.js** (versão LTS recomendada, ex: v18 ou v20)
- **pnpm** (Gerenciador de pacotes utilizado no projeto)

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd SaberEspirita-Insta
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

## ▶️ Como Rodar

### Desenvolvimento

Para iniciar o servidor de desenvolvimento (frontend):

```bash
pnpm run dev
```

O app estará disponível em `http://localhost:5173` (ou porta similar).

### Produção

Para construir o projeto e rodar o servidor de produção (que serve o frontend buildado):

```bash
pnpm run build
pnpm run start
```

## 📂 Estrutura do Projeto

- **/client**: Código fonte do frontend React.
  - **/src/components**: Componentes reutilizáveis.
  - **/src/pages**: Páginas da aplicação (Home, NotFound, etc).
  - **/src/hooks**: Custom hooks.
- **/server**: Código fonte do servidor Express.
- **/shared**: Tipos e utilitários compartilhados entre client e server.
