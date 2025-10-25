// import { fromRollup } from '@web/dev-server-rollup';
// import cjs from 'rollup-plugin-cjs-es';
// import {playwrightLauncher} from '@web/test-runner-playwright';
import {puppeteerLauncher} from '@web/test-runner-puppeteer';

export default {
  nodeResolve: true,
  browsers: [
    puppeteerLauncher(),
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

