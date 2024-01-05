import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useParams,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";

export const loader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const note = await db.note.findUnique({
    where: { id: params.noteId },
  });
  if (!note) {
    // throw new Error("Note not found");
    throw new Response("What a note! Not found.", {
      status: 404,
    });
  }
  return json({
    isOwner: userId === note.authorId,
    note
  });
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(
      `The intent ${form.get("intent")} is not supported`,
      { status: 400 }
    );
  }
  const userId = await requireUserId(request);
  const note = await db.note.findUnique({
    where: { id: params.noteId },
  });
  if (!note) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  if (note.authorId !== userId) {
    throw new Response(
      "Pssh, nice try. That's not your note 🦍",
      { status: 403 }
    );
  }
  await db.note.delete({ where: { id: params.noteId } });
  return redirect("/notes");
};

export default function NoteRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h4>Here's your note:</h4>
      <p>{data.note.content}</p>
      <Link to=".">"{data.note.name}" Permalink</Link>
      {data.isOwner ? (
        <form method="post">
          <button
            className="button button-error"
            name="intent"
            type="submit"
            value="delete"
          >
            Delete
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function ErrorBoundary() {
  const { noteId } = useParams();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    if (error.status === 403) {
      return (
        <div className="error-container">
          Sorry, but "{noteId}" is not your note.
        </div>
      );
    }
    if (error.status === 404) {
      return (
        <div className="error-container">
          Huh? What the heck is "{noteId}"?
        </div>
      );
    }
  }

  return (
    <div className="error-container">
      There was an error loading note by the id "${noteId}".
      Sorry.
    </div>
  );
}
