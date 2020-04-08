import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {MIDDLE_FONT} from '../../styles/theme.style';

const Subtitle = ({children, extraStyles, ...props}) => {
  return (
    <Text {...props} style={{...styles.subtitle, ...extraStyles}}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: MIDDLE_FONT,
    textTransform: 'capitalize',
  },
});
export default Subtitle;
