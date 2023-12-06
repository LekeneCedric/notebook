/* eslint-disable */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../shared/icon';
import { iconSize } from '../../../shared/iconSize';
import { useAppSelector } from '../../../../hook';
import styles from './styles';
import Color from "../../../shared/color";

type props = {
  onPress?:()=>void;
}
const AddNote:React.FC<props> = ({onPress}) => {
  const colors = useAppSelector(state=>state.theme.colors);
  const currentTheme = useAppSelector(state=>state.theme.currentTheme);
  return (
		<TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor: currentTheme==='light'? colors.primary: Color.primary}]}>
			<Icon name={icons.NOTE.ADD} size={iconSize.NORMAL} color={colors.text} />
		</TouchableOpacity>

  )
}

export default AddNote;
