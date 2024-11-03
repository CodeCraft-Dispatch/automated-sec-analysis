# Quality Gates

Quality gates are enforced by the following tools:

- Husky ([learn more](https://typicode.github.io/husky/))
- Commitlint ([learn more](https://commitlint.js.org/))
- Conventional-changelog ([learn more](https://github.com/conventional-changelog/conventional-changelog))

## Pre-commit

The following pre-commit hooks are enforced via a series of tasks:

- **test:gate**: This task runs the test suite for the quality gates.
- **test:engine-library**: This task runs the test suite for the engine library.
- **audit:check:json**: This task checks for any security vulnerabilities in the project dependencies using npm audit.
- **fta:rules**: This task gathers and analyzes the code metrics using the Fast Time Analyzer (FTA) tool.
- **Commitlint**: Commitlint is used to enforce [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) messages. This ensures that commit messages follow a consistent format.

## Commit-msg

The following commit-msg hooks are enforced:

- **Commitlint**: Commitlint is used to enforce conventional commit messages. This ensures that commit messages follow a consistent format.

## Commit Message Format

Commit messages must follow the Conventional-changelog format. The format is as follows:

```plaintext
<type>(<scope>): <subject>
```

The `type` must be one of the following:

- **build**: Changes that affect the build system or external dependencies.
- **ci**: Changes to our CI configuration files and scripts.
- **docs**: Documentation only changes.
- **feat**: A new feature.
- **fix**: A bug fix.
- **perf**: A code change that improves performance.
- **refactor**: A code changes the structure of code without changing externally observable behavior.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **test**: Adding missing tests or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation.

The `scope` is optional and can be anything specifying the place of the commit change.

The `subject` must use the imperative, present tense: "change" not "changed" nor "changes". The subject should not end with a period.

## Example

```plaintext
feat(docs): add quality gates documentation
```

## Committing Code

When committing code, ensure that the commit message follows the Conventional-changelog format. If the commit message does not follow the format, the commit will be rejected.

Use the following command to commit code:

```nodejs
npm run kommit
```

This command will guide you through a conventional commit using [cz-commitlint](https://github.com/conventional-changelog/commitlint). If the quality gates pass, the commit will finish.