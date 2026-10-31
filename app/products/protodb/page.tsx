import Image from "next/image";
import { StatusBadge } from "@/components/ui/Badge";
import { ProtoDbRoot } from "@/components/protodb/ProtoDbRoot";
import { SQL, highlight } from "@/components/protodb/sql";
import { protodb } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "ProtoDB",
  description:
    "ProtoDB is a clean admin interface for your database from Alvotric. Browse tables, see how they relate on a schema map and run PostgreSQL from the browser.",
  path: "/products/protodb",
});

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Icon({ id }: { id: string }) {
  return (
    <svg aria-hidden="true">
      <use href={`#pdb-${id}`} />
    </svg>
  );
}

const features = [
  {
    title: "Visual schema",
    body: "Tables, columns, types and relationships drawn as a map you can zoom, rearrange and auto layout.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
      </>
    ),
  },
  {
    title: "Live SQL runner",
    body: "Execute a statement or a whole script against the real database and see results right below.",
    icon: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  },
  {
    title: "Query history",
    body: "Every run is logged with its row count, duration and any error, so nothing is lost between sessions.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "CSV and JSON export",
    body: "Take results out in the format you need with one click.",
    icon: <path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" />,
  },
  {
    title: "Search or jump",
    body: "Press Cmd or Ctrl plus K to find a table or jump to any screen without hunting through menus.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
  },
  {
    title: "Audit log",
    body: "A dedicated log and a system status indicator are always one click away in the sidebar.",
    icon: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5M9 13h7M9 17h7" />
      </>
    ),
  },
];

const steps = [
  { title: "Open the map", body: "Pick a schema and see every table and relationship at a glance." },
  { title: "Run your SQL", body: "Write a statement or paste a script and run it on the live database." },
  { title: "Export or save", body: "Download results as CSV or JSON, or save the query for next time." },
];

const sidebar = ["Database", "Dashboard", "Queries", "Storage", "Projects", "Users", "Audit Log", "Settings"];

export default function ProtoDbPage() {
  return (
    <ProtoDbRoot>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="pdb-key" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="15" r="4" />
          <path d="m11 12 9-9M16 7l3 3M14 9l2 2" />
        </symbol>
        <symbol id="pdb-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </symbol>
        <symbol id="pdb-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5 9-10" />
        </symbol>
        <symbol id="pdb-play" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4.5v15l13-7.5z" />
        </symbol>
        <symbol id="pdb-gh" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
        </symbol>
      </svg>

      {/* Hero: copy + 3D schema map */}
      <div className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="tagrow">
              <span className="tag">
                <b>Alvotric</b>Project 02
              </span>
              <StatusBadge status={protodb.status} />
            </div>
            <h1>
              See your database. <em>Edit it for real.</em>
            </h1>
            <p className="lead">{protodb.summary}</p>
            <div className="cta-row">
              <a className="btn primary" href={protodb.appUrl} {...ext}>
                Open ProtoDB
              </a>
              <a className="btn ghost" href="#schema">
                See it in action
              </a>
            </div>
            <div className="facts">
              <span><i />Schema map</span>
              <span><i />Live SQL runner</span>
              <span><i />CSV and JSON export</span>
            </div>
          </div>

          <div className="stage">
            <div className="s3d">
              <div className="plate" />
              <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M45 14 C52 14 50 35 56 35" />
                <path className="l2" pathLength={1} d="M44 61 C52 61 50 81 56 81" />
              </svg>
              <div className="tbl t1">
                <h4>workflows</h4>
                <div className="row"><span><Icon id="key" />id</span><em>uuid</em></div>
                <div className="row"><span className="pad">name</span><em>text</em></div>
                <div className="row"><span className="pad">status</span><em>text</em></div>
                <div className="row"><span className="pad">node_count</span><em>integer</em></div>
              </div>
              <div className="tbl t2">
                <h4>workflow_executions</h4>
                <div className="row"><span><Icon id="key" />id</span><em>uuid</em></div>
                <div className="row fk"><span><Icon id="link" />workflow_id</span><em>uuid</em></div>
                <div className="row"><span className="pad">status</span><em>text</em></div>
                <div className="row"><span className="pad">trigger_source</span><em>text</em></div>
                <div className="row"><span className="pad">error</span><em>text</em></div>
              </div>
              <div className="tbl t3">
                <h4>books</h4>
                <div className="row"><span><Icon id="key" />id</span><em>uuid</em></div>
                <div className="row"><span className="pad">title</span><em>text</em></div>
                <div className="row"><span className="pad">status</span><em>text</em></div>
                <div className="row"><span className="pad">public_slug</span><em>text</em></div>
              </div>
              <div className="tbl t4">
                <h4>chapters</h4>
                <div className="row"><span><Icon id="key" />id</span><em>uuid</em></div>
                <div className="row fk"><span><Icon id="link" />book_id</span><em>uuid</em></div>
                <div className="row"><span className="pad">title</span><em>text</em></div>
                <div className="row"><span className="pad">sort_order</span><em>integer</em></div>
              </div>
              <div className="chip c1"><i />Live database</div>
              <div className="chip c2">public · 4 tables</div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema map screenshot */}
      <section id="schema">
        <div className="wrap">
          <div className="head" data-r>
            <span className="eyebrow">Schema map</span>
            <h2>See how your real tables relate to each other.</h2>
            <p>
              Every table, column and type on one canvas, with foreign keys drawn as lines. Create or edit tables
              right there. Move your mouse over the screenshot to tilt it.
            </p>
          </div>
          <div className="persp" data-r>
            <div className="shot">
              <div className="screen">
                <Image
                  src="/protodb/schema-map.webp"
                  alt="ProtoDB schema map with workflows, workflow_executions, books and chapters tables linked by relationship lines"
                  width={1448}
                  height={885}
                  sizes="(min-width: 1224px) 1130px, 100vw"
                />
              </div>
            </div>
          </div>
          <div className="cap" data-r>
            <span><b>public</b> schema selector</span>
            <span><b>Auto layout</b> in one click</span>
            <span><b>New table</b> from the canvas</span>
            <span><b>Zoom</b> and full screen</span>
          </div>
        </div>
      </section>

      {/* Query editor */}
      <section className="alt" id="queries">
        <div className="wrap">
          <div className="q-grid">
            <div className="q-copy" data-r>
              <span className="eyebrow">Queries</span>
              <h2>Run SQL against the live database.</h2>
              <p>
                Write a single PostgreSQL statement or paste a full migration script. Results come back with row
                count and timing, so you know what happened.
              </p>
              <ul className="ticks">
                <li><Icon id="check" /><span>Run statement or Run script, with an autocommit switch</span></li>
                <li><Icon id="check" /><span>History keeps every run, with rows, time and errors</span></li>
                <li><Icon id="check" /><span>Save queries and export results as CSV or JSON</span></li>
              </ul>
            </div>
            <div className="ed" data-r>
              <div className="tabs">
                <span>Query 1</span>
                <span>Query 6</span>
                <span className="on">Query 7</span>
              </div>
              <div className="live">Live PostgreSQL execution</div>
              <div className="tools">
                <span className="run"><Icon id="play" />Run statement</span>
                <span className="ghost2">Run script</span>
                <span className="ghost2">Save</span>
              </div>
              <pre aria-label="SQL query" dangerouslySetInnerHTML={{ __html: highlight(SQL) }} />
              <div className="res">
                <div className="meta">
                  <span>Query Results</span>
                  <span className="pill m">28 rows</span>
                  <span className="m">171ms</span>
                  <span className="pill m">Live database</span>
                </div>
                <table>
                  <thead>
                    <tr><th>table_name</th><th>column_name</th><th>data_type</th><th>nullable</th></tr>
                  </thead>
                  <tbody>
                    <tr className="r"><td>connected_storages</td><td>updated_at</td><td>timestamp with time zone</td><td>NO</td></tr>
                    <tr className="r"><td>connected_storages</td><td>cursor_created_time</td><td>timestamp with time zone</td><td>YES</td></tr>
                    <tr className="r"><td colSpan={4} style={{ color: "#7f8f9c" }}>... 26 more rows</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="persp" data-r style={{ marginTop: 56 }}>
            <div className="shot">
              <div className="screen">
                <Image
                  src="/protodb/query-editor.webp"
                  alt="ProtoDB query screen with run history, a SQL editor and a results table"
                  width={1448}
                  height={880}
                  sizes="(min-width: 1224px) 1130px, 100vw"
                />
              </div>
            </div>
          </div>
          <p style={{ marginTop: 14, font: "13px var(--mono)", color: "var(--muted)" }}>
            The editor above replays a real query from the screenshot below.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="wrap">
          <div className="head" data-r>
            <span className="eyebrow">What it does</span>
            <h2>A database admin that is pleasant to use.</h2>
            <p>Everything you reach for when working with a database, on screens that stay out of the way.</p>
          </div>
          <div className="grid">
            {features.map((f) => (
              <article className="card" data-r key={f.title}>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {f.icon}
                  </svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="alt" id="flow">
        <div className="wrap">
          <div className="head" data-r>
            <span className="eyebrow">How it works</span>
            <h2>From connection to answer in three moves.</h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="n">STEP 0{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="label">Workspace sidebar</div>
          <div className="nav2" style={{ marginTop: 14 }}>
            {sidebar.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section>
        <div className="wrap">
          <div className="head" data-r>
            <span className="eyebrow">Project review</span>
            <h2>ProtoDB at a glance.</h2>
          </div>
          <div className="review" data-r>
            <div><small>Maker</small><strong>Alvotric</strong></div>
            <div><small>Version</small><strong>{protodb.version}</strong></div>
            <div><small>Database</small><strong>PostgreSQL</strong></div>
            <a href={protodb.sourceUrl} {...ext}>
              <div><small>Source</small><strong>alvotric/protodb</strong></div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta" data-r>
            <div>
              <h2>Give your database a better front door.</h2>
              <p>Open the live app or read the source on GitHub.</p>
            </div>
            <div className="acts">
              <a className="btn t" href={protodb.appUrl} {...ext}>
                Open ProtoDB
              </a>
              <a className="btn l" href={protodb.sourceUrl} {...ext}>
                <Icon id="gh" />
                View source
              </a>
            </div>
          </div>
        </div>
      </section>
    </ProtoDbRoot>
  );
}
