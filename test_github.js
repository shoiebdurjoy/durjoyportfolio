const fs = require('fs');

async function test() {
  const res = await fetch('https://github.com/users/shoiebdurjoy/contributions');
  const html = await res.text();
  
  // The table contains <td class="ContributionCalendar-day" ... data-date="2024-01-01" data-level="1">
  const regex = /<td[^>]+data-date="([^"]+)"[^>]+data-level="([^"]+)"[^>]*>/g;
  
  const days = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    days.push({
      date: match[1],
      level: parseInt(match[2], 10)
    });
  }
  
  console.log('Total days found:', days.length);
  console.log('First 5:', days.slice(0, 5));
  console.log('Last 5:', days.slice(-5));
}
test();
