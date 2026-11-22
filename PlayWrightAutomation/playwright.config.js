// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();


const config =({
  testDir: './tests',
  timeout: 100 * 1000,
  expect: {
    timeout: 50 * 1000
  },
  reporter: 'html',
    workers: 5,
    fullyParallel: true,

use : {
  browserName: 'chromium',

  headless: false,
  trace: 'on',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
});
module.exports = config;