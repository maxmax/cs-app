import type { Note } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export function NoteDisplay({
  canDelete = true,
  isOwner,
  note,
}: {
  canDelete?: boolean;
  isOwner: boolean;
  note: Pick<Note, "content" | "name">;
}) {
  return (
    <div>
      <p>Here's your note:</p>
      <p>{note.content}</p>
      <Link to=".">"{note.name}" Permalink</Link>
      {isOwner ? (
        <Form method="post">
          <button
            className="button button-error"
            disabled={!canDelete}
            name="intent"
            type="submit"
            value="delete"
          >
            Delete
          </button>
        </Form>
      ) : null}
    </div>
  );
}
