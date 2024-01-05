import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getNotes().map((note) => {
      return db.note.create({ data: note });
    })
  );
}

seed();

function getNotes() {
  return [
    {
      name: "Why do programmers hate writing documentation?",
      content: `Because it's like making sandwiches at a party: everyone knows it needs to be done, but no one wants to do it.`,
    },
    {
      name: "Why do coders love holiday parties so much?",
      content: `Because there's always an "undefined" number of drinks, and everyone is searching for their "null" level of fun.`,
    },
    {
      name: "Why do programmers dislike New Year's celebrations?",
      content: `Because they always expect changes, but in the end, they just get a new version of the same old year.`,
    },
    {
      name: "Why do programmers prefer coffee over tea?",
      content: `Because caffeine is like the "||" operator: they always choose the first thing that gives them alertness and ignore the rest.`,
    },
    {
      name: "Why do programmers love errors so much?",
      content: `Because it's the only way they convince themselves that their code isn't something perfect.`,
    },
    {
      name: "Why do programmers think life is a beautiful open-source project?",
      content: `Because it's full of bugs, lacks documentation, and no pull request is ever accepted.`,
    },
    {
      name: "Why do programmers call meetings time refactoring?",
      content: `Because in the end, nothing changes, but you still waste a ton of time.`,
    },
  ];
}
