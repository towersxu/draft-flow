# Copilot Instructions for draft-flow

## Project Overview

This is a hand-drawn style flowchart library based on [LogicFlow](https://github.com/didi/LogicFlow) and [rough.js](https://github.com/rough-stuff/rough). The project uses a monorepo structure managed by pnpm.

## Repository Structure

- `packages/lf-rough/` - The main library that provides rough/hand-drawn style nodes and edges for LogicFlow
- `packages/website/` - A Vue 3 demo website showcasing the library

## Tech Stack

- **Package Manager**: pnpm (v8.9.0+)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Framework**: Vue 3 (for website)
- **Core Dependencies**: LogicFlow, rough.js

## Development Commands

```bash
# Initial setup - install dependencies and build
pnpm run setup

# Build all packages
pnpm run build

# Development (in specific package directory)
cd packages/lf-rough && pnpm run dev
cd packages/website && pnpm run dev
```

## Code Style Guidelines

- Use TypeScript for all source files
- Follow the existing code structure when adding new nodes or edges
- Node components should extend LogicFlow base classes
- Edge components should follow the RoughPolyline pattern

## Adding New Components

When adding new rough-style nodes:
1. Create a new file in `packages/lf-rough/src/nodes/`
2. Follow the naming convention: `Rough[ComponentName].ts`
3. Register the component in `packages/lf-rough/src/index.ts`

When adding new rough-style edges:
1. Create a new file in `packages/lf-rough/src/edges/`
2. Follow the naming convention: `Rough[EdgeName].ts`
3. Register the edge in `packages/lf-rough/src/index.ts`

## Build Outputs

The library outputs are:
- `es/` - ES modules
- `cjs/` - CommonJS modules

These are generated during build and should not be committed (already in `.gitignore`).

## Testing

Currently, there is no automated test infrastructure. When adding features, manually verify changes using the website demo.

## Documentation

- Main documentation is in Chinese (Chinese speakers are the primary audience)
- Update `readme.md` when adding significant features
