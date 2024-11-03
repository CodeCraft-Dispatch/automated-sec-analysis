export const createProject = (name, path) => {
  return {
    name,
    path,
  };
};

export const config = {
  thresholds: {
    cyclo: 10,
    halstead: {
      uniq_operators: 40,
      uniq_operands: 40,
      total_operators: 200,
      total_operands: 200,
      program_length: 400,
      vocabulary_size: 80,
      volume: 3000,
      difficulty: 30,
      effort: 65000,
      time: 3600,
      bugs: 1.5,
    },
    line_count: 200,
    score: 50,
  },
  projects: [
    createProject("root", "."),
    createProject("husky", "./.husky"),
    createProject("engine-library", "./eng/lib"),
  ],
};
