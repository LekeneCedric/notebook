import {Switch, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../../../components/Text';
import styles from './styles';
import {useAppSelector} from '../../../../hook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../shared/icon';
import {iconSize} from '../../../shared/iconSize';
import Color from '../../../shared/color';
import {useDispatch} from 'react-redux';
import {switchTheme} from '../../../redux/reducers/themeSlice';
import CategoryColors from '../../../shared/categoryColors';
import ColorChoiceModal from '../../../components/Modals/ColorChoiceModal';
import {setDefaultColor} from '../../../redux/reducers/noteSlice';
import fontFamily from '../../../shared/fontFamily';
import {useNavigation} from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useAppSelector(state => state.notes.notes);
  const colors = useAppSelector(state => state.theme.colors);
  const theme = useAppSelector(state => state.theme.currentTheme);
  const defaultColor = useAppSelector(state => state.notes.defaultColor);
  const [isShowColorModal, setIsShowColorModal] = useState<boolean>(false);
  const [disableCorbeilleButton, setDisableCorbeilleButton] = useState(false);
  const [disableArchiveButton, setDisableArchiveButton] = useState(false);
  return (
    <View style={[styles.container, {backgroundColor: colors!.primary}]}>
      <Text style={{color: colors!.text}}>Parametres</Text>
      <View style={[styles.general, {backgroundColor: colors!.secondary}]}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            disabled={disableCorbeilleButton}
            onPress={() => {
              //@ts-ignore
              navigation.push('corbeille');
              setDisableCorbeilleButton(true);
              setTimeout(() => {
                setDisableCorbeilleButton(false);
              }, 1500);
            }}
            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name={icons.GLOBAL.DELETE}
              size={iconSize.MEDIUM}
              color={Color.primary}
            />
            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text style={{color: colors?.text}}>Corbeille</Text>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: fontFamily.ysabeauBold,
                }}>
                {notes.filter(n => n.isDelete).length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableArchiveButton}
            onPress={() => {
              //@ts-ignore
              navigation.push('archive');
              setDisableArchiveButton(true);
              setTimeout(() => {
                setDisableArchiveButton(false);
              }, 1500);
            }}
            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name={icons.GLOBAL.ARCHIVE}
              size={iconSize.MEDIUM}
              color={Color.primary}
            />
            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text style={{color: colors?.text}}>Archives</Text>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: fontFamily.ysabeauBold,
                }}>
                {notes.filter(n => n.isArchived).length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.general, {backgroundColor: colors!.secondary}]}>
        <Text style={[styles.title, {color: Color.primary}]}> Generale </Text>
        <View style={styles.rowItem}>
          <Icon
            name={icons.GLOBAL.MOON}
            size={iconSize.NORMAL}
            color={Color.gray}
          />
          <Text style={[styles.textItem, {color: colors!.text}]}>
            Mode sombre
          </Text>
          <Switch
            value={theme === 'black'}
            style={styles.switch}
            trackColor={{true: Color.primary}}
            thumbColor={theme === 'black' ? Color.primary : Color.gray}
            onValueChange={() => {
              dispatch(switchTheme(theme === 'black' ? 'light' : 'black'));
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.rowItem}
          onPress={() => {
            setIsShowColorModal(true);
          }}>
          <Icon
            name={icons.GLOBAL.PALETTE}
            size={iconSize.NORMAL}
            color={Color.gray}
          />
          <Text style={[styles.textItem, {color: colors!.text}]}>
            Couleur par defaut
          </Text>
          <Icon
            style={styles.switch}
            name={icons.GLOBAL.INDICATOR}
            size={iconSize.NORMAL}
            color={CategoryColors[defaultColor].principal}
          />
        </TouchableOpacity>
        <ColorChoiceModal
          parameters={true}
          changeColor={color => {
            dispatch(setDefaultColor(color));
            setIsShowColorModal(false);
          }}
          show={isShowColorModal}
          close={() => {
            setIsShowColorModal(false);
          }}
        />
      </View>
    </View>
  );
};

export default Details;
