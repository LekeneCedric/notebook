import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../../hook';
import {View, Modal, TouchableHighlight, TouchableOpacity} from 'react-native';
import {heigth, width} from '../../../shared/space';
import styles from '../filterNoteModal/styles';
import Text from '../../Text';
import React from 'react';
import icons from '../../../shared/icon';
import NoteModeModalItem from './noteModeModalItem';

type props = {
  show: boolean;
  close: () => void;
};

const NoteModeModal: React.FC<props> = ({show, close}) => {
  const colors = useAppSelector(state => state.theme.colors);
  const presentationList = [
    {
      value: 'list',
      icon: icons.GLOBAL.PRESENTATION.LIST,
      title: 'Liste',
    },
    {
      value: 'grid',
      icon: icons.GLOBAL.PRESENTATION.GRID,
      title: 'Grille',
    },
    {
      value: 'detail',
      icon: icons.GLOBAL.PRESENTATION.DETAIL,
      title: 'Details',
    },
  ];
  return (
    <Modal
      hardwareAccelerated={true}
      statusBarTranslucent={true}
      animationType={'fade'}
      transparent={true}
      visible={show}
      onRequestClose={() => {}}>
      <TouchableOpacity
        onPressOut={close}
        style={{
          position: 'relative',
          backgroundColor: 'rgba(44,44,44,0.68)',
          height: heigth(100),
          width: width(100),
        }}>
        <TouchableHighlight
          style={[styles.modalView, {height: heigth(28), backgroundColor: colors.secondary}]}>
          <View style={styles.modalChildView}>
            <Text style={[styles.title, {color: colors.text}]}>
              Presentation
            </Text>
            {presentationList.map(pres => {
              return (
                <NoteModeModalItem
                  //@ts-ignore
                  value={pres.value}
                  icon={pres.icon}
                  title={pres.title}
                  close={close}
                />
              );
            })}
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};
export default NoteModeModal;
