import React from 'react';

export const FileInput = ({onChange}) => (
  <input
    type="file"
    onChange={e => {
      const reader = new FileReader();
      reader.addEventListener('load', () => onChange(reader.result), false);
      reader.readAsDataURL(e.target.files[0]);
    }}
  />
);
