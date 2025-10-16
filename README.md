 # DynamicForms
 

## Overview

A dynamic schema-based JSON forms application built with Angular 19. This project allows you to create forms dynamically from JSON schemas with support for:

- Multiple field types (text, email, date, dropdown, multiselect, checkbox, textarea)
- Conditional field visibility
- Form validation (required, pattern, minLength, maxLength)
- Custom validation messages
- PrimeNG UI components
- Automatic form reset after submission

## Prerequisites

- **Node.js**: v20.19.0
- **Angular CLI**: v19.0.0

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

Start the development server:

```bash
ng serve
```

Or using npm:

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

## JSON Schema Format

This application uses JSON schemas to dynamically generate forms. The schemas are located in `src/app/data/`.

### Example 1: Basic Schema (Non-Conditional)

**File:** `src/app/data/user-registration.json`

```json
{
  "title": "User Registration Form",
  "fields": [
    {
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "label": "Email",
      "name": "email",
      "type": "text",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
        "message": "Invalid email address"
      }
    },
    {
      "label": "Gender",
      "name": "gender",
      "type": "dropdown",
      "options": ["Male", "Female", "Other"],
      "required": true
    },
    {
      "label": "Hobbies",
      "name": "hobbies",
      "type": "multiselect",
      "options": ["Reading", "Sports", "Music", "Travel"]
    }
  ]
}
```

### Example 2: Conditional Schema

**File:** `src/app/data/product-feedback.json`

```json
{
  "title": "Job Application",
  "fields": [
    {
      "label": "Job Role",
      "name": "jobRole",
      "type": "dropdown",
      "required": true,
      "options": ["Frontend Developer", "Backend Developer", "Designer", "Other"]
    },
    {
      "label": "Please specify your role",
      "name": "customRole",
      "type": "text",
      "required": true,
      "condition": {
        "fieldName": "jobRole",
        "value": "Other"
      }
    },
    {
      "label": "Portfolio Link (Optional)",
      "name": "portfolio",
      "type": "text",
      "validation": {
        "pattern": "^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/\\S*)?$",
        "message": "Enter a valid URL"
      }
    }
  ]
}
```

**Key Concepts:**
- **Basic Fields**: Define `label`, `name`, `type`, and optionally `required`
- **Validation**: Use `validation.pattern` for regex validation with custom error messages
- **Conditional Fields**: Use `condition` to show/hide fields based on another field's value
  - `fieldName`: The field to watch
  - `value`: The value that triggers visibility
- **Field Types**: `text`, `email`, `date`, `dropdown`, `multiselect`, `checkbox`, `textarea`

### Example Output

When a user submits the form, the application displays the submitted data in a modal:

![Form Output Example](docs/form-output-example.png)

**Sample Output:**
```
Full Name: Ganesh Kolase
Email: ganesh@example.com
Date of Birth: Fri Oct 17 2025 00:00:00 GMT+0530 (India Standard Time)
Gender: Male
Hobbies: Reading, Music, Sports
Subscribe to newsletter: true
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage Report

```bash
npm test -- --code-coverage
```

### View Coverage Report

After running tests with coverage, open the report:

```bash
open coverage/dynamic-forms/index.html
```

### Run Tests in Headless Mode (CI/CD)

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dynamic-schema-form/    # Main form component
│   │   └── form-layout/            # Layout wrapper component
│   ├── services/
│   │   └── dynamic-form.service.ts # Form building & validation service
│   ├── data/
│   │   ├── schema.d.ts             # TypeScript type definitions
│   │   ├── user-registration.json  # Sample schema (non-conditional)
│   │   └── product-feedback.json   # Sample schema (conditional)
│   ├── testing/
│   │   └── mock-schemas.ts         # Mock data for tests
│   └── app.component.ts            # Root component
├── karma.conf.js                   # Karma test configuration
└── tsconfig.spec.json              # TypeScript test configuration
```

## Feature

### Dynamic Form Generation
- Create forms from JSON schemas
- Support for multiple field types
- Automatic form validation
- Form automatically resets after successful submission

