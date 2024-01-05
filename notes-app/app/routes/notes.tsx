import type { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

import stylesUrl from "~/styles/notes.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function NotesRoute() {
  return (
    <div className="notes-layout">
      <header className="notes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix Notes"
              aria-label="Remix Notes"
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">Notes</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="notes-main">
        <div className="container">
          <div className="notes-list">
            <Link to=".">Get a random note</Link>
            <p>Here are a few more notes to check out:</p>
            <ul>
              <li>
                <Link to="some-note-id">Hippo</Link>
              </li>
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="notes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
