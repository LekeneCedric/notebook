import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../../hook';
import styles from './styles';
import icons from '../../../shared/icon';
import Text from '../../Text';
import Item from './AddNoteModalItem';
import {heigth, width} from '../../../shared/space';

type props = {
  show: boolean;
  close: () => void;
};
const AddNoteModal: React.FC<props> = ({show, close}) => {
  const colors = useAppSelector(state => state.theme.colors);
  return (
    <Modal
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
        <View style={[styles.modalView, {backgroundColor: colors.secondary}]}>
          <Text style={[styles.title,{color:colors.text}]}>Ajouter une nouvelle tache</Text>
          <View style={styles.modalChildView}>
            <Item
              type={'note'}
              close={close}
              icon={icons.NOTE.TEXT}
              name={'Texte'}
            />
            <Item
              type={'list'}
              close={close}
              icon={icons.NOTE.LIST}
              name={'CheckList'}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddNoteModal;
