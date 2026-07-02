export const dynamic = "force-dynamic";

export async function GET() {
  const startDate = "2024-01-01";
  const endDate = new Date().toISOString().split("T")[0];

  const [kenatNpm, kenatUiNpm, pubDev, pypi] = await Promise.all([
    fetch(`https://api.npmjs.org/downloads/range/${startDate}:${endDate}/kenat`).then((r) => r.json()).catch(() => null),
    fetch(`https://api.npmjs.org/downloads/range/${startDate}:${endDate}/kenat-ui`).then((r) => r.json()).catch(() => null),
    fetch("https://pub.dev/api/packages/kenat/score").then((r) => r.json()).catch(() => null),
    fetch("https://pypistats.org/api/packages/kenat/overall").then((r) => r.json()).catch(() => null),
  ]);

  let total = 0;
  if (kenatNpm?.downloads) total += kenatNpm.downloads.reduce((s, d) => s + d.downloads, 0);
  if (kenatUiNpm?.downloads) total += kenatUiNpm.downloads.reduce((s, d) => s + d.downloads, 0);
  if (pubDev?.downloadCount30Days) total += pubDev.downloadCount30Days;
  if (pypi?.data) {
    total += pypi.data
      .filter((d) => d.category === "without_mirrors")
      .reduce((s, d) => s + d.downloads, 0);
  }

  return Response.json({ total });
}
