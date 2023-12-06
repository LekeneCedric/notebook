/* eslint-disable */
import { TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../shared/icon';
import {iconSize} from '../../../shared/iconSize';
import Text from '../../Text';
import Colors from '../../../shared/color';
import { useAppSelector } from '../../../../hook';
import { useNavigation } from "@react-navigation/native";

type props = {
  width?: string,
  onChange ?: (text:string)=>void;
  activeSearch ?: boolean,
}
const SearchButton:React.FC<props> = ({onChange, activeSearch, width}) => {
  const navigation = useNavigation();
  const colors = useAppSelector(state=>state.theme.colors);
  const [disable, setDisable] = useState(activeSearch);
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={()=>{
        if (activeSearch===undefined) {
          //@ts-ignore
          navigation.push('search');
          setDisable(true);
          setTimeout(() => {
            setDisable(false);
          },1000)
        }

      }}
      style={[
        styles.container,
        {backgroundColor: colors?.secondary, width: width ? width : activeSearch!==undefined ? '85%' : '100%'},
      ]}>
      <Icon
        style={styles.icon}
        color={colors?.text}
        name={icons.GLOBAL.SEARCH}
        size={iconSize.NORMAL}
      />
      <TextInput
        onChangeText={text=>{
          if (onChange) {
            onChange(text);
          }}}
        cursorColor={colors?.text}
        editable={activeSearch !== undefined}
        placeholder={'Rechercher'}
        placeholderTextColor={colors?.text}
        style={[styles.text, {color: colors?.text}]} />
    </TouchableOpacity>
  );
};

export default SearchButton;
