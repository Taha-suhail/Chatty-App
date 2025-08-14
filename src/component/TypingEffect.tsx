import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
interface TypingEffectProps {
  text: string;
  style?: TextStyle;
}
const TypingEffect: FC<TypingEffectProps> = ({ text, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const words = text.split(' ');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length - 1) {
        setDisplayedText(prev =>
          prev ? `${prev} ${words[index]}` : `${words[index]}`,
        );
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);
  return <Text style={style}>{displayedText}</Text>;
};

export default TypingEffect;
