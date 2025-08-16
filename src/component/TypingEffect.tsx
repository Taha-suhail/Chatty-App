// import { StyleSheet, Text, TextStyle, View } from 'react-native';
// import React, { FC, useEffect, useState } from 'react';
// import { useChat } from '../context/ChatContext';
// import { colors } from '../styles/colors';
// interface TypingEffectProps {
//   text: string;
//   style?: TextStyle;
// }
// const TypingEffect: FC<TypingEffectProps> = ({ text, style }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const words = text?.split(' ');
//   const { state, dispatch } = useChat();
//   const dark = state.isDark;
//   console.log(words);
//   useEffect(() => {
//     let index = 0;
//     // setDisplayedText('');
//     const interval = setInterval(() => {
//       if (index < words?.length) {
//         setDisplayedText(prev =>
//           prev ? `${prev} ${words[index]}` : `${words[index]}`,
//         );
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   }, [text]);
//   // useEffect(() => {
//   //   if (!words || words.length === 0) return;

//   //   let index = 0;
//   //   setDisplayedText(''); // reset before starting

//   //   const interval = setInterval(() => {
//   //     setDisplayedText(prev =>
//   //       prev ? `${prev} ${words[index]}` : `${words[index]}`,
//   //     );

//   //     index++;
//   //     if (index >= words.length) {
//   //       clearInterval(interval);
//   //     }
//   //   }, 100);

//   //   return () => clearInterval(interval);
//   // }, [text]);

//   return (
//     <Text style={[style, { color: dark ? colors.white : colors.black }]}>
//       {displayedText}
//     </Text>
//   );
// };

// export default TypingEffect;

import React, { FC, useEffect, useState } from 'react';
import { TextStyle } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { useChat } from '../context/ChatContext';
import { colors } from '../styles/colors';

interface TypingEffectProps {
  text: string;
  style?: TextStyle;
  speedMsPerChar?: number; // optional: tweak speed
  wordPauseMs?: number; // optional: longer pause on spaces to feel word-by-word
}

const TypingEffect: FC<TypingEffectProps> = ({
  text,
  style,
  speedMsPerChar = 15,
  wordPauseMs = 30,
}) => {
  const { state } = useChat();
  const dark = state.isDark;

  // force re-mount of the TypeWriter when text changes so it restarts typing
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(k => k + 1);
  }, [text]);

  return (
    <TypeWriter
      key={key}
      typing={1} // start typing
      fixed // keeps layout stable while typing
      minDelay={speedMsPerChar}
      maxDelay={speedMsPerChar}
      // Add a pause at spaces so it *feels* word-by-word
      delayMap={[{ at: ' ', delay: wordPauseMs }]}
      style={[style, { color: dark ? colors.white : colors.black }]}
    >
      {(text || '').trim()}
    </TypeWriter>
  );
};

export default TypingEffect;
