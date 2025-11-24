
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path to the events.json file
const eventsFilePath = path.join(process.cwd(), 'src', 'data', 'events.json');

// Helper function to read events
async function getEvents() {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

// Helper function to write events
async function writeEvents(events: any) {
  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));
}

// GET handler to fetch all events
export async function GET() {
  const events = await getEvents();
  return NextResponse.json(events);
}

// POST handler to add a new event
export async function POST(request: Request) {
  try {
    const newEvent = await request.json();
    const events = await getEvents();

    // Basic validation
    if (!newEvent || !newEvent.id || !newEvent.title) {
      return NextResponse.json({ message: 'Invalid event data' }, { status: 400 });
    }

    // Check for duplicate ID
    if (events.some((event: any) => event.id === newEvent.id)) {
        return NextResponse.json({ message: `Event with ID ${newEvent.id} already exists.` }, { status: 409 });
    }

    events.push(newEvent);
    await writeEvents(events);

    return NextResponse.json({ message: 'Event added successfully', event: newEvent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
