import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
  const count = await db.note.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomNote] = await db.note.findMany({
    skip: randomRowNumber,
    take: 1,
  });
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
