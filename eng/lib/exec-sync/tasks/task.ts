export interface Stdio {
    input: string;
    output: string;
    error: string;
}

export interface Task {
    command: string;
    args?: string[];
    stdio?: Stdio;
}