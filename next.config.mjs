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

export default migrateNextraTurboToRootTurbopack(
  withNextra({
    async redirects() {
      return [
        // www.kenat.et and kenat.et both served 200, so Google indexed the site twice.
        // Send every www URL to the apex domain that metadataBase and canonicals use.
        {
          source: "/:path*",
          has: [{ type: "host", value: "www.kenat.et" }],
          destination: "https://kenat.et/:path*",
          permanent: true,
        },
      ];
    },
  })
);
