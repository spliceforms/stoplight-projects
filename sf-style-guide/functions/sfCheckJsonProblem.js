import { createRulesetFunction } from '@stoplight/spectral-core';

export const sfCheckJsonProblem = createRulesetFunction(
  {
    input: null,
    options: null,
  },
  (targetVal, _options, context) => {
    // Helper function to safely access nested properties
    const getNestedProperty = (obj, path) => {
      return path.reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
    };

    // Helper function to resolve $ref
    const resolveRef = (ref) => {
      const refPath = ref.startsWith('#/') ? ref.substring(2).split('/') : [];
      return getNestedProperty(context.document.data, refPath);
    };

    // Ensure we have a valid response object
    if (typeof targetVal !== 'object' || targetVal === null) {
      return [
        {
          message: "Response object should be an object.",
        },
      ];
    }

    // Check for content.application/json
    if (!targetVal.content || !targetVal.content['application/json']) {
      return [
        {
          message: "Response must include 'content.application/json'.",
        },
      ];
    }

    const jsonContent = targetVal.content['application/json'];

    // Ensure the JSON content has a schema
    if (!jsonContent.schema) {
      return [
        {
          message: "'content.application/json' must include a schema.",
        },
      ];
    }

    // Check if the schema uses $ref
    let schema = jsonContent.schema;
    if (schema.$ref) {
      const resolvedSchema = resolveRef(schema.$ref);
      if (!resolvedSchema) {
        return [
          {
            message: `Reference ${schema.$ref} could not be resolved.`,
          },
        ];
      }
      schema = resolvedSchema;
    }

    // Check if the resolved schema is an object
    if (typeof schema !== 'object' || schema === null) {
      return [
        {
          message: "Resolved schema should be an object.",
        },
      ];
    }

    // Required properties with expected types
    const requiredProperties = {
      title: 'string',
      status: 'integer',
    };

    // Check if required properties are defined in the 'required' array
    const missingRequiredFields = [];
    const schemaRequiredFields = schema.required || [];

    Object.keys(requiredProperties).forEach((prop) => {
      if (!schemaRequiredFields.includes(prop)) {
        missingRequiredFields.push(prop);
      }
    });

    if (missingRequiredFields.length > 0) {
      return [
        {
          message: `The following properties are required but not marked as required: ${missingRequiredFields.join(', ')}.`,
        },
      ];
    }

    // Check if all required properties are present and have the correct types
    const missingProperties = [];
    const typeMismatches = [];

    Object.entries(requiredProperties).forEach(([prop, expectedType]) => {
      if (!schema.properties || !(prop in schema.properties)) {
        missingProperties.push(prop);
      } else if (schema.properties[prop].type !== expectedType) {
        typeMismatches.push(
          `Expected '${prop}' to be of type '${expectedType}', but found '${schema.properties[prop].type}'.`
        );
      }
    });

    if (missingProperties.length > 0) {
      return [
        {
          message: `The following required properties are missing: ${missingProperties.join(', ')}.`,
        },
      ];
    }

    if (typeMismatches.length > 0) {
      return typeMismatches.map((mismatch) => ({
        message: mismatch,
      }));
    }

    return;
  }
);

export default sfCheckJsonProblem;