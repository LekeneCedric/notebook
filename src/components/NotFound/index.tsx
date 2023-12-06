import React from 'react';
import {Image, Text, View} from 'react-native';
import {useAppSelector} from '../../../hook';
import styles from './styles';

type props = {
  noteList?: boolean;
};
const NotFound: React.FC<props> = ({noteList}) => {
  const colors = useAppSelector(state => state.theme.colors);
  const theme = useAppSelector(state => state.theme.currentTheme);
  return (
    <View style={styles.container}>
      {theme === 'black' ? (
        <Image source={require('../../assets/images/no_results_black.png')} />
      ) : (
        <Image source={require('../../assets/images/no_results_light.png')} />
      )}
      <Text style={[styles.title, {color: colors!.text}]}>
        Oups, aucune note ne correspond a votre recherche
      </Text>
    </View>
  );
};
export default NotFound;
