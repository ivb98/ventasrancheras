import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {BIG_FONT} from '../../styles/theme.style';

const Title = ({children, extraStyles}) => {
  return <Text style={{...styles.title, ...extraStyles}}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: BIG_FONT,
    textTransform: 'capitalize',
  },
});
export default Title;
