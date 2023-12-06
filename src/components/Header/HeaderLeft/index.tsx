/* eslint-disable */
import {View} from 'react-native'
import React from 'react'
import Text from '../../Text'
import styles from './styles'
import { useAppSelector } from '../../../../hook'
import Color from "../../../shared/color";

const HeaderLeft = () => {
  const colors = useAppSelector(state=>state.theme.colors);
  const currentTheme = useAppSelector(state=>state.theme.currentTheme);
  return (
	  <Text style={[styles.text,{color:currentTheme==='light'?Color.primary: colors.text}]}>NoteBook</Text>
  )
}

export default HeaderLeft
