import type { LoaderFunctionArgs } from "@remix-run/node";

import { db } from "~/utils/db.server";

function escapeCdata(s: string) {
  return s.replace(/\]\]>/g, "]]]]><![CDATA[>");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const notes = await db.note.findMany({
    include: { author: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const host =
    request.headers.get("X-Forwarded-Host") ??
    request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost")
    ? "http"
    : "https";
  const domain = `${protocol}://${host}`;
  const notesUrl = `${domain}/notes`;

  const rssString = `
    <rss xmlns:blogChannel="${notesUrl}" version="2.0">
      <channel>
        <title>Remix Notes</title>
        <link>${notesUrl}</link>
        <description>Some funny notes</description>
        <language>en-us</language>
        <generator>Kody the Koala</generator>
        <ttl>40</ttl>
        ${notes
          .map((note) =>
            `
            <item>
              <title><![CDATA[${escapeCdata(
                note.name
              )}]]></title>
              <description><![CDATA[A funny note called ${escapeHtml(
                note.name
              )}]]></description>
              <author><![CDATA[${escapeCdata(
                note.author.username
              )}]]></author>
              <pubDate>${note.createdAt.toUTCString()}</pubDate>
              <link>${notesUrl}/${note.id}</link>
              <guid>${notesUrl}/${note.id}</guid>
            </item>
          `.trim()
          )
          .join("\n")}
      </channel>
    </rss>
  `.trim();

  return new Response(rssString, {
    headers: {
      "Cache-Control": `public, max-age=${
        60 * 10
      }, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/xml",
      "Content-Length": String(
        Buffer.byteLength(rssString)
      ),
    },
  });
};
