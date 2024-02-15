// import { fromRollup } from '@web/dev-server-rollup';
// import cjs from 'rollup-plugin-cjs-es';

export default {
  nodeResolve: true,
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

