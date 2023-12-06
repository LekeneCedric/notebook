import React, {useState} from 'react';
import INote from '../../../../models/note.model';
import styles from './styles';
import categoryColors from '../../../../shared/categoryColors';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../../Text';
import formatDate from '../../../../utils/formatDate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../../../shared/color';
import icons from '../../../../shared/icon';
import {iconSize} from '../../../../shared/iconSize';
import {useAppSelector} from '../../../../../hook';
import {useNavigation} from '@react-navigation/native';
import {heigth} from '../../../../shared/space';
import {useDispatch} from 'react-redux';
import {updateNote} from '../../../../redux/reducers/noteSlice';
import fontFamily from "../../../../shared/fontFamily";
import fontSize from "../../../../shared/fontSize";

type props = {
  selected?: boolean;
  select?: (id: string) => void;
  note: INote;
};
const DetailMode: React.FC<props> = ({note, selected, select}) => {
  const dispatch = useDispatch();
  const selectMode = useAppSelector(state => state.notes.selectMode);
  const colors = useAppSelector(state => state.theme.colors!);
  const navigation = useNavigation();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const noteIsFinish =
    note.type === 'list' && note.tasks!.filter(t => !t.done).length === 0;
  return (
    <TouchableOpacity
      disabled={isDisable}
      style={[
        styles.container,
        {
          backgroundColor:
            currentTheme === 'black'
              ? colors!.secondary
              : categoryColors[note.color!].background,
          borderLeftWidth: 10,
          borderRightWidth: selected ? 2 : 0,
          borderTopWidth: selected ? 2 : 0,
          borderBottomWidth: selected ? 2 : 0,
          borderLeftColor: categoryColors[note.color].principal,
          borderRightColor: colors!.text,
          borderTopColor: colors!.text,
          borderBottomColor: colors!.text,
          shadowColor: colors!.secondary,
        },
      ]}
      onLongPress={() => {
        if (select) {
          select(note.id);
        }
      }}
      onPress={() => {
        if (selectMode) {
          if (select) {
            select(note.id);
          }
        } else {
          setIsDisable(true);
          setTimeout(() => {
            setIsDisable(false);
          }, 1000);
          //@ts-ignore
          navigation.push('addNote', {note: JSON.stringify(note)});
        }
      }}>
      <View style={{flexDirection: 'column'}}>
        <Text numberOfLines={1} style={[styles.title, {fontFamily: noteIsFinish ? fontFamily.ysabeauText : fontFamily.ysabeauMedium, color: colors!.text , textDecorationLine: noteIsFinish ? 'line-through' : 'none'}]}>
          {note.title.length > 0
            ? note.title
            : note.type === 'list'
            ? note.tasks![0].title
            : note.text}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.6,
            borderBottomColor: colors!.gray,
          }}>
          <Text numberOfLines={1} style={[{fontSize: fontSize.small, color: Color.gray}]}>
            {formatDate(note.updated_at!)}
          </Text>
          <View style={styles.row}>
            {/*<Icon*/}
            {/*  style={styles.icon}*/}
            {/*  color={Color.gray}*/}
            {/*  name={icons.GLOBAL.CALENDAR}*/}
            {/*  size={iconSize.SMALL}*/}
            {/*/>*/}
            {note.type === 'list' ? (
              <Icon
                style={styles.icon}
                color={Color.gray}
                name={icons.NOTE.LIST}
                size={iconSize.SMALL}
              />
            ) : (
              <Icon
                style={styles.icon}
                color={Color.gray}
                name={icons.NOTE.TEXT}
                size={iconSize.SMALL}
              />
            )}
            {note.isFavorite ? (
              <TouchableOpacity
                onPress={() => {
                  dispatch(updateNote({...note, isFavorite: false}));
                }}>
                <Icon
                  style={styles.icon}
                  name={icons.GLOBAL.STAR_SHARED}
                  size={iconSize.SMALL}
                  color={colors!.yellow}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  dispatch(updateNote({...note, isFavorite: true}));
                }}>
                <Icon
                  style={styles.icon}
                  name={icons.GLOBAL.STAR}
                  size={iconSize.SMALL}
                  color={colors!.yellow}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={[styles.content, {marginTop: heigth(0.5)}]}>
          {note.type === 'list' ? (
            <ScrollView>
              {note.tasks?.slice(0, 3).map(note => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name={
                        note.done
                          ? icons.NOTE.CHECKLIST.CHECK
                          : icons.NOTE.CHECKLIST.UNCHECK
                      }
                      color={note.done ? Color.gray : colors!.text}
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.contentText,
                        {
                          color: note.done ? Color.gray : colors!.text,
                          textDecorationLine: note.done
                            ? 'line-through'
                            : 'none',
                        },
                      ]}>
                      {note.title}
                    </Text>
                  </View>
                );
              })}
              {/*{note.tasks!.length > 3 && <Text style={styles.contentText}>.... autres</Text>}*/}
            </ScrollView>
          ) : (
            <Text
              numberOfLines={3}
              style={[styles.contentText, {color: colors!.text}]}>
              {note.text}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default DetailMode;
