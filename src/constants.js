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
 */
export const TEMPLATE_FILES = [
	".github/instructions/amir-profile.instructions.md",
	".github/instructions/available-techstack.instructions.md",
	".github/instructions/best-practices.instructions.md",
	".github/instructions/debug-principle.instructions.md",
	".github/instructions/disagreement-protocol.instructions.md",
	".github/instructions/functions.instructions.md",
	".github/instructions/handoff.instructions.md",
	".github/instructions/honesty.instructions.md",
	".github/instructions/identity.instructions.md",
	".github/instructions/infrastructure.instructions.md",
	".github/instructions/mcp.instructions.md",
	".github/instructions/memory.instructions.md",
	".github/instructions/mesh.instructions.md",
	".github/instructions/obsidian.instructions.md",
	".github/instructions/schema.instructions.md",
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
