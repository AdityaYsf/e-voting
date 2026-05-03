#!/usr/bin/env node
/**
 * check.js — e-Voting Master Checker
 * ------------------------------------
 * Run from the ROOT project directory (same level as client/ and server/):
 *
 *   node check.js           → check client + server
 *   node check.js client    → check client only
 *   node check.js server    → check server only
 *   node check.js --fix     → check + auto-fix fixable issues
 */

import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

// ── Configuration ─────────────────────────────────────────────
const ROOT = process.cwd();
const ARGS = process.argv.slice(2);
const FIX = ARGS.includes('--fix');
const TARGET = ARGS.find(a => ['client', 'server'].includes(a)) || 'both';

const TARGETS = {
  client: { path: join(ROOT, 'client'), src: 'src', label: '📦 CLIENT (React / Vite)' },
  server: { path: join(ROOT, 'server'), src: '.', label: '🖥️ SERVER (Node.js / Express)' },
};

// ── Terminal Colors ───────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// ── Helpers ───────────────────────────────────────────────────
const log = (msg) => console.log(msg);
const hr = () => log(`${c.gray}${'─'.repeat(60)}${c.reset}`);
const bold = (msg) => `${c.bold}${msg}${c.reset}`;

// ── Check node_modules ────────────────────────────────────────
function checkDependencies(dir, label) {
  if (!existsSync(join(dir, 'node_modules'))) {
    log(`${c.yellow}⚠ ${label}: node_modules not found.${c.reset}`);
    log(`${c.gray}   Run: cd ${dir} && npm install${c.reset}\n`);
    return false;
  }
  return true;
}

// ── Run ESLint ────────────────────────────────────────────────
function runESLint(key) {
  const { path: dir, src, label } = TARGETS[key];

  hr();
  log(`\n${bold(label)}\n`);

  if (!existsSync(dir)) {
    log(`${c.red}✗ Directory not found: ${dir}${c.reset}\n`);
    return { key, errors: 1, warnings: 0, skipped: true };
  }

  if (!checkDependencies(dir, label)) {
    return { key, errors: 0, warnings: 0, skipped: true };
  }

  const eslintBin = join(dir, 'node_modules', '.bin', 'eslint');
  if (!existsSync(eslintBin)) {
    log(`${c.yellow}⚠ ESLint is not installed in ${key}.${c.reset}`);
    log(`${c.gray}   Run: cd ${dir} && npm install${c.reset}\n`);
    return { key, errors: 0, warnings: 0, skipped: true };
  }

  const fixFlag = FIX ? ' --fix' : '';
  const cmd = `"${eslintBin}" "${src}" --ext .js,.jsx --format stylish${fixFlag}`;

  const result = spawnSync(cmd, {
    shell: true,
    cwd: dir,
    encoding: 'utf8',
  });

  const output = (result.stdout || '') + (result.stderr || '');

  const errMatch = output.match(/(\d+)\s+error/);
  const warnMatch = output.match(/(\d+)\s+warning/);
  const errors = errMatch ? parseInt(errMatch[1]) : 0;
  const warnings = warnMatch ? parseInt(warnMatch[1]) : 0;

  if (output.trim()) {
    log(output);
  }

  if (errors === 0 && warnings === 0) {
    log(`${c.green}✓ No issues found.${c.reset}\n`);
  } else {
    if (errors > 0) log(`${c.red}✗ ${errors} error(s) found.${c.reset}`);
    if (warnings > 0) log(`${c.yellow}⚠ ${warnings} warning(s) found.${c.reset}`);
    if (FIX) log(`${c.cyan}🔧 Auto-fix applied where possible.${c.reset}`);
    log('');
  }

  return { key, errors, warnings, skipped: false };
}

// ── Node Version Check ────────────────────────────────────────
function checkNodeVersion() {
  const version = process.versions.node;
  const major = parseInt(version.split('.')[0]);
  if (major < 18) {
    log(`${c.yellow}⚠ Node.js ${version} detected. Recommended version is 18+.${c.reset}\n`);
  }
}

// ── Main Execution ────────────────────────────────────────────
function main() {
  log(`\n${c.cyan}${bold('═══════════════════════════════════════════════════════')}${c.reset}`);
  log(`${c.cyan}${bold('  🗳️ e-Voting Project Checker')}${c.reset}`);
  log(`${c.cyan}${bold('═══════════════════════════════════════════════════════')}${c.reset}`);
  log(`${c.gray}  Mode  : ${FIX ? 'Check + Auto-fix' : 'Check only'}${c.reset}`);
  log(`${c.gray}  Target: ${TARGET === 'both' ? 'client + server' : TARGET}${c.reset}`);
  log(`${c.gray}  Root  : ${ROOT}${c.reset}\n`);

  checkNodeVersion();

  const toRun = TARGET === 'both' ? ['client', 'server'] : [TARGET];
  const results = toRun.map(runESLint);

  hr();
  log(`\n${bold('📊 SUMMARY')}\n`);

  let totalErrors = 0;
  let totalWarnings = 0;

  results.forEach(({ key, errors, warnings, skipped }) => {
    const { label } = TARGETS[key];
    if (skipped) {
      log(`  ${c.gray}⊘ ${label} — skipped${c.reset}`);
    } else if (errors === 0 && warnings === 0) {
      log(`  ${c.green}✓ ${label} — clean${c.reset}`);
    } else {
      const e = errors > 0 ? `${c.red}${errors} error${c.reset}` : '';
      const w = warnings > 0 ? `${c.yellow}${warnings} warning${c.reset}` : '';
      const parts = [e, w].filter(Boolean).join(', ');
      log(`  ${c.red}✗ ${label} — ${parts}`);
    }
    totalErrors += errors;
    totalWarnings += warnings;
  });

  log('');

  if (totalErrors === 0 && totalWarnings === 0) {
    log(`${c.green}${bold('✓ All clear! Project is ready for deployment.')}${c.reset}\n`);
  } else {
    if (totalErrors > 0) {
      log(`${c.red}${bold(`✗ Total: ${totalErrors} error(s), ${totalWarnings} warning(s)`)}${c.reset}`);
      log(`${c.gray}  Please fix errors before deployment.${c.reset}`);
      log(`${c.gray}  Tip: run node check.js --fix to auto-fix issues.${c.reset}\n`);
    } else {
      log(`${c.yellow}${bold(`⚠ Total: ${totalWarnings} warning(s)`)}${c.reset}`);
      log(`${c.gray}  Warnings do not block deployment, but fixing them is recommended.${c.reset}\n`);
    }
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();