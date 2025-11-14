# Clan Conan Subscription - Unit Testing Guide

Local unit testing for Google Apps Script using Jest. This project includes 12 passing tests with ~57% code coverage, running in under 2 seconds.

## Quick Start

### Installation (one-time)
```bash
npm install    # Install Jest and dependencies
```

### Run Tests
```bash
# From subscription/ directory
npm test              # Run all tests
npm run test:watch    # Watch mode (re-run on save)
npm run test:coverage # Show code coverage

# From project root using make
make test
make test-watch
make test-coverage
```

## Project Structure

```
subscription/
├── __tests__/
│   ├── Subscribers.test.js       # 6 tests for subscriber management
│   └── Notifications.test.js     # 6 tests for blog notifications
├── Notifications.js              # Blog notification logic (with exports)
├── Subscribers.js                # Subscriber management (with exports)
├── Test.js                       # Integration tests (Apps Script runtime)
├── package.json                  # NPM config + test scripts
├── jest.config.js               # Jest configuration
├── .claspignore                 # Prevents Jest files from deploying
├── .clasp.json                  # Clasp configuration
├── appsscript.json              # Apps Script manifest
└── README.md                    # This file
```

**Note**: The `.claspignore` file ensures that Jest configuration, test files, and node_modules are NOT pushed to your Apps Script project when using `clasp push`.

## Test Coverage

**Status**: ✅ **12 passing tests** | **~57% coverage** | **<2s runtime**

### Subscribers.js Tests (6 tests)
- `parseEuroDate_()` - Parse European date format dd/MM/yyyy HH:mm:ss
  - ✅ Correct date parsing with all components
  - ✅ Handle different date values
  - ✅ Handle leading zeros
- `getActiveSubscribers()` - Filter approved subscribers from spreadsheet
  - ✅ Return only approved subscribers
  - ✅ Exclude unapproved subscribers
  - ✅ Handle empty subscriber list

### Notifications.js Tests (6 tests)
- `getScriptProperties()` - Return script properties
  - ✅ Successfully retrieve properties service
- `getNewBlogs()` - Filter blog entries by publication date
  - ✅ Return entries published after last check
  - ✅ Return empty when no new blogs
- `sendMessages()` - Send notification emails with quota handling
  - ✅ Send emails to all subscribers
  - ✅ Respect daily email quota limits
  - ✅ Include edit URL in email body

## How to Add Tests

### 1. Create test file: `__tests__/YourModule.test.js`
```javascript
const { myFunction } = require('../YourModule.js');

describe('YourModule.js', () => {
  it('should do something specific', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### 2. Export function from source file
```javascript
function myFunction(input) {
  // your code
}

// At end of file:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { myFunction };
}
```

### 3. Run tests
```bash
npm test
```

## Mocked Google Apps Script APIs

All APIs are mocked using Jest for isolated testing:
- **PropertiesService** - Configuration storage
- **SpreadsheetApp** - Google Sheets
- **FormApp** - Google Forms
- **MailApp** - Email sending
- **UrlFetchApp** - HTTP requests
- **XmlService** - XML parsing
- **Session** - User information
- **Utilities** - Utility functions

## Two Testing Approaches

### Jest Unit Tests (Recommended for Development)
- **Location**: `__tests__/*.test.js`
- **Command**: `npm test`
- **Speed**: ~2 seconds
- **Benefits**: Fast, offline, isolated from Google APIs
- **Use for**: Logic testing, TDD, instant feedback

### Integration Tests (Apps Script Runtime)
- **Location**: `Test.js`
- **How**: Run manually in Apps Script editor
- **Benefits**: Test with actual Google APIs
- **Use for**: Validating real behavior in production environment

## Development Workflow

### TDD Development
```bash
npm run test:watch    # Terminal 1: Watch for changes
# Edit code in VS Code (Terminal 2)
# Tests automatically re-run on file save
```

### Before Deployment
```bash
npm run test:coverage # Check code coverage
npm test             # Final test run
# Then manually test in Apps Script using Test.js
```

## Backward Compatibility

✅ **No breaking changes to Apps Script**
- Export statements use conditional check: `if (typeof module !== 'undefined' && module.exports)`
- Conditional exports only execute in Node.js/Jest, not in Apps Script
- Apps Script deployment completely unaffected
- Existing code works 100% normally

## Configuration

### Test Coverage Thresholds (jest.config.js)
Current: 50% coverage globally. Adjust as needed:
```javascript
coverageThreshold: {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50
  }
}
```

### Ignored Files
- `node_modules/` - NPM dependencies
- `coverage/` - Coverage reports
- `Test.js` - Manual integration tests

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` and verify import paths are correct |
| Tests pass locally but fail in Apps Script | Use `Test.js` for integration tests; mocks may not match real APIs |
| "Jest not found" error | Run `npm install` or use `npx jest` to run from node_modules |
| Want inline test results in VS Code | Install Jest extension for VS Code |
| Coverage threshold too strict | Adjust `coverageThreshold` in jest.config.js |

## FAQ

**Q: Do I need to run npm install again?**
A: No, dependencies are already installed. Only run if adding new packages.

**Q: Will this affect my Apps Script deployment?**
A: No, exports only execute in Node.js. Apps Script deployment is completely unaffected.

**Q: How do I test code using actual Google APIs?**
A: Use `Test.js` to run integration tests directly in the Apps Script environment.

**Q: Can I see test results in VS Code?**
A: Yes, install the Jest extension for inline test result highlighting.

**Q: What if a test passes locally but fails in Apps Script?**
A: The mock doesn't perfectly match the real API. Add a test in `Test.js` to verify actual behavior in production.

**Q: Can I run tests on file save automatically?**
A: Yes, use `npm run test:watch` for watch mode.

## Best Practices

1. **Keep tests focused** - Each test should verify one specific behavior
2. **Use descriptive names** - Test names should clearly state what they verify
3. **Mock dependencies** - Don't make real API calls in unit tests
4. **Test edge cases** - Empty data, null values, quota exceeded, etc.
5. **Isolate tests** - Use `beforeEach()` to reset mocks between tests
6. **Run before deployment** - Always run full test suite before deploying

## Next Steps

1. Review `__tests__/*.test.js` to understand test patterns
2. Run `npm test` to verify everything works
3. Use `npm run test:watch` during development
4. Add tests for new functions as you create them
5. Run `npm run test:coverage` before each deployment
6. Install Jest VS Code extension for enhanced experience

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Google Apps Script API Reference](https://developers.google.com/apps-script/reference)
- [Jest Best Practices](https://jestjs.io/docs/getting-started)
- [Testing Google Apps Script](https://developers.google.com/apps-script/guides/testing)
