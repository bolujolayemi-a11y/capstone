# TRACE — Project Guidelines

## Project Overview

TRACE is an evidence-based hiring platform designed to help recruiters
evaluate candidates based on their skills, qualifications, and supporting
evidence rather than relying solely on traditional resumes.

The project should be developed incrementally, with a focus on
maintainability, usability, and clear separation of concerns.

## Planned Tech Stack

- Frontend: React
- Build Tool: Vite
- Styling: Tailwind CSS
- Backend: Node.js with Express
- Database: PostgreSQL
- Version Control: Git and GitHub

The stack may be adjusted as the project requirements become clearer.
Do not introduce a major framework or technology without justification.

## Development Principles

- Keep the implementation simple and maintainable.
- Build features incrementally rather than implementing the entire
  application at once.
- Prefer reusable components and modules.
- Keep frontend, backend, and database concerns separated.
- Use clear and descriptive names for variables, functions, components,
  and files.
- Avoid unnecessary dependencies.
- Do not make major architectural changes without first explaining
  the reason for the change.
- Prioritize accessibility, usability, and responsive design.
- Never expose secrets, API keys, passwords, or other sensitive
  credentials in source code.

## Frontend Conventions

- Use React functional components.
- Keep components focused and reusable.
- Use Tailwind CSS for styling.
- Avoid unnecessary duplication in UI components.
- Keep the interface clean, consistent, and responsive.

## Backend Conventions

- Use Express for API development.
- Organize routes, controllers, and supporting logic clearly.
- Validate user input.
- Handle errors consistently.
- Keep database access separate from route definitions.

## Database Conventions

- Use PostgreSQL.
- Use clear and descriptive table and column names.
- Avoid storing sensitive information unnecessarily.
- Database changes should be deliberate and documented.

## Git Conventions

Follow Conventional Commits for all commit messages.

Examples:

- `feat:` — new functionality
- `fix:` — bug fix
- `docs:` — documentation changes
- `refactor:` — code restructuring
- `chore:` — maintenance and configuration
- `test:` — tests

Examples:

- `feat: add candidate profile`
- `fix: validate candidate form`
- `docs: update project README`
- `chore: configure development environment`

## AI Development Guidelines

AI-assisted development is part of this project.

Before making significant changes:

1. Understand the existing project structure.
2. Explain the proposed approach when the change is substantial.
3. Make the smallest reasonable change that solves the problem.
4. Avoid modifying unrelated files.
5. Check existing code before creating duplicate functionality.
6. Clearly explain important changes after completing them.

Do not invent APIs, dependencies, database schemas, or project requirements
without stating the assumption.

## Current Development Stage

The project is currently in the setup/planning stage.

Do not assume that all planned TRACE features have been implemented.
New functionality should be added as the project requirements are defined.