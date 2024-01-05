import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
  // throw new Error("Testing Error Boundary");
  const count = await db.note.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomNote] = await db.note.findMany({
    skip: randomRowNumber,
    take: 1,
  });
  if (!randomNote) {
    throw new Response("No random note found", {
      status: 404,
    });
  }
  return json({ randomNote });
};

export default function NotesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h4>Here's a random note:</h4>
      <p>{data.randomNote.content}</p>
      <Link to={data.randomNote.id}>
        "{data.randomNote.name}" Permalink
      </Link>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error-container">
        <p>There are no notes to display.</p>
        <Link to="new">Add your own</Link>
      </div>
    );
  }

  return (
    <div className="error-container">
      I did a whoopsies.
    </div>
  );
}
