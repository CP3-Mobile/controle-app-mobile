import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { MotiView, MotiText } from 'moti';

export function AnimateOnFocusView({ children, ...rest }) {
  const [key, setKey] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setKey((k) => k + 1);
    }, [])
  );
  return (
    <MotiView
      key={key}
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      {...rest}
    >
      {children}
    </MotiView>
  );
}

export function AnimateOnFocusText({ children, ...rest }) {
  const [key, setKey] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setKey((k) => k + 1);
    }, [])
  );
  return (
    <MotiText
      key={key}
      from={{ opacity: 0, translateY: -6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 280 }}
      {...rest}
    >
      {children}
    </MotiText>
  );
}
