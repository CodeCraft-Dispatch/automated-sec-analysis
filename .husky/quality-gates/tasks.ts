import { Task } from "../../eng/lib/exec-sync/task";

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
    command: "echo",
    args: ["Running quality gate tests..."],
  },
  {
    command: "npm",
    args: ["run", "test:gate"],
  },
  {
    command: "echo",
    args: ["Running engine library tests..."],
  },
  {
    command: "npm",
    args: ["run", "test:engine-library"]
  },
  {
    command: "echo",
    args: ["Running npm audit check..."],
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
