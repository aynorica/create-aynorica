/**
 * Logger utility with styled output
 * @module logger
 */

import chalk from "chalk";

/**
 * Log levels
 */
export const LogLevel = {
	INFO: "info",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error",
	DEBUG: "debug",
};

/**
 * Logger class with styled console output
 */
class Logger {
	constructor(options = {}) {
		this.silent = options.silent || false;
		this.debug = options.debug || false;
	}

	/**
	 * Log informational message
	 * @param {string} message - Message to log
	 */
	info(message) {
		if (!this.silent) {
			console.log(chalk.blue("ℹ"), message);
		}
	}

	/**
	 * Log success message
	 * @param {string} message - Message to log
	 */
	success(message) {
		if (!this.silent) {
			console.log(chalk.green("✓"), message);
		}
	}

	/**
	 * Log warning message
	 * @param {string} message - Message to log
	 */
	warning(message) {
		if (!this.silent) {
			console.log(chalk.yellow("⚠"), message);
		}
	}

	/**
	 * Log error message
	 * @param {string} message - Message to log
	 */
	error(message) {
		if (!this.silent) {
			console.error(chalk.red("✗"), message);
		}
	}

	/**
	 * Log debug message (only if debug mode enabled)
	 * @param {string} message - Message to log
	 */
	log(message) {
		if (this.debug && !this.silent) {
			console.log(chalk.gray("🔍"), message);
		}
	}

	/**
	 * Log a section header
	 * @param {string} title - Section title
	 */
	section(title) {
		if (!this.silent) {
			console.log("\n" + chalk.bold.cyan(`▸ ${title}`));
		}
	}

	/**
	 * Log a blank line
	 */
	newline() {
		if (!this.silent) {
			console.log();
		}
	}
}

/**
 * Create a new logger instance
 * @param {Object} options - Logger options
 * @param {boolean} options.silent - Suppress all output
 * @param {boolean} options.debug - Enable debug logging
 * @returns {Logger} Logger instance
 */
export function createLogger(options = {}) {
	return new Logger(options);
}

// Default logger instance
export const logger = createLogger();
