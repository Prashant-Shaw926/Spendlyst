# Spendlyst Technical Docs

This folder contains the deeper technical documentation for Spendlyst. The root [README](../README.md) is the quickest way to understand the project at a high level. The files below are intended for reviewers, collaborators, and future maintainers who need more implementation detail.

## Documentation Map

| File | Purpose |
| --- | --- |
| [../README.md](../README.md) | Project overview, assignment fit, quick start, and current status |
| [setup.md](setup.md) | Local environment setup, install steps, native notes, and troubleshooting |
| [architecture.md](architecture.md) | App bootstrap, navigation, store composition, hydration, and responsibilities |
| [folder-structure.md](folder-structure.md) | Directory layout and ownership rules |
| [api-setup.md](api-setup.md) | Mock API flow, persistence, state updates, and runtime data sources |
| [features-and-flows.md](features-and-flows.md) | Screen-by-screen behavior, user journeys, and app states |
| [theme-setup.md](theme-setup.md) | Theme tokens, responsive scale, and styling conventions |

## Recommended Reading Order

If you are seeing the project for the first time, use this order:

1. [../README.md](../README.md)
2. [setup.md](setup.md)
3. [architecture.md](architecture.md)
4. [features-and-flows.md](features-and-flows.md)
5. [api-setup.md](api-setup.md)
6. [folder-structure.md](folder-structure.md)
7. [theme-setup.md](theme-setup.md)

## Notes

- The docs are written against the current codebase, not an earlier refactor shape.
- Spendlyst is mock-first today, so several flows are intentionally local or derived from persisted state.
- If you change project structure or runtime ownership, update these files alongside the code.
