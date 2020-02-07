import React, {useState} from 'react';

export const EditTitle = ({onChangeTitle}) => {
  const [titleState, setTitleState] = useState('');
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await onChangeTitle(titleState);
        setTitleState('');
      }}
    >
      Edit title:{' '}
      <input
        value={titleState}
        type="text"
        onChange={e => setTitleState(e.target.value)}
      />
      <button>Update title</button>
    </form>
  );
};
