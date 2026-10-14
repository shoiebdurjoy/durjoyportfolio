import { NextResponse } from 'next/server';

type Day = { date: string; level: number };
type Week = { week: number; days: Day[] };

let lastGood: Week[] | null = null;

const CACHE = 'public, s-maxage=3600, stale-while-revalidate=86400';

export async function GET() {
  try {
    const res = await fetch('https://github.com/users/shoiebdurjoy/contributions', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

    const html = await res.text();
    const regex = /<td[^>]+data-date="([^"]+)"[^>]+data-level="([^"]+)"[^>]*>/g;
    const days: Day[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      days.push({ date: match[1], level: parseInt(match[2], 10) });
    }
    if (!days.length) throw new Error('No contribution cells parsed');

    // GitHub renders rows by weekday, so cell i belongs to weekday floor(i / weeks), week i % weeks.
    const weeksCount = Math.ceil(days.length / 7);
    const weeks: Week[] = Array.from({ length: weeksCount }, (_, i) => ({ week: i, days: [] }));
    days.forEach((d, i) => {
      weeks[i % weeksCount].days[Math.floor(i / weeksCount)] = d;
    });

    lastGood = weeks;
    return NextResponse.json({ weeks }, { headers: { 'Cache-Control': CACHE } });
  } catch (error) {
    console.error('GitHub contributions fetch failed:', error);
    return NextResponse.json(
      { weeks: lastGood ?? [], stale: true },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } },
    );
  }
}
