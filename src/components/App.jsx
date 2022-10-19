import Contacts from "./Contacts/Contacts";
import React from 'react';

export const App = () => {
  return (
    <div
      style={{

        display: 'flex',
        justifyContent: 'center',

        color: '#010101'
      }}
    >
      <Contacts/>
    </div>
  );
};
