import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://github.com/users/shoiebdurjoy/contributions', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch GitHub contributions: ${res.status}`);
    }

    const html = await res.text();
    const regex = /<td[^>]+data-date="([^"]+)"[^>]+data-level="([^"]+)"[^>]*>/g;
    
    const days: { date: string; level: number }[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      days.push({
        date: match[1],
        level: parseInt(match[2], 10)
      });
    }

    // The days array is grouped by day of week (all Sundays, then all Mondays, etc.)
    // We have 371 days (53 weeks * 7 days).
    const weeksCount = Math.ceil(days.length / 7); // Usually 53
    const weeks: { week: number; days: { date: string; level: number }[] }[] = Array.from(
      { length: weeksCount },
      (_, i) => ({ week: i, days: [] })
    );

    for (let i = 0; i < days.length; i++) {
      // index i corresponds to (dayOfWeek * weeksCount) + weekIndex
      const dayOfWeek = Math.floor(i / weeksCount);
      const weekIndex = i % weeksCount;
      if (weeks[weekIndex]) {
        weeks[weekIndex].days[dayOfWeek] = days[i];
      }
    }

    // Ensure all days are packed correctly and filter empty weeks
    const validWeeks = weeks.filter(w => w.days.length > 0);

    return NextResponse.json({ weeks: validWeeks });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
