
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'src', 'data', 'events.json');

async function getEvents() {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeEvents(events: any) {
  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));
}

// GET handler to fetch a single event by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const events = await getEvents();
    const event = events.find((event: any) => event.id === id);

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}

// PUT handler to update an event by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedEventData = await request.json();
    const events = await getEvents();
    
    const eventIndex = events.findIndex((event: any) => event.id === id);

    if (eventIndex === -1) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Update the event data
    events[eventIndex] = { ...events[eventIndex], ...updatedEventData };
    await writeEvents(events);

    return NextResponse.json({ message: 'Event updated successfully', event: events[eventIndex] });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}


// DELETE handler to remove an event by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const events = await getEvents();
    const eventIndex = events.findIndex((event: any) => event.id === id);

    if (eventIndex === -1) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    events.splice(eventIndex, 1);
    await writeEvents(events);

    return NextResponse.json({ message: 'Event deleted successfully' });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
