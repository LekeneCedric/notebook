import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import {useAppSelector} from '../../../../hook';
import Text from '../../Text';

const EmptyTrash: React.FC<{}> = () => {
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const colors = useAppSelector(state => state.theme.colors);
  return (
    <View style={styles.container}>
      {currentTheme === 'black' ? (
        <Image
          source={require('../../../assets/images/empty_trash_black.png')}
        />
      ) : (
        <Image
          source={require('../../../assets/images/empty_trash_light.png')}
        />
      )}
      <Text style={{textAlign: 'center', color: colors?.text}}>
        Les notes que vous supprimerez seront temporairement stockées ici
      </Text>
    </View>
  );
};
export default EmptyTrash;
