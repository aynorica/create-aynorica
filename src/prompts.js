/**
 * Interactive prompts for user input
 * @module prompts
 */

import inquirer from "inquirer";
import { PROMPTS_CONFIG } from "./constants.js";

/**
 * Collect user information through interactive prompts
 * @param {Object} options - Options
 * @param {Object} options.defaults - Default values for prompts
 * @returns {Promise<Object>} User responses
 */
export async function collectUserInfo(options = {}) {
	const { defaults = {} } = options;

	const questions = [
		{
			...PROMPTS_CONFIG.USER_NAME,
			name: "USER_NAME",
			default: defaults.USER_NAME || PROMPTS_CONFIG.USER_NAME.default,
		},
		{
			...PROMPTS_CONFIG.USER_EMAIL,
			name: "USER_EMAIL",
			default: defaults.USER_EMAIL,
		},
		{
			...PROMPTS_CONFIG.TIMEZONE_DESC,
			name: "TIMEZONE_DESC",
			default:
				defaults.TIMEZONE_DESC || PROMPTS_CONFIG.TIMEZONE_DESC.default,
		},
		{
			...PROMPTS_CONFIG.TIMEZONE_OFFSET,
			name: "TIMEZONE_OFFSET",
			default:
				defaults.TIMEZONE_OFFSET ||
				PROMPTS_CONFIG.TIMEZONE_OFFSET.default,
		},
	];

	return await inquirer.prompt(questions);
}

/**
 * Confirm action with user
 * @param {string} message - Confirmation message
 * @param {boolean} defaultValue - Default answer
 * @returns {Promise<boolean>} User's answer
 */
export async function confirm(message, defaultValue = false) {
	const { confirmed } = await inquirer.prompt([
		{
			type: "confirm",
			name: "confirmed",
			message,
			default: defaultValue,
		},
	]);

	return confirmed;
}

/**
 * Select target directory
 * @param {string} defaultPath - Default directory path
 * @returns {Promise<string>} Selected directory path
 */
export async function selectTargetDirectory(defaultPath = process.cwd()) {
	const { targetDir } = await inquirer.prompt([
		{
			type: "input",
			name: "targetDir",
			message: "Where should the files be created?",
			default: defaultPath,
			validate: (input) => {
				return (
					input.trim().length > 0 || "Directory path cannot be empty"
				);
			},
		},
	]);

	return targetDir;
}

/**
 * Show summary and confirm proceed
 * @param {Object} userInfo - User information to display
 * @returns {Promise<boolean>} User's confirmation
 */
export async function confirmProceed(userInfo) {
	console.log("\n📋 Summary:");
	console.log(`   Name:            ${userInfo.USER_NAME}`);
	console.log(`   Email:           ${userInfo.USER_EMAIL}`);
	console.log(`   Timezone:        ${userInfo.TIMEZONE_DESC}`);
	console.log(`   Timezone Offset: ${userInfo.TIMEZONE_OFFSET}`);
	console.log();

	return await confirm("Proceed with these settings?", true);
}
