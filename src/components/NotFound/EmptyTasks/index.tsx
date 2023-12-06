import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import {useAppSelector} from '../../../../hook';
import Text from '../../Text';

type props = {
  emptyCalendar?: boolean;
};
const EmptyTasks: React.FC<props> = ({emptyCalendar}) => {
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const colors = useAppSelector(state => state.theme.colors);
  return (
    <View style={styles.container}>
      {currentTheme === 'black' ? (
        <Image
          source={require('../../../assets/images/empty_folder_black.png')}
        />
      ) : (
        <Image
          source={require('../../../assets/images/empty_folder_light.png')}
        />
      )}
      <Text style={{textAlign: 'center', color: colors?.text}}>
        {' '}
        {emptyCalendar
          ? "Aucune tache n'a été programmée a cette periode"
          : 'Organiser vos notes vous rendra plus productif'}
      </Text>
    </View>
  );
};
export default EmptyTasks;
