import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {heigth, width} from '../../../shared/space';
import styles from './styles';
import {useAppSelector} from '../../../../hook';
import Text from '../../Text';
import categoryColors from '../../../shared/categoryColors';
import INote from '../../../models/note.model';
import Color from '../../../shared/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSize} from '../../../shared/iconSize';
import icons from '../../../shared/icon';
import fontSize from '../../../shared/fontSize';
import fontFamily from '../../../shared/fontFamily';
import {useDispatch} from 'react-redux';
import {editCategory} from '../../../redux/reducers/noteSlice';

type props = {
  parameters?: boolean;
  filter?: boolean;
  note?: INote;
  changeColor: (
    color:
      | 'red'
      | 'blue'
      | 'green'
      | 'yellow'
      | 'orange'
      | 'purple'
      | 'pink'
      | 'gray'
      | 'brown',
  ) => void;
  show: boolean;
  close: () => void;
};
const ColorChoiceModal: React.FC<props> = ({
  parameters,
  filter,
  show,
  close,
  note,
  changeColor,
}) => {
  const dispatch = useDispatch();
  const colors = useAppSelector(state => state.theme.colors);
  const defaultColor = useAppSelector(state => state.notes.defaultColor);
  const [isEdit, setIsEdit] = useState(false);
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const categoriesColors = useAppSelector(state => state.notes.categoriesColor);
  return (
    <Modal
      hardwareAccelerated={true}
      statusBarTranslucent={true}
      animationType={'fade'}
      transparent={true}
      visible={show}>
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
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: heigth(2),
              }}>
              <Text style={[styles.title, {color: colors.text}]}>
                {filter ? 'Filtrer par categorie' : 'Modifier categorie'}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  setIsEdit(!isEdit);
                }}>
                <Icon
                  name={icons.GLOBAL.EDIT}
                  size={iconSize.NORMAL}
                  color={Color.primary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {filter && (
                <TouchableOpacity
                  onPress={() => {
                    changeColor('all');
                  }}
                  style={[
                    styles.sectionContainer,
                    {
                      borderWidth: width(0.4),
                      borderColor: Color.null,
                    },
                  ]}>
                  <Icon color={Color.null} name={'null'} size={width(6)} />
                  <Text style={[styles.sectionTitle, {color: colors.text}]}>
                    {' '}
                    Toutes les notes{' '}
                  </Text>
                </TouchableOpacity>
              )}
              {Object.values(categoriesColors).map(color_ => (
                <TouchableOpacity
                  onPress={() => {
                    changeColor(color_.title);
                  }}
                  key={color_.principal}
                  style={[
                    styles.sectionContainer,
                    {
                      backgroundColor:
                        currentTheme == 'black'
                          ? Color.secondary
                          : color_.background,
                      borderWidth: width(
                        note?.color === color_.title ||
                          (parameters !== undefined &&
                            color_.title === defaultColor)
                          ? 0.6
                          : 0,
                      ),
                      borderColor: color_.principal,
                    },
                  ]}>
                  <View
                    style={[
                      styles.sectionColor,
                      {backgroundColor: color_.principal},
                    ]}
                  />
                  <TextInput
                    editable={isEdit}
                    value={color_.intitule}
                    onChangeText={text => {
                      dispatch(
                        editCategory({color: color_.title, value: text}),
                      );
                    }}
                    style={{
                      borderBottomColor: colors.text,
                      borderBottomWidth: isEdit ? 1 : 0,
                      width: '90%',
                      marginLeft: width(1),
                      fontSize: fontSize.text,
                      fontFamily: fontFamily.ysabeauText,
                      color: colors.text,
                    }}
                    placeholderTextColor={colors.text}
                    placeholder={'intitule'}
                  />
                </TouchableOpacity>
              ))}
              <View style={{marginBottom: heigth(8)}} />
            </ScrollView>
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};
export default ColorChoiceModal;
