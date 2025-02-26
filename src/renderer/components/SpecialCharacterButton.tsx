import * as React from 'react';
import { useCallback } from 'react';

type SpecialCharacterButtonProps = {
  text: string;
}

export const SpecialCharacterButton: React.FC<SpecialCharacterButtonProps> = ({ text }) => {
  const handleOnClick = useCallback(() => {
    console.log('clicked button');
    window.clipboard.writeTextToClipboard(text);
    console.log('wrote to clipboard');
  }, [text]);

  return <button className='special-character-button' onClick={handleOnClick}>{text}</button>;
};
