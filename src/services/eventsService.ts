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

  if (!data.events_results || !Array.isArray(data.events_results)) {
    throw new Error('Invalid API response');
  }

  // Map API response to Event interface and limit results
  const mappedEvents: Event[] = data.events_results.slice(0, limit).map((item: any, index: number) => ({
    id: `event_${index}`,
    title: item.title || 'Event Title',
    date: formatDate(item.date),
    venue: item.address || 'Unknown Venue',
    price: item.ticket_text || 'TBA',
    image: item.image || `https://picsum.photos/seed/event${index}/160/160`,
  }));

  return mappedEvents;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Date TBA';
  // Parse date from format like "Mon, May 27" or "May 27 – Jun 1"
  return dateStr;
}
