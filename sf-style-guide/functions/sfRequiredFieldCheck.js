import { createRulesetFunction } from '@stoplight/spectral-core';

export const sfRequiredFieldCheck = createRulesetFunction(
  {
    input: {
      type: 'object',
      additionalProperties: true,
    },
    options: null,
  },
  function sfRequiredFieldCheck(input) {
    const errors = [];

    for (const [schemaName, schema] of Object.entries(input)) {
      // Skip non-object schemas
      if (schema.type !== 'object') {
        continue;
      }

      // Check if 'properties' is missing in the schema
      if (!schema.properties) {
        errors.push({
          message: `The 'properties' field is missing in the object schema.`,
          path: ['components', 'schemas', schemaName],
        });
        continue; // Skip further checks for this schema
      }

      const required = schema.required || [];

      // Check if there are no required fields
      if (required.length === 0) {
        errors.push({
          message: 'Object model should have at least one required field.',
          path: ['components', 'schemas', schemaName],
        });
      }

      // Check if required fields are present in 'properties'
      for (const field of required) {
        if (!schema.properties[field]) {
          errors.push({
            message: `Required field "${field}" is missing in the schema properties.`,
            path: ['components', 'schemas', schemaName],
          });
        }
      }
    }

    return errors;
  },
);

export default sfRequiredFieldCheck;
