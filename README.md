# Playwright DemoQA Test Framework

Automation testing framework for DemoQA website using Playwright and TypeScript.

## Project Structure
playwright-demoqa-framework/
- .github/workflows/ # GitHub Actions CI/CD
- components/ # Basic reusable components
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
