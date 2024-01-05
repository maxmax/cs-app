import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";

import stylesUrl from "~/styles/notes.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

import { db } from "~/utils/db.server";

// export const loader = async () => {
//  return json({
//    noteListItems: await db.note.findMany(),
//  });
// };

export const loader = async () => {
  return json({
    noteListItems: await db.note.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
      take: 3,
    }),
  });
};

export default function NotesRoute() {
  const data = useLoaderData<typeof loader>();

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
              {data.noteListItems.map(({ id, name }) => (
                <li key={id}>
                  <Link to={id}>{name}</Link>
                </li>
              ))}
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
