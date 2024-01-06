import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/node";
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
import { getUser } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App | Notes" },
    { name: "description", content: "Welcome to Remix Notes!" },
  ];
};

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const noteListItems = await db.note.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
    take: 5,
  });
  const user = await getUser(request);

  return json({ noteListItems, user });
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
          {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
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
      <footer className="notes-footer">
        <div className="container">
          <Link reloadDocument to="/notes.rss">
            RSS
          </Link>
        </div>
      </footer>
    </div>
  );
}
