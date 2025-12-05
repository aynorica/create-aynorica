/**
 * Global constants for create-aynorica
 * @module constants
 */

export const GITHUB_OWNER = "aynorica";
export const GITHUB_REPO = "aynorica-os";
export const GITHUB_BRANCH = "main";

/**
 * GitHub API endpoints
 */
export const GITHUB_API_BASE = "https://api.github.com";
export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";

/**
 * Template files to fetch and process
 * Complete .github/ directory structure from aynorica-os
 */
export const TEMPLATE_FILES = [
	// Config files
	".github/.aynorica-config.json",
	".github/.aynorica-config.schema.json",

	// Agent definition
	".github/agents/aynorica.agent.md",

	// Core instructions
	".github/instructions/amir-profile.instructions.md",
	".github/instructions/available-techstack.instructions.md",
	".github/instructions/debug-principle.instructions.md",
	".github/instructions/disagreement-protocol.instructions.md",
	".github/instructions/functions.instructions.md",
	".github/instructions/handoff.instructions.md",
	".github/instructions/honesty.instructions.md",
	".github/instructions/identity.instructions.md",
	".github/instructions/persistent-memory.instructions.md",

	// Project files
	".github/project/.gitkeep",
	".github/project/README.md",
	".github/project/mental-model-map.md",
	".github/project/session-state.md",
	".github/project/context-gathering.protocol.md",
	".github/project/conversation-alignment.protocol.md",
	".github/project/examples/context.example.md",
	".github/project/examples/focus.example.md",
	".github/project/examples/workflows.example.md",

	// Prompts - Analysis
	".github/prompts/analysis/task-prioritization.prompt.md",

	// Prompts - Architecture
	".github/prompts/architecture/adr-template.prompt.md",
	".github/prompts/architecture/trade-off-analysis.prompt.md",

	// Prompts - Backend
	".github/prompts/backend/nestjs-controller.prompt.md",
	".github/prompts/backend/nestjs-module.prompt.md",
	".github/prompts/backend/nestjs-service.prompt.md",
	".github/prompts/backend/nestjs-testing.prompt.md",

	// Prompts - CLI
	".github/prompts/cli/commander-setup.prompt.md",

	// Prompts - Database
	".github/prompts/database/prisma-patterns.prompt.md",

	// Prompts - DevOps
	".github/prompts/devops/pm2-ecosystem.prompt.md",

	// Prompts - Frontend
	".github/prompts/frontend/nextjs-app-router.prompt.md",

	// Prompts - Git
	".github/prompts/git/workflow.prompt.md",

	// Prompts - Monorepo
	".github/prompts/monorepo/turborepo-setup.prompt.md",

	// Prompts - npm
	".github/prompts/npm/package-publishing.prompt.md",

	// Prompts - Security
	".github/prompts/security/nodejs-security-hardening.prompt.md",
	".github/prompts/security/npm-package-security.prompt.md",
	".github/prompts/security/owasp-top10-analysis.prompt.md",
	".github/prompts/security/secure-code-review.prompt.md",
	".github/prompts/security/threat-modeling.prompt.md",

	// Prompts - System
	".github/prompts/system/adaptation.prompt.md",
	".github/prompts/system/stack-detection.reference.md",

	// Prompts - Testing
	".github/prompts/testing/jest-testing.prompt.md",

	// Prompts - TypeScript
	".github/prompts/typescript/esm-migration.prompt.md",
	".github/prompts/typescript/package-setup.prompt.md",
];

/**
 * Placeholder keys that must be replaced
 */
export const REQUIRED_PLACEHOLDERS = [
	"USER_NAME",
	"USER_EMAIL",
	"TIMEZONE_DESC",
	"TIMEZONE_OFFSET",
];

/**
 * Optional placeholder keys
 */
export const OPTIONAL_PLACEHOLDERS = [];

/**
 * Files to ignore during processing (non-instruction files)
 */
export const IGNORE_PATTERNS = [
	"node_modules",
	".git",
	"dist",
	"build",
	"coverage",
];

/**
 * Default prompts configuration
 */
export const PROMPTS_CONFIG = {
	USER_NAME: {
		type: "input",
		message: "What is your name?",
		default: "User",
		validate: (input) => input.trim().length > 0 || "Name cannot be empty",
	},
	USER_EMAIL: {
		type: "input",
		message: "What is your email address?",
		validate: (input) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return (
				emailRegex.test(input) || "Please enter a valid email address"
			);
		},
	},
	TIMEZONE_DESC: {
		type: "input",
		message:
			"What is your timezone? (e.g., Europe/Istanbul, America/New_York)",
		default: "UTC",
		validate: (input) =>
			input.trim().length > 0 || "Timezone cannot be empty",
	},
	TIMEZONE_OFFSET: {
		type: "input",
		message: "What is your timezone offset? (e.g., +03:00, -05:00)",
		default: "+00:00",
		validate: (input) => {
			const offsetRegex = /^[+-]\d{2}:\d{2}$/;
			return (
				offsetRegex.test(input) ||
				"Please enter a valid timezone offset (e.g., +03:00)"
			);
		},
	},
};

/**
 * Exit codes
 */
export const EXIT_CODES = {
	SUCCESS: 0,
	GENERAL_ERROR: 1,
	NETWORK_ERROR: 2,
	VALIDATION_ERROR: 3,
	FILE_SYSTEM_ERROR: 4,
};
