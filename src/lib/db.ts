import { create } from "zustand";

export interface Event {
  id?: String;
  name: string;
  date: Date;
  description?: string;
}

interface EventStore {
  events: Event[];
  write: () => void;
  load: () => void;
  add: (event: Event) => void;
  remove: (id: string) => void;
}

function writeEvents(events: Event[]) {
  localStorage.setItem("events", JSON.stringify(events));
}

function loadEvents(): Event[] {
  const events = JSON.parse(localStorage.getItem("events")!) as Event[];
  if (events == null) {
    return [];
  } else {
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      date: new Date(event.date),
      description: event.description,
    }));
  }
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  write: () => writeEvents(get().events),
  load: () => set({ events: loadEvents() }),
  add: (event: Event) => {
    event.id = crypto.randomUUID();

    set((state) => ({ events: [...state.events, event] }));
    writeEvents(get().events);
  },
  remove: (id: string) => {
    set((state) => ({ events: state.events.filter((x) => x.id != id) }));
    writeEvents(get().events);
  },
}));
