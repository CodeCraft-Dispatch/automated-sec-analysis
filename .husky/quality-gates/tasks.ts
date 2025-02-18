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
    args: ["run", "nx:checks"],
  },
  {
    command: "node",
    args: ["-e", '"console.log(new Date().toLocaleString())"'],
  },
  {
    command: "npm",
    args: ["run", "nx:all"]
  },
  {
    command: "node",
    args: ["-e", '"console.log(new Date().toLocaleString())"'],
  },
];
