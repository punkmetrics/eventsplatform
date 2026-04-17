export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  price: string;
  image: string;
}

export async function fetchEvents(limit: number = 7): Promise<Event[]> {
  const API_KEY = 'exZLJHzrwTh6dXsXGQga9Vs8';
  const url = new URL('https://www.searchapi.io/api/v1/search');
  url.searchParams.append('engine', 'google_events');
  url.searchParams.append('q', 'Music Events');
  url.searchParams.append('location', 'Barcelona');
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const data = await response.json();

  const rawEvents = data.events || data.events_results;
  if (!rawEvents || !Array.isArray(rawEvents)) {
    throw new Error('Invalid API response');
  }

  const mappedEvents: Event[] = rawEvents.slice(0, limit).map((item: any, index: number) => ({
    id: `event_${index}`,
    title: item.title || 'Event Title',
    date: formatDate(item.date),
    venue: item.location || item.address || 'Unknown Venue',
    price: item.ticket_text || 'Free',
    image: item.thumbnail || `https://picsum.photos/seed/event${index}/160/160`,
  }));

  return mappedEvents;
}

function formatDate(date: any): string {
  if (!date) return 'Date TBA';
  // API returns date as object { day: "17", month: "Apr" }
  if (typeof date === 'object' && date.day && date.month) {
    return `${date.month} ${date.day}`;
  }
  // Fallback for string format
  if (typeof date === 'string') return date;
  return 'Date TBA';
}
