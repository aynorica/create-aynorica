/**
 * Main orchestrator for create-aynorica
 * @module index
 */

import ora from "ora";
import { createLogger } from "./logger.js";
import {
	collectUserInfo,
	selectTargetDirectory,
	confirmProceed,
} from "./prompts.js";
import { fetchAllTemplates, checkRepository } from "./github.js";
import { validateReplacements, getUnreplacedPlaceholders } from "./replacer.js";
import { scaffoldTemplates, isDirectoryWritable } from "./scaffold.js";
import { EXIT_CODES, GITHUB_OWNER, GITHUB_REPO } from "./constants.js";

/**
 * Main execution function
 * @param {Object} options - CLI options
 * @param {string} options.targetDir - Target directory (optional)
 * @param {boolean} options.silent - Suppress output
 * @param {boolean} options.debug - Enable debug logging
 * @param {boolean} options.overwrite - Overwrite existing files
 * @returns {Promise<number>} Exit code
 */
export async function run(options = {}) {
	const logger = createLogger({
		silent: options.silent,
		debug: options.debug,
	});

	try {
		// Step 1: Welcome
		logger.section("🚀 create-aynorica");
		logger.info("This tool will set up personalized Aynorica instructions");
		logger.newline();

		// Step 2: Check GitHub connectivity
		const spinner = ora("Checking GitHub repository...").start();
		const isAccessible = await checkRepository();

		if (!isAccessible) {
			spinner.fail("Failed to access GitHub repository");
			logger.error(`Cannot reach ${GITHUB_OWNER}/${GITHUB_REPO}`);
			logger.error("Please check your internet connection and try again");
			return EXIT_CODES.NETWORK_ERROR;
		}

		spinner.succeed("GitHub repository accessible");

		// Step 3: Collect user information
		logger.section("📝 User Information");
		const userInfo = await collectUserInfo();

		// Validate replacements
		try {
			validateReplacements(userInfo);
		} catch (error) {
			logger.error(error.message);
			return EXIT_CODES.VALIDATION_ERROR;
		}

		// Show summary and confirm
		const proceed = await confirmProceed(userInfo);

		if (!proceed) {
			logger.warning("Setup cancelled by user");
			return EXIT_CODES.SUCCESS;
		}

		// Step 4: Select target directory
		logger.section("📂 Target Directory");
		const targetDir = options.targetDir || (await selectTargetDirectory());

		// Check if directory is writable
		const isWritable = await isDirectoryWritable(targetDir);
		if (!isWritable) {
			logger.error(`Directory is not writable: ${targetDir}`);
			logger.info(
				"Please choose a different directory or check permissions",
			);
			return EXIT_CODES.FILE_SYSTEM_ERROR;
		}

		logger.success(`Target: ${targetDir}`);

		// Step 5: Fetch templates from GitHub
		logger.section("⬇️  Fetching Templates");
		const fetchSpinner = ora(
			"Downloading templates from GitHub...",
		).start();

		const templates = await fetchAllTemplates({
			onProgress: (current, total, fileName) => {
				fetchSpinner.text = `Downloading templates... (${current}/${total}) ${fileName}`;
			},
		});

		fetchSpinner.succeed(
			`Downloaded ${Object.keys(templates).length} template files`,
		);

		// Step 6: Scaffold files
		logger.section("📝 Creating Files");
		const scaffoldSpinner = ora("Writing files...").start();

		const createdFiles = await scaffoldTemplates(
			templates,
			userInfo,
			targetDir,
			{
				overwrite: options.overwrite,
				onProgress: (current, total, fileName) => {
					scaffoldSpinner.text = `Writing files... (${current}/${total}) ${fileName}`;
				},
			},
		);

		scaffoldSpinner.succeed(`Created ${createdFiles.length} files`);

		// Step 7: Verify no unreplaced placeholders
		logger.section("🔍 Verification");
		let hasErrors = false;

		for (const [filePath, content] of Object.entries(templates)) {
			const unreplaced = getUnreplacedPlaceholders(content);
			if (unreplaced.length > 0) {
				logger.warning(
					`Found unreplaced placeholders in ${filePath}: ${unreplaced.join(
						", ",
					)}`,
				);
				hasErrors = true;
			}
		}

		if (!hasErrors) {
			logger.success("All placeholders replaced successfully");
		}

		// Step 8: Success
		logger.section("✅ Setup Complete");
		logger.success(
			"Aynorica instructions have been personalized and saved",
		);
		logger.info(`Location: ${targetDir}`);
		logger.info(`Files created: ${createdFiles.length}`);
		logger.newline();
		logger.info("Next steps:");
		logger.info("  1. Review the generated files");
		logger.info("  2. Copy them to your aynorica-os workspace");
		logger.info("  3. Commit the changes to your repository");
		logger.newline();

		return EXIT_CODES.SUCCESS;
	} catch (error) {
		logger.error(`Fatal error: ${error.message}`);

		if (options.debug) {
			logger.log(error.stack);
		}

		if (
			error.message.includes("fetch") ||
			error.message.includes("network")
		) {
			return EXIT_CODES.NETWORK_ERROR;
		}

		if (
			error.message.includes("EACCES") ||
			error.message.includes("EPERM")
		) {
			return EXIT_CODES.FILE_SYSTEM_ERROR;
		}

		return EXIT_CODES.GENERAL_ERROR;
	}
}
