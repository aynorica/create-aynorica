# create-aynorica

> Scaffold the Aynorica mental model into any project

**Aynorica** is a systematic problem solver agent for VS Code's GitHub Copilot Chat. This CLI tool copies the complete `.github` configuration structure into your project.

## Quick Start

```bash
npx create-aynorica
```

That's it. The tool will:

1. Ask for your name, email, and timezone
2. Download the latest Aynorica mental model from GitHub
3. Create the `.github` folder in your target directory

## What Gets Installed?

```
.github/
├── .aynorica-config.json      # Adaptation state
├── agents/
│   └── aynorica.agent.md      # Agent definition for VS Code
├── instructions/              # 9 core instruction files
│   ├── identity.instructions.md
│   ├── functions.instructions.md
│   ├── debug-principle.instructions.md
│   └── ...
├── prompts/                   # 14 prompt domains
│   ├── architecture/
│   ├── backend/
│   ├── testing/
│   ├── security/
│   └── ...
└── project/                   # Session state & examples
    ├── mental-model-map.md
    └── examples/
```

## After Installation

1. **Open the project in VS Code**
2. **Switch to 'aynorica' agent mode** in Copilot Chat
3. **Say:** `Adapt to this project` — Aynorica will analyze your stack and optimize

## CLI Options

```bash
npx create-aynorica [options]

Options:
  -d, --dir <path>   Target directory (defaults to current)
  -o, --overwrite    Overwrite existing files
  --debug            Enable debug logging
  --silent           Suppress output
  -V, --version      Show version
  -h, --help         Show help
```

## Examples

```bash
# Install in current directory
npx create-aynorica

# Install in specific project
npx create-aynorica -d ./my-project

# Update existing installation
npx create-aynorica -o
```

## Requirements

- Node.js >= 18.0.0
- Internet connection (fetches latest from [aynorica-os](https://github.com/aynorica/aynorica-os))

## How It Works

1. Fetches all `.github` files from `aynorica/aynorica-os` repo
2. Replaces `{{PLACEHOLDERS}}` with your info
3. Writes files to target directory
4. Resets `adapted: null` so first-run adaptation triggers

## Troubleshooting

| Error | Solution |
|-------|----------|
| Directory not writable | Check permissions or choose different path |
| Cannot reach GitHub | Check internet, try again |
| File already exists | Use `-o` flag to overwrite |

## License

MIT © Amir Daryabari
