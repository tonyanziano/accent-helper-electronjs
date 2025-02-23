import React, { useCallback } from 'react';

export const SpecialCharacterButton = ({ text }) => {
  const handleOnClick = useCallback(() => {
    console.log('clicked button');
    window.clipboard.writeTextToClipboard(text);
    console.log('wrote to clipboard');
  }, [text]);

  return <button className='special-character-button' onClick={handleOnClick}>{text}</button>;
};
