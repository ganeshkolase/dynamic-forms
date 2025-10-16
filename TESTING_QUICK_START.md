# Testing Quick Start Guide

## 🚀 Quick Commands

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --code-coverage

# Run tests in headless mode (for CI/CD)
npm test -- --browsers=ChromeHeadlessCI --watch=false

# Run tests and generate coverage
npm test -- --code-coverage --watch=false
```

## 📊 Test Summary

### Total Test Cases: **74+**

| Component/Service | Test Cases | Coverage Areas |
|------------------|------------|----------------|
| **DynamicFormService** | 20+ | Validators, Form Building, Data Parsing |
| **DynamicSchemaFormComponent** | 35+ | Initialization, Conditional Logic, Validation, Submission |
| **FormLayoutComponent** | 7 | Rendering, Content Projection |
| **AppComponent** | 12 | State Management, Form Submission |

## 🎯 What's Tested

### ✅ DynamicFormService
- ✓ Validator generation (required, pattern, minLength, maxLength)
- ✓ Dynamic form building from JSON schema
- ✓ Form data parsing and transformation
- ✓ Multiple validators combination
- ✓ Edge cases and error handling

### ✅ DynamicSchemaFormComponent
- ✓ Component initialization with schemas
- ✓ Conditional field visibility logic
- ✓ Dynamic form control addition/removal
- ✓ Form validation (all validator types)
- ✓ Error message generation
- ✓ Form submission workflow
- ✓ Touch state management
- ✓ Complex scenarios with multiple field types

### ✅ FormLayoutComponent
- ✓ Component rendering
- ✓ Content projection (ng-content)
- ✓ CSS class application

### ✅ AppComponent
- ✓ Schema initialization
- ✓ Modal state management
- ✓ Form submission handling
- ✓ Data flow between components

## 📁 Test Files Structure

```
src/
├── app/
│   ├── testing/
│   │   └── mock-schemas.ts          # Mock data for tests
│   ├── services/
│   │   └── dynamic-form.service.ts.service.spec.ts
│   ├── components/
│   │   ├── dynamic-schema-form/
│   │   │   └── dynamic-schema-form.component.spec.ts
│   │   └── form-layout/
│   │       └── form-layout.component.spec.ts
│   └── app.component.spec.ts
├── karma.conf.js                     # Karma configuration
└── tsconfig.spec.json                # TypeScript config for tests
```

## 🔍 Coverage Report

After running tests with coverage, open:
```
coverage/dynamic-forms/index.html
```

## 🧪 Test Examples

### Running Specific Tests
```bash
# Test only the service
npm test -- --include='**/dynamic-form.service*.spec.ts'

# Test only components
npm test -- --include='**/components/**/*.spec.ts'
```

### Watch Mode for Development
```bash
npm test
# Tests will re-run automatically when files change
```

## 🐛 Debugging Tests

### In Chrome Browser
1. Run `npm test`
2. Click "DEBUG" button in Karma browser window
3. Open Chrome DevTools (F12)
4. Set breakpoints in your test code
5. Refresh the page

### Common Issues

**Issue:** Tests fail with "Cannot read property of undefined"
**Solution:** Ensure `fixture.detectChanges()` is called after component setup

**Issue:** Async tests timeout
**Solution:** Use `done()` callback or increase timeout in karma.conf.js

**Issue:** Form validation not working in tests
**Solution:** Call `control.markAsTouched()` before checking validation errors

## 📈 Next Steps

1. **Run the tests:** `npm test`
2. **Check coverage:** `npm test -- --code-coverage`
3. **Review the report:** Open `coverage/dynamic-forms/index.html`
4. **Add more tests:** Use existing tests as templates

## 💡 Tips

- Tests are organized by feature/method using `describe` blocks
- Each test follows the AAA pattern: Arrange, Act, Assert
- Mock schemas are reusable across all test files
- Use `beforeEach` for common setup to keep tests DRY
- Test both success and failure scenarios

## 📚 Additional Resources

- Full documentation: `TEST_DOCUMENTATION.md`
- Angular Testing Guide: https://angular.io/guide/testing
- Jasmine Documentation: https://jasmine.github.io/
