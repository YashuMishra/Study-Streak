# Contributing to Study Streak

Thank you for your interest in contributing to Study Streak! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, please include:

- **Clear description** of the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### Suggesting Features

We welcome feature suggestions! Please:

- **Check existing issues** for similar suggestions
- **Describe the feature** in detail
- **Explain the use case** and benefits
- **Consider implementation complexity**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** with clear commit messages
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/your-username/studystreak.git
cd studystreak

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type checking
npm run typecheck
```

## 📝 Coding Standards

### TypeScript

- Use **TypeScript** for all new code
- Define proper **interfaces** and **types**
- Avoid `any` type usage
- Use **strict mode** settings

### React

- Use **functional components** with hooks
- Follow **React best practices**
- Use **proper prop types**
- Implement **error boundaries** where appropriate

### Styling

- Use **Tailwind CSS** for styling
- Follow **responsive design** principles
- Maintain **consistent spacing** and colors
- Use **semantic HTML** elements

### Code Quality

- Follow **ESLint** configuration
- Use **Prettier** for formatting
- Write **meaningful commit messages**
- Add **JSDoc comments** for complex functions

## 🧪 Testing

### Writing Tests

- Write tests for **new features**
- Update tests for **modified functionality**
- Follow **testing best practices**
- Use **descriptive test names**

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- ComponentName.test.tsx
```

## 📚 Documentation

### Code Documentation

- Add **JSDoc comments** for functions and components
- Document **complex algorithms** and business logic
- Update **README.md** for new features
- Include **usage examples**

### Component Documentation

```typescript
/**
 * Timer component for Pomodoro sessions
 * @param duration - Timer duration in minutes
 * @param onComplete - Callback when timer completes
 * @param autoStart - Whether to start timer automatically
 */
interface TimerProps {
  duration: number;
  onComplete: () => void;
  autoStart?: boolean;
}
```

## 🎯 Areas for Contribution

### High Priority

- **Performance optimizations**
- **Accessibility improvements**
- **Mobile responsiveness**
- **Test coverage**
- **Documentation**

### Feature Areas

- **Study analytics** enhancements
- **Note-taking** improvements
- **Group features** expansion
- **Integration** with external services
- **Offline support**

### Bug Fixes

- **Cross-browser compatibility**
- **Edge case handling**
- **Error boundary improvements**
- **Memory leak fixes**
- **Performance bottlenecks**

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new features (backward compatible)
- **PATCH** version for bug fixes (backward compatible)

### Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag release in Git

## 🤖 Automated Checks

All pull requests must pass:

- **TypeScript compilation**
- **ESLint checks**
- **Unit tests**
- **Build process**
- **Code formatting**

## 💬 Communication

### Getting Help

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Email** - For security issues or private matters

### Code Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in different environments
4. **Documentation** review
5. **Merge** approval

## 🏆 Recognition

Contributors will be:

- **Listed** in the README
- **Credited** in release notes
- **Mentioned** in social media
- **Invited** to maintainer team (for significant contributions)

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## ⚖️ Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and taking appropriate corrective action in response to unacceptable behavior.

## 📞 Contact

For questions about contributing:

- **GitHub Issues** - Public questions
- **Email** - yash.raj@example.com
- **LinkedIn** - [Yash Raj](https://linkedin.com/in/yashraj)

---

**Thank you for contributing to Study Streak! 🙏**

*Together, we're building the future of study management with streak-based motivation.*
