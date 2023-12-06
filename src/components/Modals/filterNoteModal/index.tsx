import React from 'react';
import {Modal, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {heigth, width} from '../../../shared/space';
import styles from './styles';
import {useAppSelector} from '../../../../hook';
import Text from '../../Text';
import icons from '../../../shared/icon';
import {iconSize} from '../../../shared/iconSize';
import Color from '../../../shared/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from "react-redux";
import { filter_ } from "../../../redux/reducers/noteSlice";

type props = {
  show: boolean;
  close: () => void;
};
const FilterNoteModal: React.FC<props> = ({show, close}) => {
  const dispatch = useDispatch();
  const colors = useAppSelector(state => state.theme.colors);
  const filter = useAppSelector(state => state.notes.filter);
  const filterElements = [
    {
      title: 'Heure de modificaton',
      icon: icons.GLOBAL.EDIT,
      code: 'modif',
    },
    {
      title: 'Heure de creation',
      icon: icons.GLOBAL.CREATE,
      code: 'create',
    },
    {
      title: 'Couleur',
      icon: icons.GLOBAL.PALETTE,
      code: 'color',
    },
    {
      title: 'Favoris',
      icon: icons.GLOBAL.STAR,
      code: 'fav',
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
          style={[styles.modalView, {backgroundColor: colors.secondary}]}>
          <View style={styles.modalChildView}>
            <Text style={[styles.title, {color: colors.text}]}>Trier par</Text>

            {filterElements.map(element => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(filter_(element.code));
                    close();
                  }}
                  style={styles.rowItem}>
                  <Icon
                    name={element.icon}
                    size={iconSize.NORMAL}
                    color={Color.gray}
                  />
                  <Text style={[styles.textItem, {color: colors.text}]}>
                    {element.title}
                  </Text>
                  {filter === element.code && (
                    <Icon
                      name={icons.GLOBAL.CHECK}
                      style={[styles.icon, {color: Color.primary}]}
                      size={iconSize.NORMAL}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};
export default FilterNoteModal;
