#!/usr/bin/env node

/**
 * CLI entry point for create-aynorica
 */

import { Command } from 'commander';
import { run } from '../src/index.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get package.json for version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

// Configure CLI
const program = new Command();

program
    .name('create-aynorica')
    .description('Bootstrap personalized Aynorica Second Brain instructions')
    .version(packageJson.version)
    .option('-d, --dir <path>', 'target directory for generated files')
    .option('-o, --overwrite', 'overwrite existing files', false)
    .option('--debug', 'enable debug logging', false)
    .option('--silent', 'suppress all output', false)
    .action(async (options) => {
        const exitCode = await run({
            targetDir: options.dir,
            overwrite: options.overwrite,
            debug: options.debug,
            silent: options.silent
        });

        process.exit(exitCode);
    });

// Parse arguments
program.parse();
