/**
 * Template placeholder replacer
 * @module replacer
 */

import { REQUIRED_PLACEHOLDERS, OPTIONAL_PLACEHOLDERS } from "./constants.js";

/**
 * Replace placeholders in content
 * @param {string} content - File content with placeholders
 * @param {Object} replacements - Key-value pairs for replacement
 * @returns {string} Content with replaced placeholders
 */
export function replacePlaceholders(content, replacements) {
	let result = content;

	// Replace all placeholders
	for (const [key, value] of Object.entries(replacements)) {
		const placeholder = `{{${key}}}`;
		const regex = new RegExp(placeholder, "g");
		result = result.replace(regex, value);
	}

	return result;
}

/**
 * Validate that all required placeholders have values
 * @param {Object} replacements - Key-value pairs for replacement
 * @throws {Error} If required placeholders are missing
 */
export function validateReplacements(replacements) {
	const missing = REQUIRED_PLACEHOLDERS.filter((key) => !replacements[key]);

	if (missing.length > 0) {
		throw new Error(`Missing required placeholders: ${missing.join(", ")}`);
	}
}

/**
 * Find all placeholders in content
 * @param {string} content - File content
 * @returns {string[]} Array of unique placeholder keys found
 */
export function findPlaceholders(content) {
	const regex = /\{\{([A-Z_]+)\}\}/g;
	const matches = [];
	let match;

	while ((match = regex.exec(content)) !== null) {
		matches.push(match[1]);
	}

	return [...new Set(matches)];
}

/**
 * Check if content has unreplaced placeholders
 * @param {string} content - File content
 * @returns {boolean} True if placeholders remain
 */
export function hasUnreplacedPlaceholders(content) {
	return /\{\{[A-Z_]+\}\}/.test(content);
}

/**
 * Get list of unreplaced placeholders
 * @param {string} content - File content
 * @returns {string[]} Array of unreplaced placeholder keys
 */
export function getUnreplacedPlaceholders(content) {
	return findPlaceholders(content);
}
