import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../shared/color';
import icons from '../../shared/icon';
import {iconSize} from '../../shared/iconSize';
import styles from './styles';
import Text from '../../components/Text';
import {useAppSelector} from '../../../hook';
import {heigth, width} from '../../shared/space';
import ITask from '../../models/task.model';
import INote from '../../models/note.model';
import {useDispatch} from 'react-redux';
import {
  deleteDefinitlyNotes,
  deleteNote,
  restaureDeleteNotes,
  updateNote,
} from '../../redux/reducers/noteSlice';
import generateRandomId from '../../utils/idGenerator';
import formatDate from '../../utils/formatDate';
import ColorChoiceModal from '../../components/Modals/ColorChoiceModal';
import categoryColors from '../../shared/categoryColors';
import Color from '../../shared/color';
import Toast from 'react-native-toast-message';

const AddNote: React.FC<{}> = ({}) => {
  const colors = useAppSelector(state => state.theme.colors);
  const route = useRoute();
  const navigation = useNavigation();
  //@ts-ignore
  const [note, setNote] = useState<INote>(JSON.parse(route!.params!.note));
  const [update, setUpdate] = useState(false);
  const [showModalColor, setShowModalColor] = useState<boolean>(false);
  const dispatch = useDispatch();
  // --------------------------------- Text --------------------------------- //
  const inputTextRef = useRef<TextInput>(null);
  // --------------------------------- Tasks --------------------------------- //
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const addTaskRef = useRef<ScrollView>(null);
  const inputTaskRef = useRef<TextInput>(null);
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(true);
  const ScrollToAddButton = () => {
    if (addTaskRef.current) {
      // addTaskRef.current.scrollToEnd({animated: true});
    }
  };
  useEffect(() => {
    const noteIsListAndEmpty =
      note.type === 'list' &&
      note.title.length === 0 &&
      note.tasks?.length === 0;
    const noteIsNoteAndEmpty =
      note.type === 'note' &&
      note.title.length === 0 &&
      note.text?.length === 0;
    if (noteIsListAndEmpty || noteIsNoteAndEmpty) {
      setIsPresentationMode(false);
    }
  }, [note]);
  useEffect(() => {
    // Set the cursor position to the top after component mounts
    if (inputTextRef.current) {
      inputTextRef.current.setNativeProps({textAlignVertical: 'top'});
    }
  }, []);

  useEffect(() => {
    ScrollToAddButton();
    if (inputTaskRef.current) {
      inputTaskRef.current.focus();
    }
  }, [isAddTask]);
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: colors?.text,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor:
          currentTheme === 'black'
            ? colors?.primary
            : categoryColors[note.color!].background,
      },
      headerRight: () => (
        <View style={[styles.containerHeaderRight]}>
          {!note.isDelete && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setShowModalColor(true);
                }}
                style={styles.headerRightItem}>
                <Icon
                  color={categoryColors[note.color!].principal}
                  name={icons.GLOBAL.CATEGORY}
                  size={iconSize.NORMAL}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setNote({...note, isFavorite: !note.isFavorite});
                  setUpdate(!update);
                }}
                style={styles.headerRightItem}>
                <Icon
                  color={note.isFavorite ? colors?.yellow : colors?.text}
                  name={
                    note.isFavorite
                      ? icons.GLOBAL.STAR_SHARED
                      : icons.GLOBAL.STAR
                  }
                  size={iconSize.NORMAL}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const showToast = () => {
                    Toast.show({
                      // position: 'bottom',
                      type: 'info',
                      text1: 'Message',
                      text2: `Note ${
                        note.isArchived ? 'desarchiver' : 'archiver'
                      } avec success`,
                    });
                  };
                  Alert.alert(
                    note.isArchived
                      ? 'Desarchiver la note'
                      : 'Archiver la note',
                    `Voulez vous reellement ${
                      note.isArchived ? 'desarchiver' : 'archiver'
                    } la note ?`,
                    [
                      {
                        text: 'Annuler',
                        onPress: () => {},
                      },
                      {
                        text: 'Oui',
                        onPress: () => {
                          setNote({...note, isArchived: !note.isArchived});
                          setUpdate(!update);
                        },
                      },
                    ],
                  );
                  showToast();
                }}
                style={styles.headerRightItem}>
                <Icon
                  color={colors?.text}
                  name={
                    note.isArchived
                      ? icons.GLOBAL.ARCHIVE
                      : icons.GLOBAL.ARCHIVE_OUTLINE
                  }
                  size={iconSize.NORMAL}
                />
              </TouchableOpacity>
            </>
          )}
          {note.isDelete && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Restaurer la note',
                  'Voulez vous rellement restaurer la note ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {},
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        dispatch(restaureDeleteNotes([note.id]));
                        navigation.goBack();
                      },
                    },
                  ],
                );
              }}>
              <Icon
                name={icons.GLOBAL.REFRESH}
                color={colors?.text}
                size={iconSize.NORMAL}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                `Suppression ${note.isDelete ? 'definitive' : ''}la note`,
                `Voulez vous rellement supprimer ${
                  note.isDelete ? 'definitivement' : ''
                } la note ?`,
                [
                  {
                    text: 'Annuler',
                    onPress: () => {},
                  },
                  {
                    text: 'Oui',
                    onPress: () => {
                      if (!note.isDelete) {
                        dispatch(deleteNote(note.id!));
                      } else {
                        dispatch(deleteDefinitlyNotes([note.id]));
                      }
                      navigation.goBack();
                    },
                  },
                ],
              );
            }}
            style={styles.headerRightItem}>
            <Icon
              color={Colors.danger}
              name={icons.GLOBAL.DELETE}
              size={iconSize.NORMAL}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, update, note]);
  useEffect(() => {
    console.log('update note');
    if (note.type === 'list') {
      setNote({
        ...note,
        updated_at: new Date(),
      });
    } else {
      setNote({...note, updated_at: new Date()});
    }
    dispatch(updateNote(note));
  }, [update]);
  return (
    <>
      <ColorChoiceModal
        changeColor={color => {
          setNote({...note, color: color});
          setUpdate(!update);
          setShowModalColor(false);
        }}
        note={note}
        show={showModalColor}
        close={() => {
          setShowModalColor(false);
        }}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              currentTheme === 'black'
                ? colors?.primary
                : categoryColors[note.color!].background,
          },
        ]}>
        {/*Title View */}
        <View style={{height: heigth(6)}}>
          <TextInput
            multiline={true}
            editable={!note.isDelete && !isPresentationMode}
            underlineColorAndroid={'transparent'}
            value={note.title}
            onChangeText={text => {
              setNote({...note, title: text});
              setUpdate(!update);
            }}
            placeholder={'En-tete'}
            placeholderTextColor={colors?.text}
            style={[styles.inputTitle, {color: colors?.text}]}
          />
        </View>
        {/*Modified date View */}
        <View
          style={[styles.horizontalAlign, {borderBottomColor: colors?.text}]}>
          <Text style={{color: colors?.text}}>
            Modifie le :
            <Text style={[styles.date, {color: colors?.text}]}>
              {formatDate(note.updated_at!)}
            </Text>
          </Text>
          <Icon
            name={icons.GLOBAL.CALENDAR}
            size={iconSize.NORMAL}
            color={colors?.text}
          />
        </View>
        {/* Content*/}
        <ScrollView style={{height: heigth(75)}} showsVerticalScrollIndicator={false} ref={addTaskRef}>
          {note.type === 'note' ? (
            !note.isDelete && !isPresentationMode ? (
              <>
                <TextInput
                  scrollEnabled={false}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor={colors?.text}
                  ref={inputTextRef}
                  autoFocus={true}
                  value={note.text}
                  onChangeText={text => {
                    setNote({...note, text: text});
                    setUpdate(!update);
                  }}
                  textAlignVertical={'top'}
                  multiline={true}
                  placeholder={'Entrez le contenue de la note ici'}
                  style={[styles.inputDesc, {color: colors?.text}]}
                />
              </>
            ) : (
              <Text style={[styles.inputDescription, {color: colors?.text}]}>
                {note.text}
              </Text>
            )
          ) : (
            <>
              {note.tasks!.map((item, index) => {
                // Si la tache n'est pas encore termine
                if (!item.done) {
                  return (
                    <View key={index} style={styles.taskContainer}>
                      <View style={styles.taskCheck}>
                        <TouchableOpacity
                          disabled={note.isDelete}
                          onPress={() => {
                            setNote({
                              ...note,
                              tasks: note.tasks!.map((el, i) => {
                                if (i === index) {
                                  return {...el, done: !el.done};
                                }
                                return el;
                              }),
                            });
                            setUpdate(!update);
                          }}>
                          <Icon
                            color={colors?.text}
                            name={
                              item.done
                                ? icons.NOTE.CHECKLIST.CHECK
                                : icons.NOTE.CHECKLIST.UNCHECK
                            }
                            size={iconSize.NORMAL}
                          />
                        </TouchableOpacity>
                      </View>
                      <TextInput
                        editable={!note.isDelete && !isPresentationMode}
                        ref={inputTaskRef}
                        value={item.title}
                        autoFocus={true}
                        multiline={true}
                        onChangeText={text => {
                          setNote({
                            ...note,
                            tasks: note.tasks!.map((el, i) => {
                              if (i === index) {
                                return {...el, title: text};
                              }
                              return el;
                            }),
                          });
                          setUpdate(!update);
                        }}
                        underlineColorAndroid={'transparent'}
                        placeholder={`tache ${index + 1}`}
                        placeholderTextColor={colors?.gray}
                        style={[styles.taskInput, {color: colors?.text}]}
                      />
                      {!note.isDelete && !isPresentationMode && (
                        <TouchableOpacity
                          onPress={() => {
                            setNote({
                              ...note,
                              tasks: note.tasks!.filter((_, i) => i !== index),
                            });
                            setUpdate(!update);
                          }}
                          style={styles.taskDelete}>
                          <Icon
                            color={colors?.danger}
                            name={icons.NOTE.CHECKLIST.DELETE}
                            size={iconSize.NORMAL}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }
              })}
              {!note.isDelete && !isPresentationMode && (
                <TouchableOpacity
                  style={[styles.addTask, {borderBottomColor: colors?.text}]}
                  onPress={() => {
                    setIsAddTask(!isAddTask);
                    setNote({
                      ...note,
                      tasks: [
                        ...note.tasks!,
                        {id: generateRandomId(), title: '', done: false},
                      ],
                    });
                  }}>
                  <Icon
                    color={colors?.text}
                    style={{marginRight: width(5)}}
                    name={icons.NOTE.CHECKLIST.ADD}
                    size={iconSize.NORMAL}
                  />
                  <Text style={[styles.addText, {color: colors?.text}]}>
                    {' '}
                    Ajouter{' '}
                  </Text>
                </TouchableOpacity>
              )}
              {note.tasks!.map((item, index) => {
                // Si la tache est termine
                if (item.done) {
                  return (
                    <View key={index} style={styles.taskContainer}>
                      <View style={styles.taskCheck}>
                        <TouchableOpacity
                          disabled={note.isDelete}
                          onPress={() => {
                            setNote({
                              ...note,
                              tasks: note.tasks!.map((el, i) => {
                                if (i === index) {
                                  return {...el, done: !el.done};
                                }
                                return el;
                              }),
                            });
                            setUpdate(!update);
                          }}>
                          <Icon
                            color={Color.gray}
                            name={
                              item.done
                                ? icons.NOTE.CHECKLIST.CHECK
                                : icons.NOTE.CHECKLIST.UNCHECK
                            }
                            size={iconSize.NORMAL}
                          />
                        </TouchableOpacity>
                      </View>
                      <TextInput
                        ref={inputTaskRef}
                        editable={false}
                        multiline={true}
                        value={item.title}
                        underlineColorAndroid={'transparent'}
                        placeholder={`tache ${index}`}
                        placeholderTextColor={colors?.secondary}
                        style={[styles.taskInputDone, {color: Color.gray}]}
                      />
                    </View>
                  );
                }
              })}
            </>
          )}
        </ScrollView>
        {/* Footer */}
        {!note.isDelete && (
          <View
            style={[
              styles.footer,
              {
                backgroundColor:
                  currentTheme === 'black'
                    ? colors?.primary
                    : categoryColors[note.color!].background,
              },
            ]}>
            <Text style={styles.presentationText}>
              {isPresentationMode ? 'Editer' : 'Valider'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsPresentationMode(!isPresentationMode);
              }}>
              <Icon
                color={colors?.text}
                name={isPresentationMode ? icons.NOTE.ADD : icons.GLOBAL.CHECK}
                size={iconSize.MEDIUM}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};
export default AddNote;
