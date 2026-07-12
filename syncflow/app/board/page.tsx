import { DashboardScreen } from "@/lib/screens/DashboardScreen";
import { WEEK, buildWeek } from "@/lib/product/schedule";

export const metadata = { title: "현황보드 · SyncFlow" };

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const start = typeof sp.start === "string" ? sp.start : undefined;
  const end = typeof sp.end === "string" ? sp.end : undefined;
  const title = typeof sp.title === "string" ? sp.title : undefined;
  const week = start && end ? buildWeek(start, end) : WEEK;
  return <DashboardScreen week={week} title={title} />;
}
