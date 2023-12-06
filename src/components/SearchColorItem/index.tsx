import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

type props = {
  title: string;
  color: string;
};
const SearchColorItem: React.FC<props> = ({title, color}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigation.navigate('searchDetail', {color: title});
      }}
      style={[styles.container, {backgroundColor: color}]}
    />
  );
};
export default SearchColorItem;
