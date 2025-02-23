import React from 'react';
import { SpecialCharacterButton } from './SpecialCharacterButton';
import { specialCharactersLower, specialCharactersUpper } from '../constants';

export const App = () => {
  return (
    <div className='app-container'>
      <div className='row'>
        {specialCharactersLower.map(char => <SpecialCharacterButton text={char} />)}
      </div>
      <div className='row'>
        {specialCharactersUpper.map(char => <SpecialCharacterButton text={char} />)}
      </div>
    </div>
  );
};
