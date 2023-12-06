import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AddNote from '../../../components/Buttons/AddNote';
import SearchButton from '../../../components/Notes/SearchButton';
import styles from './styles';
import AddNoteModal from '../../../components/Modals/AddNoteModal';
import {useAppSelector} from '../../../../hook';
import NotFound from '../../../components/NotFound';
import GridMode from '../../../components/Notes/NoteItem/gridMode';
import ListMode from '../../../components/Notes/NoteItem/ListMode';
import DetailMode from '../../../components/Notes/NoteItem/detailMode';
import {useNavigation} from '@react-navigation/native';
import HeaderRight from '../../../components/Header/HeaderRight';
import HeaderLeft from '../../../components/Header/HeaderLeft';
import Text from '../../../components/Text';
import fontFamily from '../../../shared/fontFamily';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSize} from '../../../shared/iconSize';
import icons from '../../../shared/icon';
import {width} from '../../../shared/space';
import Color from '../../../shared/color';
import {useDispatch} from 'react-redux';
import {
  archiveNotes,
  deleteNotes,
  setSelectMode,
  starNotes,
} from '../../../redux/reducers/noteSlice';
import EmptyTasks from '../../../components/NotFound/EmptyTasks';
import SplashScreen from 'react-native-splash-screen';

const Notes: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalAddNoteVisible, setModalAddNoteVisible] = useState(false);
  const notes = useAppSelector(state =>
    state.notes.notes.filter(
      n =>
        !n.isArchived &&
        !n.isDelete &&
        (n.type === 'list' ? n.tasks!.filter(n => !n.done).length > 0 : true),
    ),
  );
  const finishNotes = useAppSelector(state =>
    state.notes.notes.filter(
      n =>
        !n.isArchived &&
        !n.isDelete &&
        n.type === 'list' &&
        n.tasks!.filter(n => !n.done).length === 0,
    ),
  );
  const colors = useAppSelector(state => state.theme.colors);
  const noteMode = useAppSelector(state => state.notes.mode);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    const backAction = () => {
      setSelectedNotes([]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  useEffect(() => {
    dispatch(setSelectMode(selectedNotes.length > 0));
    navigation.setOptions({
      headerLeft: () => {
        return selectedNotes.length === 0 ? (
          <HeaderLeft />
        ) : (
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setSelectedNotes([]);
              }}>
              <Icon
                name={icons.GLOBAL.BACK}
                size={iconSize.NORMAL}
                color={colors?.text}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colors?.text,
                marginLeft: 5,
                fontFamily: fontFamily.ysabeauText,
              }}>
              {selectedNotes.length} selectionnes
            </Text>
          </View>
        );
      },
      headerRight: () => {
        return selectedNotes.length === 0 ? (
          <HeaderRight />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: width(4),
              width: width(35),
            }}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Archiver',
                  'Voulez-vous vraiment archiver ces notes ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        dispatch(archiveNotes(selectedNotes));
                        setSelectedNotes([]);
                      },
                      style: 'destructive',
                    },
                  ],
                );
              }}>
              <Icon
                name={icons.GLOBAL.ARCHIVE_OUTLINE}
                size={iconSize.NORMAL}
                color={colors?.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={notes
                .filter(n => selectedNotes.includes(n.id))
                .some(n => n.isFavorite)}
              onPress={() => {
                Alert.alert(
                  'Favoris',
                  'Voulez-vous vraiment mettre ces notes en favoris ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        dispatch(starNotes(selectedNotes));
                        setSelectedNotes([]);
                      },
                      style: 'destructive',
                    },
                  ],
                );
              }}>
              <Icon
                name={icons.GLOBAL.STAR_SHARED}
                size={iconSize.NORMAL}
                color={colors?.yellow}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Supprimer',
                  'Voulez-vous vraiment supprimer ces notes ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        dispatch(deleteNotes(selectedNotes));
                        setSelectedNotes([]);
                      },
                      style: 'destructive',
                    },
                  ],
                );
              }}>
              <Icon
                name={icons.GLOBAL.DELETE}
                size={iconSize.NORMAL}
                color={colors?.danger}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, selectedNotes]);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors!.primary}]}>
      <AddNoteModal
        close={() => setModalAddNoteVisible(false)}
        show={modalAddNoteVisible}
      />
      <SearchButton />
      <AddNote
        onPress={() => {
          setModalAddNoteVisible(true);
        }}
      />
      <ScrollView
        style={{position: 'relative'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.notesContainer,
            {justifyContent: noteMode === 'grid' ? 'space-between' : 'center'},
          ]}>
          {notes.map(note => {
            return noteMode === 'grid' ? (
              <GridMode
                selected={selectedNotes.includes(note.id)}
                select={id => {
                  if (!selectedNotes.includes(id)) {
                    setSelectedNotes([...selectedNotes, id]);
                  } else {
                    setSelectedNotes(selectedNotes.filter(sId => sId! !== id));
                  }
                }}
                key={note.id}
                note={note}
              />
            ) : noteMode === 'list' ? (
              <ListMode
                selected={selectedNotes.includes(note.id)}
                select={id => {
                  if (!selectedNotes.includes(id)) {
                    setSelectedNotes([...selectedNotes, id]);
                  } else {
                    setSelectedNotes(selectedNotes.filter(sId => sId! !== id));
                  }
                }}
                key={note.id}
                note={note}
              />
            ) : (
              <DetailMode
                selected={selectedNotes.includes(note.id)}
                select={id => {
                  if (!selectedNotes.includes(id)) {
                    setSelectedNotes([...selectedNotes, id]);
                  } else {
                    setSelectedNotes(selectedNotes.filter(sId => sId! !== id));
                  }
                }}
                key={note.id}
                note={note}
              />
            );
          })}
        </View>
        {finishNotes.length > 0 && <Text>Terminées</Text>}
        <View
          style={[
            styles.notesContainer,
            {justifyContent: noteMode === 'grid' ? 'space-between' : 'center'},
          ]}>
          {finishNotes.map(note => {
            return noteMode === 'grid' ? (
              <GridMode
                selected={selectedNotes.includes(note.id)}
                select={id => {
                  if (!selectedNotes.includes(id)) {
                    setSelectedNotes([...selectedNotes, id]);
                  } else {
                    setSelectedNotes(selectedNotes.filter(sId => sId! !== id));
                  }
                }}
                key={note.id}
                note={note}
              />
            ) : noteMode === 'list' ? (
              <ListMode
                selected={selectedNotes.includes(note.id)}
                select={id => {
                  if (!selectedNotes.includes(id)) {
                    setSelectedNotes([...selectedNotes, id]);
                  } else {
                    setSelectedNotes(selectedNotes.filter(sId => sId! !== id));
                  }
                }}
                key={note.id}
                note={note}
              />
            ) : (
              <DetailMode
                selected={selectedNotes.includes(note.id)}
                select={id => {
                  if (!selectedNotes.includes(id)) {
                    setSelectedNotes([...selectedNotes, id]);
                  } else {
                    setSelectedNotes(selectedNotes.filter(sId => sId! !== id));
                  }
                }}
                key={note.id}
                note={note}
              />
            );
          })}
        </View>
        {notes.length === 0 && finishNotes.length === 0 && <EmptyTasks />}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Notes;
