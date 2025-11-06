// import { fromRollup } from '@web/dev-server-rollup';
// import cjs from 'rollup-plugin-cjs-es';
// import {playwrightLauncher} from '@web/test-runner-playwright';
import {puppeteerLauncher} from '@web/test-runner-puppeteer';

const launchOptions = process.env.CI ? {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
} : {};

export default {
  nodeResolve: true,
  browserStartTimeout: 120000,
  browsers: [
    puppeteerLauncher({
      launchOptions
    }),
  ]
  // browsers: [
  //   playwrightLauncher({product: 'firefox'}),
  // ]
  // FIXME: https://github.com/modernweb-dev/web/issues/2637
  // coverageConfig: {
  //   exclude: [
  //     "node_modules/**/*",
  //   ]
  // }
  // FIXME: https://github.com/modernweb-dev/web/issues/2640
  // plugins: [
  //   [cjs, { nested: true, cache: false, include: ["lib/**/*"]}]
  // ].map(([plugin, options]) => fromRollup(plugin)(options))
};

