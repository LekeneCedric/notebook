import React, {useState} from 'react';
import INote from '../../../../models/note.model';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../../Text';
import styles from './styles';
import formatDate from '../../../../utils/formatDate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../shared/icon';
import {iconSize} from '../../../../shared/iconSize';
import Color from '../../../../shared/color';
import categoryColors from '../../../../shared/categoryColors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../../../hook';
import {updateNote} from '../../../../redux/reducers/noteSlice';
import {useDispatch} from 'react-redux';
import fontFamily from "../../../../shared/fontFamily";
import fontSize from "../../../../shared/fontSize";

type props = {
  selected?: boolean;
  select?: (id: string) => void;
  note: INote;
};
const gridMode: React.FC<props> = ({note, selected, select}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation = useNavigation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const selectMode = useAppSelector(state => state.notes.selectMode);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const colors = useAppSelector(state => state.theme.colors);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const noteIsFinish =
    note.type === 'list' && note.tasks!.filter(t => !t.done).length === 0;
  return (
    <>
      {note && (
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
          <Text numberOfLines={1} style={[styles.title, {fontFamily: noteIsFinish ? fontFamily.ysabeauText : fontFamily.ysabeauMedium, color: colors!.text , textDecorationLine: noteIsFinish ? 'line-through' : 'none'}]}>
            {note.title.length > 0
              ? note.title
              : note.type === 'list'
              ? note.tasks![0].title
              : note.text}
          </Text>
          <Text numberOfLines={1} style={[styles.time, {fontSize: fontSize.small, color: Color.gray}]}>
            {formatDate(note.updated_at!)}
          </Text>
          <View style={styles.content}>
            {note.type === 'list' ? (
              <ScrollView>
                {note.tasks?.slice(0, 4).map(note => {
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
                {note.tasks!.length > 4 && <Text style={styles.contentText}>.... autres</Text>}
              </ScrollView>
            ) : (
              <Text
                numberOfLines={6}
                style={[styles.contentText, {color: colors!.text}]}>
                {note.text}
              </Text>
            )}
          </View>
          <View style={[styles.row,{backgroundColor: currentTheme === 'black' ? colors?.secondary : categoryColors[note.color].background}]}>
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
        </TouchableOpacity>
      )}
    </>
  );
};
export default gridMode;
