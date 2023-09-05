import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const ServiceStore = persist(
  devtools(set => ({
    services: [],
    addService: service =>
      set(state => ({ services: [...state.services, service] })),
    removeService: id =>
      set(state => ({
        services: state.services.filter(service => service.id !== id),
      })),
  })),
  {
    name: "serviceStore", // Specify a unique name for the store
    getStorage: () => localStorage, // Use localStorage as the storage provider
  }
);

export const useServiceStore = create(ServiceStore);

const ClientStore = persist(
  devtools(set => ({
    clients: [],
    addClient: client =>
      set(state => ({ clients: [...state.clients, client] })),
    removeClient: id =>
      set(state => ({
        clients: state.clients.filter(client => client.id !== id),
      })),
    editClient: (id, updatedClient) =>
      set(state => ({
        clients: state.clients.map(client =>
          client.id === id ? { ...client, ...updatedClient } : client
        ),
      })),
  })),
  {
    name: "clientStore", // Specify a unique name for the store
    getStorage: () => localStorage, // Use localStorage as the storage provider
  }
);

export const useClientStore = create(ClientStore);

const EventStore = persist(
  devtools(set => ({
    events: [],
    addEvent: event => set(state => ({ events: [...state.events, event] })),
    removeEvent: id =>
      set(state => ({
        events: state.events.filter(event => event.id !== id),
      })),
    editEvent: (id, updatedEvent) =>
      set(state => ({
        events: state.events.map(event =>
          event.id === id ? { ...event, ...updatedEvent } : event
        ),
      })),
  })),
  {
    name: "eventStore", // Specify a unique name for the store
    getStorage: () => localStorage, // Use localStorage as the storage provider
  }
);

export const useEventStore = create(EventStore);
