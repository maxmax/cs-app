import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useParams,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { NoteDisplay } from "~/components/note";

import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";

export const meta: MetaFunction<typeof loader> = ({
  data,
}) => {
  const { description, title } = data
    ? {
        description: `Enjoy the "${data.note.name}" note and much more`,
        title: `"${data.note.name}" note`,
      }
    : { description: "No note found", title: "No note" };

  return [
    { name: "description", content: description },
    { title },
  ];
};

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
    <NoteDisplay isOwner={data.isOwner} note={data.note} />
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
