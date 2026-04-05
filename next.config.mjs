import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
});

/**
 * Nextra 4 injects `experimental.turbo` for MDX/page-map loaders. Next.js 15.5+ expects
 * the same options under root `turbopack` and warns if only `experimental.turbo` is set.
 */
function migrateNextraTurboToRootTurbopack(config) {
  const out = { ...config };
  const turbo = out.experimental?.turbo;
  if (!turbo) return out;

  out.turbopack = turbo;
  const { turbo: _removed, ...experimentalRest } = out.experimental;
  out.experimental = experimentalRest;
  return out;
}

/**
 * On WSL2, webpack's default *filesystem* dev cache can race on renames and corrupt `.next`.
 * `cache: false` breaks Next's chunk graph (missing `./NNN.js` runtime errors). Use in-memory
 * cache only in dev so chunks stay consistent without heavy disk pack writes.
 */
function useWebpackMemoryCacheInDev(config) {
  const out = { ...config };
  const prevWebpack = out.webpack;
  out.webpack = (webpackConfig, options) => {
    if (options.dev) {
      webpackConfig.cache = { type: "memory" };
    }
    return prevWebpack ? prevWebpack(webpackConfig, options) : webpackConfig;
  };
  return out;
}

export default useWebpackMemoryCacheInDev(
  migrateNextraTurboToRootTurbopack(withNextra({}))
);
