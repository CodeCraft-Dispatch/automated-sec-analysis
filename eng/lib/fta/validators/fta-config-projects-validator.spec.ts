import { FtaConfigProjectsValidator } from './fta-config-projects-validator';

describe('ftaConfigProjectsValidator', () => {
  [
    {
      name: 'no projects provided',
      projects: [],
    },
    {
      name: 'projects is not an array',
      projects: 'invalid',
    },
    {
      name: 'projects array contains invalid project objects',
      projects: [
        {
          name: 'invalid',
        },
        {
          path: 'invalid',
        },
      ],
    },
  ].forEach(({ name, projects }) => {
    it(`should return false when ${name}`, () => {
      const config = {
        projects,
      };

      const result = FtaConfigProjectsValidator.hasValidProjects(config);

      expect(result).toBe(false);
    });
  });

  it('should return true when projects array contains valid project objects', () => {
    const config = {
      projects: [
        {
          name: 'valid',
          path: 'valid',
        },
        {
          name: 'valid',
          path: 'valid',
        },
      ],
    };

    const result = FtaConfigProjectsValidator.hasValidProjects(config);

    expect(result).toBe(true);
  });
});
