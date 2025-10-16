# Test Suite Documentation

## Overview
This document provides comprehensive information about the test suite for the Dynamic Forms project.

## Test Structure

### Test Files
- **karma.conf.js** - Karma test runner configuration
- **src/app/testing/mock-schemas.ts** - Mock data and test utilities
- **Service Tests:**
  - `src/app/services/dynamic-form.service.ts.service.spec.ts` - DynamicFormService tests
- **Component Tests:**
  - `src/app/app.component.spec.ts` - AppComponent tests
  - `src/app/components/dynamic-schema-form/dynamic-schema-form.component.spec.ts` - DynamicSchemaFormComponent tests
  - `src/app/components/form-layout/form-layout.component.spec.ts` - FormLayoutComponent tests

## Test Coverage

### DynamicFormService Tests
**Total Tests: 20+**

#### Methods Tested:
1. **getValidators()**
   - Empty validators
   - Required validator
   - Pattern validator
   - MinLength validator
   - MaxLength validator
   - Multiple validators combination

2. **buildForm()**
   - Simple schema form building
   - Form controls with validators
   - Multiple field types
   - Conditional fields
   - Initial empty values

3. **parseSubmittedFormData()**
   - Correct data parsing
   - Empty form values
   - Complex field types (date, multiselect, checkbox)
   - Non-existent fields
   - Partial form data

4. **Integration Tests**
   - Complete form workflow
   - Validation flow

### DynamicSchemaFormComponent Tests
**Total Tests: 35+**

#### Features Tested:
1. **Component Initialization**
   - Dynamic form initialization
   - Conditional field listeners setup
   - All field types rendering

2. **toggleFieldVisibility()**
   - Adding controls dynamically
   - Removing controls
   - Preventing duplicate additions
   - Handling non-existent controls

3. **Conditional Fields Logic**
   - Showing/hiding based on conditions
   - Dynamic control management
   - Multiple conditional fields

4. **isFieldVisible()**
   - Fields without conditions
   - Condition met scenarios
   - Condition not met scenarios
   - Edge cases (missing schema, missing parent control)

5. **onSubmit()**
   - Valid form submission
   - Invalid form handling
   - Touch state management
   - Data structure validation

6. **getError()**
   - No errors scenario
   - Untouched controls
   - Required field errors
   - Pattern validation errors
   - MinLength/MaxLength errors
   - Custom validation messages
   - Non-existent fields

7. **Form Validation Integration**
   - Valid data validation
   - Invalid data handling
   - Optional fields

8. **Complex Scenarios**
   - Multiple field types
   - Conditional fields with validation

### FormLayoutComponent Tests
**Total Tests: 7**

#### Features Tested:
1. **Basic Rendering**
   - Component creation
   - CSS class application

2. **Content Projection**
   - ng-content projection
   - Content wrapping in layout div

3. **Component Structure**
   - Standalone component verification
   - Selector verification

### AppComponent Tests
**Total Tests: 12**

#### Features Tested:
1. **Component Creation**
   - Basic instantiation
   - Title property

2. **Schema Initialization**
   - User registration schema
   - Product registration schema

3. **Modal State Management**
   - Initial state
   - Modal visibility
   - Data clearing

4. **Form Submission Handling**
   - Data processing
   - Modal updates
   - Multiple submissions

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headless Mode (CI/CD)
```bash
npm test -- --browsers=ChromeHeadlessCI --watch=false
```

### Run Tests with Coverage
```bash
npm test -- --code-coverage
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Specific Test File
```bash
npm test -- --include='**/dynamic-form.service.spec.ts'
```

## Test Configuration

### Karma Configuration
- **Framework:** Jasmine
- **Browser:** Chrome (default), ChromeHeadless (CI)
- **Coverage:** Istanbul/NYC
- **Reporters:** Progress, Jasmine HTML Reporter

### Coverage Reports
Coverage reports are generated in:
- `coverage/dynamic-forms/index.html` - HTML report
- `coverage/dynamic-forms/lcov.info` - LCOV format
- Console - Text summary

## Mock Data

### Available Mock Schemas
Located in `src/app/testing/mock-schemas.ts`:

1. **mockSimpleSchema** - Basic form with text and email fields
2. **mockSchemaWithDropdown** - Form with dropdown field
3. **mockSchemaWithConditionalField** - Form with conditional logic
4. **mockSchemaWithMultipleFieldTypes** - Comprehensive form with all field types
5. **mockSchemaWithValidation** - Form with various validation rules

## Best Practices

### Writing New Tests
1. Use descriptive test names
2. Follow AAA pattern (Arrange, Act, Assert)
3. Test one thing per test case
4. Use beforeEach for common setup
5. Clean up after tests (if needed)
6. Mock external dependencies
7. Test edge cases and error scenarios

### Test Organization
- Group related tests using `describe` blocks
- Use nested `describe` blocks for method-specific tests
- Keep tests focused and independent
- Avoid test interdependencies

### Assertions
- Use specific matchers (toBe, toEqual, toBeTruthy, etc.)
- Test both positive and negative scenarios
- Verify error messages and validation
- Check state changes

## Continuous Integration

### GitHub Actions Example
```yaml
- name: Run tests
  run: npm test -- --browsers=ChromeHeadlessCI --watch=false --code-coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/dynamic-forms/lcov.info
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase timeout in karma.conf.js
   - Check for unresolved promises
   - Use `done()` callback for async tests

2. **Component not rendering**
   - Ensure all dependencies are imported
   - Call `fixture.detectChanges()`
   - Check for missing providers

3. **Form validation not working**
   - Mark controls as touched: `control.markAsTouched()`
   - Ensure validators are applied
   - Check form state after setValue

4. **Conditional fields not updating**
   - Use `setTimeout` for async operations
   - Subscribe to valueChanges
   - Call `fixture.detectChanges()` after changes

## Coverage Goals

- **Overall Coverage:** > 80%
- **Services:** > 90%
- **Components:** > 80%
- **Critical Paths:** 100%

## Future Enhancements

1. Add E2E tests with Playwright/Cypress
2. Add visual regression tests
3. Add performance tests
4. Add accessibility tests
5. Add integration tests with real schemas
6. Add mutation testing

## Resources

- [Jasmine Documentation](https://jasmine.github.io/)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Karma Documentation](https://karma-runner.github.io/)
- [Testing Best Practices](https://angular.io/guide/testing-best-practices)
