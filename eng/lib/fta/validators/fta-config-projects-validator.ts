
export class FtaConfigProjectsValidator {
  public static hasValidProjects(config) {
    return (
      FtaConfigProjectsValidator.hasProjects(config) &&
      FtaConfigProjectsValidator.hasValidProjectValues(config)
    );
  }

  static hasProjects(config) {
    return config.projects
      && Array.isArray(config.projects)
      && config.projects.length > 0
  }

  static hasValidProjectValues(config) {
    return config.projects.every(project => project.name && typeof project.name === 'string' && project.path && typeof project.path === 'string');
  }
}
