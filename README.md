# create-aynorica

> Scaffold a new Aynorica-powered project in seconds

## Installation

No installation needed! Use `npx`:

```bash
npx create-aynorica my-project
```

## Usage

### Interactive Mode (Recommended)

```bash
npx create-aynorica my-project
# → Answer prompts for customization
```

### Quick Start (Skip Prompts)

```bash
npx create-aynorica my-project --skip-prompts
# → Uses default values
```

## What Gets Created?

Your project will have:

-   `.github/instructions/` - Personalized Aynorica instructions
-   `.github/prompts/` - Reusable prompt templates
-   `.github/workflows/` - (If present in template)

## Customization

During setup, you'll be asked for:

-   Your full name
-   Email address
-   Timezone details

These values replace `{{PLACEHOLDERS}}` in instruction files.

## Requirements

-   Node.js >= 18.0.0
-   Internet connection (fetches from GitHub)

## Troubleshooting

**Error: Directory already exists**  
→ Choose a different project name or remove existing directory

**Error: Cannot reach GitHub**  
→ Check internet connection and try again

**Error: GitHub API rate limit**  
→ Wait 1 hour or authenticate with GitHub CLI

## License

MIT © Amir Daryabari
