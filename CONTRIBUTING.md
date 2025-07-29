# Contributing to AfyaCare

Thank you for your interest in contributing to AfyaCare! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Issues
- Use GitHub Issues to report bugs or suggest features
- Search existing issues before creating a new one
- Provide clear steps to reproduce bugs
- Include screenshots for UI-related issues

### Development Process
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Submit a pull request

## 📋 Development Setup

### Prerequisites
- Node.js 16+
- npm 7+ or yarn 1.22+
- Git
- Modern code editor (VS Code recommended)

### Quick Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/medical-management-system.git
cd medical-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Code Standards

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use the AfyaCare color scheme (blue-to-green gradients)

### File Organization
- Keep all components in App.jsx for now
- Add clear comments to separate component sections
- Group related functions together
- Use consistent indentation (2 spaces)

## 🧪 Testing

### Before Submitting
- Test on multiple screen sizes
- Check both patient and doctor user flows
- Verify all forms work correctly
- Test with demo accounts
- Ensure no console errors

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Commit Guidelines

### Commit Message Format
```
Type: Brief description

Optional longer description

Examples:
Add: New appointment reminder feature
Fix: Calendar date selection bug
Update: Doctor profile layout styling
Remove: Unused dependency
```

### Commit Types
- **Add**: New features or functionality
- **Fix**: Bug fixes
- **Update**: Improvements to existing features
- **Remove**: Removing code or dependencies
- **Docs**: Documentation changes
- **Style**: Code formatting changes
- **Refactor**: Code restructuring without functionality changes

## 🔄 Pull Request Process

### Before Creating PR
1. Rebase your branch on the latest main
2. Ensure all tests pass
3. Update documentation if needed
4. Check that the app builds successfully

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested patient flow
- [ ] Tested doctor flow
- [ ] No console errors

## Screenshots
(If applicable)

## Additional Notes
Any additional information
```

## 🎨 Design Guidelines

### AfyaCare Brand
- **Primary Colors**: Blue (#3B82F6) to Green (#10B981) gradients
- **Typography**: Clean, readable fonts
- **Icons**: Use Lucide React icons consistently
- **Images**: Professional medical photography from Unsplash

### UI Components
- Use glass morphism effects (backdrop-blur)
- Implement hover animations and transitions
- Maintain consistent border radius (rounded-xl, rounded-2xl)
- Follow accessibility best practices

### Responsive Design
- Mobile-first approach
- Test on various screen sizes
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Ensure touch-friendly interface on mobile

## 🌍 Localization

### Kenyan Context
- Use appropriate Kenyan doctor names and hospitals
- Include relevant medical specialties
- Consider local healthcare practices
- Use professional language appropriate for healthcare

### Language
- Primary language: English
- Brand name: AfyaCare (Afya = Health in Kiswahili)
- Maintain professional medical terminology

## 🚀 Feature Requests

### Proposing New Features
1. Open an issue with the "feature request" label
2. Describe the problem the feature solves
3. Explain the proposed solution
4. Consider implementation complexity
5. Discuss with maintainers before starting work

### Priority Features (Future)
- Real-time notifications
- Payment integration
- Telemedicine support
- Medical records management
- Multi-language support
- Advanced doctor search filters

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Code Review**: Pull request comments

### Documentation
- **README.md**: Project overview and setup
- **DEPENDENCIES.md**: Technical requirements
- **API Documentation**: In README.md

## 🙏 Recognition

### Contributors
Contributors will be recognized in:
- GitHub contributors list
- README.md acknowledgments
- Release notes for significant contributions

### Types of Contributions
- Code contributions
- Bug reports
- Feature suggestions
- Documentation improvements
- Design improvements
- Testing and feedback

## 📄 License

By contributing to AfyaCare, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make AfyaCare better! 🏥**
