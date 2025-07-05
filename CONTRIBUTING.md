# 🤝 Contributing to SplitBill

Thank you for your interest in contributing to SplitBill! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Code of Conduct](#code-of-conduct)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Git

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start development server: `npm start`

## 💻 Development Setup

### Environment Configuration
Create a `.env` file in the root directory:
```env
# API Configuration
API_BASE_URL=https://api.splitbill.com
API_TIMEOUT=30000

# Payment Configuration
PAYMENT_GATEWAY=stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Analytics Configuration
ANALYTICS_ENABLED=true
FIREBASE_PROJECT_ID=splitbill-prod
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📝 Code Standards

### TypeScript
- All code must be written in TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Use proper type annotations

### Component Structure
```typescript
/**
 * ComponentName - Brief description
 * 
 * @component
 * @description Detailed description
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
interface ComponentNameProps {
  /** Prop description */
  prop: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ prop }) => {
  return <div>{prop}</div>;
};
```

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`
- Types: `camelCase.types.ts`

### Import Order
1. React imports
2. Third-party libraries
3. Internal components
4. Utilities and hooks
5. Types and interfaces

### State Management
- Use Zustand for global state
- Keep state minimal and normalized
- Use computed values for derived state
- Implement proper error handling

## 🔄 Pull Request Process

### Before Submitting
1. Ensure all tests pass
2. Run linting: `npm run lint`
3. Check TypeScript: `npm run type-check`
4. Update documentation if needed
5. Test on multiple platforms

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process
1. Automated checks must pass
2. At least one maintainer approval required
3. All conversations resolved
4. Documentation updated

## 🐛 Issue Reporting

### Bug Reports
Use the bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment information
- Screenshots or videos

### Feature Requests
- Clear description of the feature
- Use case and benefits
- Implementation suggestions
- Mockups or wireframes

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## 📚 Documentation

### Code Documentation
- Use JSDoc for all functions and components
- Include examples in documentation
- Keep documentation up to date
- Use clear and concise language

### README Updates
- Update README for new features
- Include setup instructions
- Add troubleshooting section
- Keep screenshots current

## 🧪 Testing

### Test Requirements
- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for features
- E2E tests for critical flows

### Test Structure
```
tests/
├── unit/
│   ├── components/
│   ├── stores/
│   └── utils/
├── integration/
│   ├── api/
│   └── components/
└── e2e/
    ├── flows/
    └── scenarios/
```

## 🚀 Deployment

### Build Process
1. Create feature branch
2. Develop and test locally
3. Submit pull request
4. Code review and approval
5. Merge to main branch
6. Automated deployment

### Release Process
- Semantic versioning
- Changelog updates
- Release notes
- Tagged releases

## 📞 Communication

### Channels
- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Pull Request comments for code review
- Email for security issues

### Response Times
- Bug reports: 24-48 hours
- Feature requests: 1 week
- Pull requests: 2-3 business days
- Security issues: 24 hours

## 🏆 Recognition

### Contributors
- All contributors listed in README
- Special recognition for significant contributions
- Contributor badges for active members

### Contribution Levels
- **Bronze**: 1-5 contributions
- **Silver**: 6-20 contributions
- **Gold**: 21+ contributions
- **Platinum**: Core maintainer

## 📄 License

By contributing to SplitBill, you agree that your contributions will be licensed under the same license as the project.

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community

### Enforcement
- Unacceptable behavior will not be tolerated
- Violations reported to project maintainers
- Appropriate action taken as needed

---

Thank you for contributing to SplitBill! 🎉

*This document is maintained by the SplitBill development team.* 