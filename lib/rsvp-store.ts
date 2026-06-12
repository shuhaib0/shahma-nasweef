import fs from "fs";
import path from "path";

export interface Rsvp {
  id: string;
  guestName: string;
  guestCount: number;
  createdAt: string;
}

interface Store {
  rsvps: Rsvp[];
}

const DB_PATH = path.join(process.cwd(), "data", "rsvps.json");

function readStore(): Store {
  const directory = path.dirname(DB_PATH);
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    const emptyStore = { rsvps: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(emptyStore, null, 2));
    return emptyStore;
  }

  return JSON.parse(fs.readFileSync(DB_PATH, "utf8")) as Store;
}

function writeStore(store: Store) {
  fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2));
}

export function getRsvps() {
  return readStore().rsvps.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createRsvp(guestName: string, guestCount: number) {
  const store = readStore();
  const rsvp: Rsvp = {
    id: crypto.randomUUID(),
    guestName,
    guestCount,
    createdAt: new Date().toISOString(),
  };
  store.rsvps.push(rsvp);
  writeStore(store);
  return rsvp;
}

export function deleteRsvp(id: string) {
  const store = readStore();
  const initialLength = store.rsvps.length;
  store.rsvps = store.rsvps.filter((rsvp) => rsvp.id !== id);
  if (store.rsvps.length === initialLength) return false;
  writeStore(store);
  return true;
}
