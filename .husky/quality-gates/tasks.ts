import { Task } from "../../eng/lib/exec-sync/tasks/task";

export const tasks: Task[] = [
  {
    command: "cd",
  },
  {
    command: "node",
    args: ["-e", '"console.log(new Date().toLocaleString())"'],
  },
  {
    command: "echo",
    args: ["Running quality gates..."],
  },
  {
    command: "npm",
    args: ["run", "test:gate"],
  },
  {
    command: "npm",
    args: ["run", "test:engine-library"]
  },
  {
    command: "npm",
    args: ["run", "test:fundamentalanalysis"],
  },
  {
    command: "npm",
    args: ["run", "audit:check:json"],
  },
  {
    command: "echo",
    args: ["Running fta rules..."],
  },
  {
    command: "npm",
    args: ["run", "fta:rules"],
  },
  {
    command: "node",
    args: ["-e", '"console.log(new Date().toLocaleString())"'],
  },
];
