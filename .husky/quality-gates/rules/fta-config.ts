export const createProject = (name, path) => {
  return {
    name,
    path,
  };
};

export const config = {
  thresholds: {
    cyclo: 10,              // target: 1-10, 21+
    halstead: {
      uniq_operators: 15,   // target: 1-10, 21+
      uniq_operands: 37,    // target: 1-10, 21+
      total_operators: 115, // target: 1-30, 61+
      total_operands: 130,  // target: 1-30, 61+
      program_length: 235,  // target: 1-50, 151+
      vocabulary_size: 55,  // target: 1-15, 31+
      volume: 1300,         // target: 1-100, 801+
      difficulty: 22,       // target: 1-10, 21+
      effort: 19500,        // target: 1-20000, 40001+
      time: 1100,           // target: 1-1000, 2223+
      bugs: 0.45,           // target: 0-0.5, 1+
    },
    line_count: 95,         // target: 1-50, 201+
    score: 50,              // target: 0-40, 61+
  },
  projects: [
    createProject("root", "."),
    createProject("engine-library", "./eng/lib"),
  ],
};
