import React, {useState} from 'react';
import {useAppSelector} from '../../../../../hook';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSize} from '../../../../shared/iconSize';
import Text from '../../../Text';
import {useNavigation} from '@react-navigation/native';
import Color from '../../../../shared/color';
import uuid from 'react-native-uuid';

type propsItem = {
  children?: React.ReactNode;
  icon: string;
  name: string;
  type: 'note' | 'list';
  close?: () => void;
};
const Item: React.FC<propsItem> = ({icon, close, type, name, children}) => {
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);
  const defaultColor = useAppSelector(state => state.notes.defaultColor);
  const note = {
    //@ts-ignore
    id: uuid.v4(),
    title: '',
    type: type,
    tasks: [],
    text: '',
    color: defaultColor,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const [disabled, setDisabled] = useState(false);
  return (
    <View>
      {children}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          if (close) {
            close();
          }
          //@ts-ignore
          navigation.push('addNote', {note: JSON.stringify(note)});
          setDisabled(true);
          setTimeout(() => {
            setDisabled(false);
          }, 1500);
        }}
        style={[styles.itemContainer, {backgroundColor: Color.primary}]}>
        <Icon
          style={styles.itemIcon}
          name={icon}
          size={iconSize.MEDIUM}
          color={colors?.light}
        />
        <Text style={[styles.itemText, {color: colors?.light}]}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Item;
