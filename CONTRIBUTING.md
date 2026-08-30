# CONTRIBUTING

Thank you for your interest in contributing to Flipkart Clone! This document provides guidelines for contributing.

## Code of Conduct
Be respectful and constructive in all interactions with other contributors.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit with clear messages: `git commit -m "Add feature description"`
6. Push to your fork: `git push origin feature/your-feature`
7. Create a Pull Request

## Pull Request Process

1. Ensure all tests pass: `npm run test`
2. Run linter: `npm run lint`
3. Update documentation if needed
4. Describe your changes in PR description
5. Link related issues
6. Request review from maintainers

## Coding Standards

### TypeScript
- Use strict mode
- Add type annotations
- Avoid `any` types
- Use meaningful variable names

### Naming Conventions
- Directories: kebab-case (components/auth-guard)
- Files: kebab-case for components (user-profile.tsx), camelCase for utilities
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Classes: PascalCase

### Code Structure
- Keep files under 300 lines
- One responsibility per module
- DRY principle
- Comments for complex logic

## Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov
```

## Commit Messages

Format: `<type>(<scope>): <subject>`

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Maintenance

Example:
```
feat(products): add image search functionality
fix(cart): resolve quantity update issue
docs: update API documentation
```

## Branch Naming

- Feature: `feature/description`
- Bug fix: `bugfix/description`
- Hotfix: `hotfix/description`
- Release: `release/version`

## Development Tips

### Local Development
```bash
npm run dev
# Runs all apps in watch mode
```

### Database Management
```bash
# View database
npm run db:studio

# Create migration
npm run db:migrate -- --name "migration_name"

# Reset database
npm run db:reset
```

### API Testing
- Use Postman or Insomnia
- API docs: http://localhost:3002/api/docs
- Use Bearer token for authentication

## Issues & Bug Reports

### Before Creating an Issue
- Search existing issues
- Check documentation
- Try clearing node_modules and reinstalling

### Issue Template
```markdown
**Description**
Clear description of the issue

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Node version: 
- OS:
- Browser (if applicable):

**Screenshots**
If applicable
```

## Feature Requests

Describe:
- Use case
- Proposed solution
- Alternative solutions
- Additional context

## Performance Considerations

When contributing:
- Consider database query performance
- Minimize API calls
- Cache when appropriate
- Optimize images
- Lazy load components

## Documentation

Update relevant docs for:
- New features
- API changes
- Configuration changes
- Deployment changes

## Security

- Never commit secrets or credentials
- Use environment variables
- Report security issues privately to maintainers
- Follow OWASP guidelines

## Questions?

- Check existing documentation
- Search GitHub issues
- Ask in discussions
- Create an issue with question label

Thank you for contributing! 🚀
