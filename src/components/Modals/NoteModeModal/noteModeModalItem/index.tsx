import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSize} from '../../../../shared/iconSize';
import Text from '../../../Text';
import {useAppSelector} from '../../../../../hook';
import icons from '../../../../shared/icon';
import {useDispatch} from 'react-redux';
import {switchMode} from '../../../../redux/reducers/noteSlice';
import Color from "../../../../shared/color";

type props = {
  value: 'list' | 'grid' | 'detail';
  icon: string;
  title: string;
  close: () => void;
};
const noteModalitem: React.FC<props> = ({value, icon, title, close}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentMode = useAppSelector(state => state.notes.mode);
  const colors = useAppSelector(state => state.theme.colors);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(switchMode(value));
        close();
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon color={Color.gray} name={icon} size={iconSize.MEDIUM} />
        <Text style={[styles.title,{color: colors.text}]}>{title}</Text>
      </View>
      {currentMode === value && (
        <Icon
          style={styles.icon}
          name={icons.GLOBAL.CHECK}
          size={iconSize.NORMAL}
        />
      )}
    </TouchableOpacity>
  );
};
export default noteModalitem;
