import * as React from 'react';
import { useCallback } from 'react';

type SpecialCharacterButtonProps = {
  text: string;
}

export const SpecialCharacterButton: React.FC<SpecialCharacterButtonProps> = ({ text }) => {
  const handleOnClick = useCallback(() => {
    window.clipboard.writeCharacter(text);
  }, [text]);

  return <button className='special-character-button' onClick={handleOnClick}>{text}</button>;
};
