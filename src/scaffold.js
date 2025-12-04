/**
 * File scaffolding and writing utilities
 * @module scaffold
 */

import fs from "fs/promises";
import path from "path";
import { replacePlaceholders } from "./replacer.js";

/**
 * Ensure directory exists, create if not
 * @param {string} dirPath - Directory path
 */
export async function ensureDirectory(dirPath) {
	try {
		await fs.access(dirPath);
	} catch {
		await fs.mkdir(dirPath, { recursive: true });
	}
}

/**
 * Write file with content
 * @param {string} filePath - Target file path
 * @param {string} content - File content
 * @param {Object} options - Options
 * @param {boolean} options.overwrite - Overwrite if exists
 * @throws {Error} If file exists and overwrite is false
 */
export async function writeFile(filePath, content, options = {}) {
	const { overwrite = false } = options;

	// Check if file exists
	if (!overwrite) {
		try {
			await fs.access(filePath);
			throw new Error(`File already exists: ${filePath}`);
		} catch (error) {
			if (error.code !== "ENOENT") {
				throw error;
			}
		}
	}

	// Ensure parent directory exists
	const dirPath = path.dirname(filePath);
	await ensureDirectory(dirPath);

	// Write file
	await fs.writeFile(filePath, content, "utf8");
}

/**
 * Scaffold all template files to target directory
 * @param {Object} templates - Map of filePath -> content
 * @param {Object} replacements - Placeholder replacements
 * @param {string} targetDir - Target directory
 * @param {Object} options - Options
 * @param {boolean} options.overwrite - Overwrite existing files
 * @param {function} options.onProgress - Progress callback (current, total, fileName)
 * @returns {Promise<string[]>} Array of created file paths
 */
export async function scaffoldTemplates(
	templates,
	replacements,
	targetDir,
	options = {},
) {
	const { overwrite = false, onProgress } = options;
	const createdFiles = [];
	let current = 0;
	const total = Object.keys(templates).length;

	for (const [filePath, content] of Object.entries(templates)) {
		current++;

		if (onProgress) {
			onProgress(current, total, filePath);
		}

		// Replace placeholders
		const processedContent = replacePlaceholders(content, replacements);

		// Construct target path
		const targetPath = path.join(targetDir, filePath);

		// Write file
		await writeFile(targetPath, processedContent, { overwrite });

		createdFiles.push(targetPath);
	}

	return createdFiles;
}

/**
 * Check if directory exists and is writable
 * @param {string} dirPath - Directory path
 * @returns {Promise<boolean>} True if exists and writable
 */
export async function isDirectoryWritable(dirPath) {
	try {
		await fs.access(dirPath, fs.constants.W_OK);
		const stats = await fs.stat(dirPath);
		return stats.isDirectory();
	} catch {
		return false;
	}
}

/**
 * Count files in directory (recursive)
 * @param {string} dirPath - Directory path
 * @returns {Promise<number>} Number of files
 */
export async function countFiles(dirPath) {
	let count = 0;

	async function traverse(currentPath) {
		const entries = await fs.readdir(currentPath, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(currentPath, entry.name);

			if (entry.isDirectory()) {
				await traverse(fullPath);
			} else {
				count++;
			}
		}
	}

	try {
		await traverse(dirPath);
	} catch {
		return 0;
	}

	return count;
}
