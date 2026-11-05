#!/usr/bin/env node

/**
 * Micro-Animations Automated Component Scanner & Auditor
 * 
 * Scans a web project (React, Next.js, Vue, Svelte, HTML) to discover
 * interactive surfaces and recommend exact micro-animation upgrades based on
 * the 27 Micro-Animation Rules.
 * 
 * Usage:
 *   node scan-components.mjs [target-dir]
 */

import fs from 'fs';
import path from 'path';

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  '.turbo',
  'dist',
  'build',
  '.cache',
  'coverage',
  '.vscode',
  '.idea'
]);

const EXTENSIONS = new Set(['.tsx', '.jsx', '.vue', '.svelte', '.html', '.astro']);

// Patterns for interactive primitives
const PATTERNS = [
  {
    type: 'Button / Action Trigger',
    regex: /<button\b|<Button\b|role=["']button["']|onClick\s*=/i,
    requiredRules: ['Rule 4 (Scale to 0.97 on press)', 'Rule 8 (Pulse on success)'],
    checkPresence: (content) => /active:scale|whileTap|micro-press|:active/i.test(content)
  },
  {
    type: 'Dropdown / Select Menu',
    regex: /<Dropdown\b|<Select\b|<Menu\b|role=["']menu["']|data-state=["']open["']/i,
    requiredRules: [
      'Rule 2 (Keep 150-250ms)',
      'Rule 10 (Start at 0.95 scale)',
      'Rule 11 (Transition in from trigger)',
      'Rule 14 (Exits 20% shorter)'
    ],
    checkPresence: (content) => /scale-95|transform-origin|origin-top|micro-popover/i.test(content)
  },
  {
    type: 'List / Table Feed',
    regex: /<ul\b|<ol\b|<table\b|\.map\s*\(\s*\([^)]+\)\s*=>/i,
    requiredRules: ['Rule 1 (Ease-out entrance)', 'Rule 3 (Stagger list rows by 30ms)'],
    checkPresence: (content) => /stagger|transitionDelay|delay-\[/i.test(content)
  },
  {
    type: 'Toggle Switch / Slider',
    regex: /<Switch\b|<input[^>]+type=["']checkbox["']|<Slider\b/i,
    requiredRules: ['Rule 5 (Stretch knob by 12%)', 'Rule 13 (Critically damped spring)'],
    checkPresence: (content) => /scale-x-|scaleX|micro-switch/i.test(content)
  },
  {
    type: 'Form Input',
    regex: /<input\b|<textarea\b|<Input\b/i,
    requiredRules: ['Rule 21 (Input Error Shake)', 'Rule 9 (Ease-in-out on-screen move)'],
    checkPresence: (content) => /animate-shake|micro-shake|shake/i.test(content)
  },
  {
    type: 'Tabs / Segmented Control',
    regex: /<Tabs\b|<TabList\b|role=["']tablist["']/i,
    requiredRules: ['Rule 20 (Shared layoutId indicator)', 'Rule 9 (Ease-in-out move)'],
    checkPresence: (content) => /layoutId|micro-tab-active|view-transition-name/i.test(content)
  },
  {
    type: 'Accordion / Collapsible',
    regex: /<Accordion\b|<Collapsible\b|<details\b/i,
    requiredRules: ['Rule 6 (Stagger when details settle)', 'Rule 17 (Mask reveal)'],
    checkPresence: (content) => /clip-path|accordion-content|details/i.test(content)
  },
  {
    type: 'Icon Toggle / Morph',
    regex: /(?:Sun|Moon|Check|Copy|Menu|X|Play|Pause)(?:Icon)?\b/i,
    requiredRules: ['Rule 18 (Crossfade with scale & blur)'],
    checkPresence: (content) => /blur|micro-icon/i.test(content)
  }
];

function walkDir(dir, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return results;
  }

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

function analyzeProject(rootDir) {
  const files = walkDir(rootDir);
  const auditReport = [];

  for (const filePath of files) {
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch {
      continue;
    }

    const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');

    for (const pattern of PATTERNS) {
      if (pattern.regex.test(content)) {
        const hasAnimation = pattern.checkPresence(content);
        auditReport.push({
          file: relPath,
          componentType: pattern.type,
          status: hasAnimation ? 'Enhanced' : 'Missing / Suboptimal',
          rulesToApply: hasAnimation ? [] : pattern.requiredRules
        });
      }
    }
  }

  return auditReport;
}

// Execution
const targetDir = process.argv[2] || process.cwd();
console.log(`\n🔍 Scanning project for micro-animation opportunities in: ${targetDir}\n`);

const report = analyzeProject(targetDir);

if (report.length === 0) {
  console.log('No UI component files discovered in the target directory.');
  process.exit(0);
}

const missing = report.filter((r) => r.status === 'Missing / Suboptimal');
const enhanced = report.filter((r) => r.status === 'Enhanced');

console.log(`📊 Scan Summary:`);
console.log(`- Total Interactive Surfaces Found: ${report.length}`);
console.log(`- Already Enhanced: ${enhanced.length}`);
console.log(`- Needs Optimization: ${missing.length}\n`);

console.log(`| Component File | Detected Surface | Status | Recommended Rules |`);
console.log(`| :--- | :--- | :--- | :--- |`);

for (const item of report) {
  const rules = item.rulesToApply.length > 0 ? item.rulesToApply.join('; ') : 'Optimal';
  console.log(`| \`${item.file}\` | ${item.componentType} | **${item.status}** | ${rules} |`);
}

console.log(`\n✅ Recommended Action: Run /micro-animations to apply precision refactors to components.\n`);
