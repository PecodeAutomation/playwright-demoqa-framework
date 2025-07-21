# Playwright DemoQA Test Framework

Automation testing framework for DemoQA website using Playwright and TypeScript.

## Project Structure
playwright-demoqa-framework/
- .github/workflows/ # GitHub Actions CI/CD
- components/ # Basic reusable components
- constants/ # Basic variables
- fixtures/ # Test data and fixtures
- pages/ # Page Objects
- services/ # Business logic services
- tests/ # Test files
- types/ # TypeScript types
- utils/ # Utility functions

text

## Design Patterns Used

- **Page Object Model (POM)** - Main pattern for organizing page elements  
- **Facade** - NavigationService simplifies complex navigation  
- **Factory** - UserDataFactory generates test data  
- **Composite** - For handling nested structure  
- **Dependency Injection** - Fixtures provide dependencies to tests  

## How to Run Tests

### Install dependencies
```bash
npm install
Run all tests
bash
npx playwright test
Run specific test suite
bash
npx playwright test tests/elements/textBox.spec.ts
Run in UI mode
bash
npx playwright test --ui
Generate report
bash
npx playwright show-report
CI/CD Integration
Tests run automatically on GitHub Actions for:

Push to main branch

Pull requests to main branch

HTML report is available as build artifact.

## Test Scripts

### General Commands
|          Command      |        Description             |
|-----------------------|--------------------------------|
| `npm test`            | Run all tests in headless mode |
| `npm run test:ui`     | Run all tests in UI mode       |
| `npm run test:report` | Open last test report          |

### Category-Specific Commands
#### Elements Tests
```bash
npm run test:elements          # Run all elements tests
npm run test:elements:ui       # Run in UI mode
npm run test:elements:headed   # Run in headed browser
```

#### Alerts, Frame & Windows Tests
```bash
npm run test:alerts            # Run all alerts/frame/windows tests
npm run test:alerts:ui         # Run in UI mode
npm run test:alerts:headed     # Run in headed browser
```

#### Forms Tests
```bash
npm run test:forms             # Run all forms tests
npm run test:forms:ui          # Run in UI mode
npm run test:forms:headed      # Run in headed browser
```

#### Widgets Tests
```bash
npm run test:widgets           # Run all widgets tests
npm run test:widgets:ui        # Run in UI mode
npm run test:widgets:headed    # Run in headed browser
```

### Code Quality
```bash
npm run lint       # Check code style
npm run lint:fix   # Auto-fix lint issues
npm run format     # Format code with Prettier
```