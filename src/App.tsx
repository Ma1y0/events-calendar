import { useEffect } from "react";
import EventCard from "./components/EventCard";
import { AddEventButtion, AddEventModal } from "./components/addEvent";
import { useEventStore } from "./lib/db";

function App() {
  const { events, load } = useEventStore();

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <AddEventModal />
      <AddEventButtion />

      <main>
        <div className="p-6 px-64 flex flex-col gap-2">
          {events.map((event) => (
            <EventCard event={event} key={event.id!} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
