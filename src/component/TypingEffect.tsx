import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useChat } from '../context/ChatContext';
import { colors } from '../styles/colors';
interface TypingEffectProps {
  text: string;
  style?: TextStyle;
}
const TypingEffect: FC<TypingEffectProps> = ({ text, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const words = text?.split(' ');
  const { state, dispatch } = useChat();
  const dark = state.isDark;
  console.log(words);
  useEffect(() => {
    let index = 0;
    // setDisplayedText('');
    const interval = setInterval(() => {
      if (index < words?.length) {
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
  // useEffect(() => {
  //   if (!words || words.length === 0) return;

  //   let index = 0;
  //   setDisplayedText(''); // reset before starting

  //   const interval = setInterval(() => {
  //     setDisplayedText(prev =>
  //       prev ? `${prev} ${words[index]}` : `${words[index]}`,
  //     );

  //     index++;
  //     if (index >= words.length) {
  //       clearInterval(interval);
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [text]);

  return (
    <Text style={[style, { color: dark ? colors.white : colors.black }]}>
      {displayedText}
    </Text>
  );
};

export default TypingEffect;
