import type { MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Notes!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="notes">Read Notes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
