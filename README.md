# DynamicForms

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Overview

A dynamic schema-based JSON forms application built with Angular 19. This project allows you to create forms dynamically from JSON schemas with support for:

- Multiple field types (text, email, date, dropdown, multiselect, checkbox, textarea)
- Conditional field visibility
- Form validation (required, pattern, minLength, maxLength)
- Custom validation messages
- PrimeNG UI components

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

This project has a comprehensive test suite with **71 test cases** and **98.93% code coverage**.

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm test
```

### Test Coverage

Run tests with coverage report:

```bash
npm test -- --code-coverage
```

View the coverage report:
```bash
open coverage/dynamic-forms/index.html
```

### Test Statistics
- **Total Tests:** 71
- **Statement Coverage:** 98.93%
- **Branch Coverage:** 93.93%
- **Function Coverage:** 100%
- **Line Coverage:** 100%

### Test Documentation
- **[TESTING_QUICK_START.md](TESTING_QUICK_START.md)** - Quick reference guide
- **[TEST_DOCUMENTATION.md](TEST_DOCUMENTATION.md)** - Comprehensive testing guide
- **[TEST_SUMMARY.md](TEST_SUMMARY.md)** - Test results summary

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dynamic-schema-form/    # Main form component
│   │   └── form-layout/            # Layout wrapper component
│   ├── services/
│   │   └── dynamic-form.service.ts # Form building & validation service
│   ├── schema/
│   │   ├── schema.d.ts             # TypeScript type definitions
│   │   ├── user-registration.json  # Sample schema
│   │   └── product-feedback.json   # Sample schema
│   ├── testing/
│   │   └── mock-schemas.ts         # Mock data for tests
│   └── app.component.ts            # Root component
├── karma.conf.js                   # Karma test configuration
└── tsconfig.spec.json              # TypeScript test configuration
```

## Features

### Dynamic Form Generation
- Create forms from JSON schemas
- Support for multiple field types
- Automatic form validation

### Conditional Fields
- Show/hide fields based on other field values
- Dynamic form control management

### Validation
- Built-in validators (required, pattern, minLength, maxLength)
- Custom validation messages
- Real-time validation feedback

### Testing
- Comprehensive unit tests (71 test cases)
- High code coverage (98.93%)
- Mock data utilities

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
