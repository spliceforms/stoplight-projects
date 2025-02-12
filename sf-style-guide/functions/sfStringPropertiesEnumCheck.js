import { createRulesetFunction } from '@stoplight/spectral-core';

export const sfStringPropertiesEnumCheck = createRulesetFunction(
  {
    input: null,
    options: null,
  },
  function sfStringPropertiesEnumCheck(targetVal, options, context) {
    const errors = [];

    if (targetVal.type === 'string' && targetVal.enum) {
      const enumValues = targetVal.enum;
      const pattern = targetVal.pattern;
      const minLength = targetVal.minLength;
      const maxLength = targetVal.maxLength;

      // Validate pattern
      if (pattern) {
        const regex = new RegExp(pattern);
        for (const value of enumValues) {
          if (!regex.test(value)) {
            errors.push({
              message: `Enum value "${value}" does not match the specified pattern.`,
              path: context.path,
            });
          }
        }
      }

      // Validate minLength and maxLength
      for (const value of enumValues) {
        if (minLength !== undefined && value.length < minLength) {
          errors.push({
            message: `Enum value "${value}" length is less than the specified minLength.`,
            path: context.path,
          });
        }
        if (maxLength !== undefined && value.length > maxLength) {
          errors.push({
            message: `Enum value "${value}" length is greater than the specified maxLength.`,
            path: context.path,
          });
        }
      }
    }

    return errors;
  }
);

export default sfStringPropertiesEnumCheck;
