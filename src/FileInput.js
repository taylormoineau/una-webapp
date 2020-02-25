import React, {createRef} from 'react';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const styles = {
  overlay: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    borderRadius: '50%',
    height: 70,
    width: 70
  }
};

export const FileInput = ({onChange}) => {
  const realFileInput = createRef();
  return (
    <Button
      size="large"
      color="primary"
      onClick={() => realFileInput.current.click()}
    >
      <AddPhotoAlternateIcon />
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
    </Button>
  );
};
