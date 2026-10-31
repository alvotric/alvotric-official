/** The query shown in the ProtoDB demo editor. It mirrors the real query in the screenshot below it. */
export const SQL =
  "select table_name, column_name, data_type, is_nullable\nfrom information_schema.columns\nwhere table_schema = 'public'\n  and table_name in ('connected_storages', 'connected_storage_files')\norder by table_name, ordinal_position;";

function esc(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Minimal SQL highlighter: strings and a handful of keywords. Output is escaped HTML. */
export function highlight(t: string): string {
  const re = /('[^']*'?)|\b(SELECT|FROM|WHERE|AND|IN|ORDER BY)\b/gi;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    out += esc(t.slice(last, m.index));
    out += m[1]
      ? `<span class="st">${esc(m[1])}</span>`
      : `<span class="kw">${esc(m[2])}</span>`;
    last = re.lastIndex;
  }
  return out + esc(t.slice(last));
}
