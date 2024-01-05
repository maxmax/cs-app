import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const note = await db.note.findUnique({
    where: { id: params.noteId },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  return json({ note });
};

export default function NoteRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h4>Here's your note:</h4>
      <p>{data.note.content}</p>
      <Link to=".">"{data.note.name}" Permalink</Link>
    </div>
  );
}
