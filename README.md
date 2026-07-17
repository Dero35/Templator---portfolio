# Templator

An all-in-one helper tool for customer support agents — instant template search today, with workflow roadmaps and more on the way.

Templator is a 100% offline desktop app built with Electron. Instead of hunting through chat history for that one phrasing you used last week, open the command palette, search, and copy a ready-made response in seconds.

This project started as a hands-on way to learn Electron — main/renderer/preload processes, IPC, contextBridge, the whole model — and grew into a genuinely useful tool along the way.

## Features

- **Fast, keyboard-driven search** — a command palette searches templates by title, body, and tags as you type
- **Fully offline** — all data lives in a local SQLite database; no network calls, no accounts, no telemetry
- **Template management** — add, edit, and delete templates, organized with categories and tags
- **One-click copy** — preview a template and copy it to your clipboard in a click

## Roadmap

Planned for future releases:

- **Workflow roadmaps** — step-by-step guidance for handling a support case before escalating a ticket to the second line
- More to come

## Tech Stack

- [Electron](https://www.electronjs.org/) — cross-platform desktop shell
- [React 19](https://react.dev/) + TypeScript — renderer UI
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — accessible, customizable component primitives
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — local, offline data storage

## Getting Started

```bash
# Install dependencies
npm install

# Rebuild the native SQLite binding for Electron's Node ABI
npm run rebuild

# Start the app in development mode (hot reload for renderer and main/preload)
npm run dev
```

## Building

```bash
npm run build
```

## License

MIT © Dero35 — see [LICENSE](./LICENSE) for details.
