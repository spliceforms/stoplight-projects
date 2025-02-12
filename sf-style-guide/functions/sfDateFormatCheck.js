import { createRulesetFunction } from '@stoplight/spectral-core';

export const sfDateFormatCheck = createRulesetFunction(
  {
    input: null,
    options: null,
  },
  function sfDateFormatCheck(targetVal, options, context) {
    const errors = [];

    // Check if the targetVal is a string with date-time format
    if (targetVal.type === 'string' && targetVal.format === 'date-time') {
      const example = targetVal.example;
      const minLength = targetVal.minLength;
      const maxLength = targetVal.maxLength;

      if (example) {
        const exampleLength = example.length;

        // Validate minLength
        if (minLength !== undefined && exampleLength !== minLength) {
          errors.push({
            message: `Example length "${exampleLength}" does not match the specified minLength "${minLength}".`,
            path: context.path,
          });
        }

        // Validate maxLength
        if (maxLength !== undefined && exampleLength !== maxLength) {
          errors.push({
            message: `Example length "${exampleLength}" does not match the specified maxLength "${maxLength}".`,
            path: context.path,
          });
        }
      }
    }

    return errors;
  }
);

export default sfDateFormatCheck;
