import { config } from './fta-config';

describe('ftaConfig', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should have a thresholds property', () => {
    expect(config.thresholds).toBeDefined();
  });

  it('should have a projects property', () => {
    expect(config.projects).toBeDefined();
  });

  it('should have a projects property with an array of projects', () => {
    expect(config.projects).toBeInstanceOf(Array);
  });

  it('should have a projects property with an array of projects with a name property', () => {
    config.projects.forEach((project) => {
      expect(project).toHaveProperty('name');
    });
  });

  it('should have a projects property with an array of projects with a name property that is a string', () => {
    config.projects.forEach((project) => {
      expect(typeof project.name).toBe('string');
    });
  });

  it('should have a projects property with an array of projects with a name property that is not an empty string', () => {
    config.projects.forEach((project) => {
      expect(project.name).not.toBe('');
    });
  });

  it('should have a projects property with an array of projects with a path property', () => {
    config.projects.forEach((project) => {
      expect(project).toHaveProperty('path');
    });
  });

  it('should have a projects property with an array of projects with a path property that is a string', () => {
    config.projects.forEach((project) => {
      expect(typeof project.path).toBe('string');
    });
  });

  it('should have a projects property with an array of projects with a path property that is not an empty string', () => {
    config.projects.forEach((project) => {
      expect(project.path).not.toBe('');
    });
  });
});
