import React, {useState} from 'react';

export const CreatePage = ({onCreateNewPage}) => {
  const [newPageDes, setNewPageDes] = useState('');
  return (
    <>
      <h2>Create new Page below:</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          onCreateNewPage(newPageDes);
        }}
      >
        <label>
          Title:
          <input
            type="text"
            value={newPageDes}
            onChange={e => setNewPageDes(e.target.value)}
          />
        </label>
        <button className="btn btn-success btn-lg">Create new page</button>
      </form>
    </>
  );
};
