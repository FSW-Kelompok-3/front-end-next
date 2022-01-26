import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function FormErrors({ formErrors }) {
  return (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <p key={i}>
              {fieldName}
              {' '}
              {formErrors[fieldName]}
            </p>
          );
        }
        return '';
      })}
    </div>
  );
}
