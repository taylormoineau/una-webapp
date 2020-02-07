import React, {createRef} from 'react';

export const FileInput = ({onChange, className}) => {
  const realFileInput = createRef();
  return (
    <button className={className} onClick={() => realFileInput.current.click()}>
      Upload Image
      <input
        type="file"
        style={{display: 'none'}}
        ref={realFileInput}
        onChange={e => {
          const reader = new FileReader();
          reader.addEventListener('load', () => onChange(reader.result), false);
          reader.readAsDataURL(e.target.files[0]);
        }}
      />
    </button>
  );
};
