import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const form = await request.formData();
  const content = form.get("content");
  const name = form.get("name");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof content !== "string" ||
    typeof name !== "string"
  ) {
    throw new Error("Form not submitted correctly.");
  }

  const fields = { content, name };

  const note = await db.note.create({ data: fields });
  return redirect(`/notes/${note.id}`);
};

export default function NewNoteRoute() {
  return (
    <div>
      <p>Add your own hilarious note</p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
