import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSize} from '../../shared/iconSize';
import Text from '../Text';
import {useAppSelector} from '../../../hook';
import {useNavigation} from '@react-navigation/native';

type props = {
  type: 'note' | 'list';
  icon: string;
  title: string;
  iconColor: string;
  textColor: string;
};
const SearchTypeItem: React.FC<props> = ({
  type,
  title,
  icon,
  iconColor,
  textColor,
}) => {
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);
  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigation.navigate('searchDetail', {type: type});
      }}
      style={[styles.container, {backgroundColor: colors!.secondary}]}>
      <Icon name={icon} color={iconColor} size={iconSize.MEDIUM} />
      <Text style={[styles.title, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default SearchTypeItem;
