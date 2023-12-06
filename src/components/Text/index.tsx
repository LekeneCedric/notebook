import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import styles from './styles';
import { useAppSelector } from "../../../hook";
export default function Text(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<RNText> &
    Readonly<TextProps>,
) {
  const colors = useAppSelector(state => state.theme.colors);
  return <RNText {...props} style={[styles.text, {color: colors?.text}, props.style]} />;
}
