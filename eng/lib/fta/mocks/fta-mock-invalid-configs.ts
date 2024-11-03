export const missing_thresholds = {
  thresholds: {},
};

export const missing_halstead_thresholds = {
  thresholds: {
    cyclo: 10,
    halstead: {},
    line_count: 200,
    score: 50,
  },
};

export const missing_projects = {
  thresholds: {
    cyclo: 10,
  },
};

export const invalid_projects = {
  thresholds: {
    cyclo: 10,
  },
  projects: ["project"],
};

export const invalid_project_name = {
  thresholds: {
    cyclo: 10,
  },
  projects: [
    {
      name: 1,
    },
  ],
};

export const invalid_project_path = {
  thresholds: {
    cyclo: 10,
  },
  projects: [
    {
      name: "project",
      path: 1,
    },
  ],
};
