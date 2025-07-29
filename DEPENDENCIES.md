# AfyaCare - Technical Dependencies & Requirements

## 📋 System Requirements

### Minimum Requirements
- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0 (or yarn >= 1.22.0)
- **RAM**: 4GB minimum
- **Storage**: 500MB free space
- **Browser**: Modern browser with ES6+ support

### Recommended Requirements
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 (or yarn >= 3.0.0)
- **RAM**: 8GB or more
- **Storage**: 2GB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 📦 Production Dependencies

### Core React Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1"
}
```

### UI & Styling Dependencies
```json
{
  "tailwindcss": "^3.3.5",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16"
}
```

### Utility Dependencies
```json
{
  "lucide-react": "^0.292.0",
  "react-calendar": "^4.6.0",
  "react-datepicker": "^4.21.0",
  "date-fns": "^2.30.0"
}
```

## 🛠 Development Dependencies

### Build Tools
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.1.1"
}
```

### Code Quality
```json
{
  "eslint": "^8.53.0",
  "eslint-plugin-react": "^7.33.2",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.4"
}
```

### TypeScript Support
```json
{
  "@types/react": "^18.2.37",
  "@types/react-dom": "^18.2.15"
}
```

## 🌐 Browser Compatibility

### Supported Browsers
- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅
- **Opera**: 76+ ✅

### Mobile Browsers
- **Chrome Mobile**: 90+ ✅
- **Safari iOS**: 14+ ✅
- **Samsung Internet**: 15+ ✅

## 🖥 Operating System Support

### Desktop
- **Windows**: 10+ ✅
- **macOS**: 10.15+ ✅
- **Linux**: Ubuntu 18.04+, CentOS 7+ ✅

### Mobile
- **iOS**: 14+ ✅
- **Android**: 8.0+ ✅

## 📋 Installation Commands

### Using npm
```bash
# Install all dependencies
npm install

# Install specific dependency
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>
```

### Using yarn
```bash
# Install all dependencies
yarn install

# Add specific dependency
yarn add <package-name>

# Add dev dependency
yarn add --dev <package-name>
```

## 🔧 Optional Dependencies

### For Enhanced Development Experience
```bash
# Prettier for code formatting
npm install --save-dev prettier

# Husky for git hooks
npm install --save-dev husky

# Commitlint for commit message linting
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### For Testing (if needed)
```bash
# Vitest for unit testing
npm install --save-dev vitest

# React Testing Library
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### For State Management (if scaling)
```bash
# Redux Toolkit (if complex state needed)
npm install @reduxjs/toolkit react-redux

# Zustand (lighter alternative)
npm install zustand
```

## 📁 File Structure Requirements

```
project-root/
├── node_modules/          # Dependencies (auto-generated)
├── public/               # Static assets
├── src/                  # Source code
├── package.json          # Dependency definitions
├── package-lock.json     # Locked dependency versions
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite build configuration
└── index.html           # HTML template
```

## 🚨 Common Issues & Solutions

### Node Version Issues
```bash
# Check current Node version
node --version

# Use nvm to switch versions (if needed)
nvm install 18
nvm use 18
```

### Package Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Clear Vite cache
npx vite --force

# Check for TypeScript errors
npx tsc --noEmit
```

## 🔄 Version Updates

### Checking for Updates
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install <package-name>@latest
```

### Breaking Changes to Watch
- **React 18**: Concurrent features and Strict Mode changes
- **React Router 6**: New API and component structure
- **Tailwind 3**: JIT compiler and color palette changes
- **Vite 5**: New build optimizations

## 📈 Performance Considerations

### Bundle Size Optimization
- Use dynamic imports for code splitting
- Implement lazy loading for components
- Optimize images and assets
- Tree-shake unused dependencies

### Development Performance
- Use Vite's fast HMR
- Enable React Developer Tools
- Implement proper error boundaries
- Use React.memo for expensive components

---

**Note**: This file should be referenced alongside package.json for complete dependency information.
