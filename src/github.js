/**
 * GitHub API client
 * @module github
 */

import fetch from "node-fetch";
import {
	GITHUB_API_BASE,
	GITHUB_RAW_BASE,
	GITHUB_OWNER,
	GITHUB_REPO,
	GITHUB_BRANCH,
	TEMPLATE_FILES,
} from "./constants.js";

/**
 * Fetch file content from GitHub
 * @param {string} filePath - Path to file in repository
 * @param {Object} options - Options
 * @param {string} options.owner - Repository owner
 * @param {string} options.repo - Repository name
 * @param {string} options.branch - Branch name
 * @returns {Promise<string>} File content
 * @throws {Error} If request fails
 */
export async function fetchFileContent(filePath, options = {}) {
	const owner = options.owner || GITHUB_OWNER;
	const repo = options.repo || GITHUB_REPO;
	const branch = options.branch || GITHUB_BRANCH;

	const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${filePath}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`,
		);
	}

	return await response.text();
}

/**
 * Fetch all template files from GitHub
 * @param {Object} options - Options
 * @param {function} options.onProgress - Progress callback (current, total, fileName)
 * @returns {Promise<Object>} Map of filePath -> content
 */
export async function fetchAllTemplates(options = {}) {
	const { onProgress } = options;
	const templates = {};
	let current = 0;
	const total = TEMPLATE_FILES.length;

	for (const filePath of TEMPLATE_FILES) {
		current++;

		if (onProgress) {
			onProgress(current, total, filePath);
		}

		try {
			const content = await fetchFileContent(filePath);
			templates[filePath] = content;
		} catch (error) {
			throw new Error(
				`Failed to fetch template ${filePath}: ${error.message}`,
			);
		}
	}

	return templates;
}

/**
 * Check if GitHub repository is accessible
 * @param {Object} options - Options
 * @param {string} options.owner - Repository owner
 * @param {string} options.repo - Repository name
 * @returns {Promise<boolean>} True if accessible
 */
export async function checkRepository(options = {}) {
	const owner = options.owner || GITHUB_OWNER;
	const repo = options.repo || GITHUB_REPO;

	const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;

	try {
		const response = await fetch(url);
		return response.ok;
	} catch (error) {
		return false;
	}
}

/**
 * Get repository information
 * @param {Object} options - Options
 * @param {string} options.owner - Repository owner
 * @param {string} options.repo - Repository name
 * @returns {Promise<Object>} Repository metadata
 * @throws {Error} If request fails
 */
export async function getRepositoryInfo(options = {}) {
	const owner = options.owner || GITHUB_OWNER;
	const repo = options.repo || GITHUB_REPO;

	const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch repository info: ${response.status} ${response.statusText}`,
		);
	}

	return await response.json();
}
