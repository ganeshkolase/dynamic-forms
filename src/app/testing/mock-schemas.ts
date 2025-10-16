import { FormSchema } from '../data/schema';

export const mockSimpleSchema: FormSchema = {
  title: 'Simple Test Form',
  fields: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 50
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      required: true,
      validation: {
        pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
        message: 'Invalid email address'
      }
    }
  ]
};

export const mockSchemaWithDropdown: FormSchema = {
  title: 'Form with Dropdown',
  fields: [
    {
      label: 'Country',
      name: 'country',
      type: 'dropdown',
      required: true,
      options: ['USA', 'UK', 'Canada', 'Australia']
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      required: false
    }
  ]
};

export const mockSchemaWithConditionalField: FormSchema = {
  title: 'Form with Conditional Field',
  fields: [
    {
      label: 'Employment Status',
      name: 'employmentStatus',
      type: 'dropdown',
      required: true,
      options: ['Employed', 'Unemployed', 'Student']
    },
    {
      label: 'Company Name',
      name: 'companyName',
      type: 'text',
      required: true,
      condition: {
        fieldName: 'employmentStatus',
        value: 'Employed'
      }
    },
    {
      label: 'University Name',
      name: 'universityName',
      type: 'text',
      required: true,
      condition: {
        fieldName: 'employmentStatus',
        value: 'Student'
      }
    }
  ]
};

export const mockSchemaWithMultipleFieldTypes: FormSchema = {
  title: 'Comprehensive Form',
  fields: [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      required: true
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'date',
      required: false
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'dropdown',
      options: ['Male', 'Female', 'Other'],
      required: true
    },
    {
      label: 'Hobbies',
      name: 'hobbies',
      type: 'multiselect',
      options: ['Reading', 'Sports', 'Music', 'Travel']
    },
    {
      label: 'Subscribe',
      name: 'subscribe',
      type: 'checkbox'
    },
    {
      label: 'Comments',
      name: 'comments',
      type: 'textarea'
    }
  ]
};

export const mockSchemaWithValidation: FormSchema = {
  title: 'Form with Validation',
  fields: [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 20,
      validation: {
        pattern: '^[a-zA-Z0-9_]+$',
        message: 'Username can only contain letters, numbers, and underscores'
      }
    },
    {
      label: 'Phone Number',
      name: 'phone',
      type: 'text',
      required: true,
      validation: {
        pattern: '^[0-9]{10}$',
        message: 'Phone number must be 10 digits'
      }
    },
    {
      label: 'Website',
      name: 'website',
      type: 'text',
      required: false,
      validation: {
        pattern: '^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/\\S*)?$',
        message: 'Enter a valid URL'
      }
    }
  ]
};
