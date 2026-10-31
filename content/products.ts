/**
 * Product and capability data. This is the single place where status is decided.
 * Status values: "live" | "in-development" | "planned".
 * A capability may only be marked "live" after it has been verified as working.
 */

export type Status = "live" | "in-development" | "planned";

export const statusLabel: Record<Status, string> = {
  live: "Live",
  "in-development": "In development",
  planned: "Planned",
};

export type Capability = {
  title: string;
  description: string;
  status: Status;
};

export const alvo = {
  name: "Alvo",
  status: "in-development" as Status,
  summary:
    "An AI-powered platform for building automations and web projects. Describe the task, and Alvo helps assemble the workflow.",
  /** Intended direction. Not a promise that each item is production-ready. */
  capabilities: [
    {
      title: "Describe it in plain language",
      description: "Start from a written request instead of a blank canvas.",
      status: "in-development",
    },
    {
      title: "Workflow nodes",
      description: "Triggers, logic, and actions arranged as a workflow you can read and adjust.",
      status: "in-development",
    },
    {
      title: "Integrations",
      description: "Connections to the tools and services a workflow needs to reach.",
      status: "in-development",
    },
    {
      title: "AI-assisted execution",
      description: "AI helps build, explain, and run steps in a workflow.",
      status: "in-development",
    },
  ] satisfies Capability[],
};

export const focusAreas = [
  {
    title: "AI-assisted development",
    description:
      "Tools that help people design, write, and ship software with an AI collaborator.",
    status: "in-development" as Status,
  },
  {
    title: "Intelligent automation",
    description:
      "Systems that turn a described task into a workflow that runs without constant attention.",
    status: "in-development" as Status,
  },
  {
    title: "Developer tooling",
    description:
      "Infrastructure and integrations that make building and connecting software simpler.",
    status: "planned" as Status,
  },
];
