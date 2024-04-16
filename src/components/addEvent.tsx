import { useState } from "react";
import { useEventStore } from "../lib/db";

export function AddEventButtion() {
  return (
    <div className="w-14 h-14 rounded-full bg-neutral-700 fixed bottom-0 right-0 m-12">
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() =>
          (
            document.getElementById("add_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}

export function AddEventModal() {
  const eventStore = useEventStore();
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    description: "",
  });

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    eventStore.add({
      name: formState.name,
      date: new Date(formState.date),
      description: formState.description,
    });

    setFormState({ name: "", date: "", description: "" });

    (document.getElementById("add_modal") as HTMLDialogElement).close();
  };

  return (
    <dialog id="add_modal" className="modal">
      <div className="modal-box">
        <form onSubmit={onFormSubmit}>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium"
                htmlFor="name"
              >
                Name:
              </label>
              <div className="relative">
                <input
                  value={formState.name}
                  onChange={onInputChange}
                  className="block w-full rounded-md border input input-bordered text-sm outline-2"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Event's name"
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium"
                htmlFor="date"
              >
                Date:
              </label>
              <div className="relative">
                <input
                  onChange={onInputChange}
                  value={formState.date}
                  className="block w-full rounded-md border input input-bordered text-sm outline-2"
                  id="date"
                  type="datetime-local"
                  name="date"
                  placeholder="Event's date"
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium"
                htmlFor="description"
              >
                Description:
              </label>
              <div className="relative">
                <textarea
                  onChange={onInputChange}
                  value={formState.description}
                  className="block w-full rounded-md border textarea textarea-bordered text-sm outline-2"
                  id="description"
                  name="description"
                  placeholder="Event's description"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="block btn btn-success w-full mt-4"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
