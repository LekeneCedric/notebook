import React, {useEffect, useState} from 'react';
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../shared/icon';
import {iconSize} from '../../../../shared/iconSize';
import Text from '../../../../components/Text';
import {
  deleteDefinitlyNotes,
  retaureArchiveNotes,
  setSelectMode,
} from '../../../../redux/reducers/noteSlice';
import CheckBox from '@react-native-community/checkbox';
import {heigth} from '../../../../shared/space';
import SearchButton from '../../../../components/Notes/SearchButton';
import ListMode from '../../../../components/Notes/NoteItem/ListMode';
import Color from '../../../../shared/color';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../../../hook';
import INote from '../../../../models/note.model';
import NotFound from '../../../../components/NotFound';
import EmptyArchive from '../../../../components/NotFound/EmptyArchive';

const Archive: React.FC<{}> = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);
  const [search, setSearch] = useState<string>('');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [allIsSelected, setAllIsSelected] = useState(false);
  const notes = useAppSelector(state =>
    state.notes.notesTemp.filter(n => n.isArchived && !n.isDelete),
  );
  useEffect(() => {
    if (allIsSelected) {
      setSelectedNotes(notes.filter(n => n.isArchived).map(n => n.id));
    } else {
      setSelectedNotes([]);
    }
  }, [allIsSelected]);
  useEffect(() => {
    dispatch(setSelectMode(selectedNotes.length > 0));
  }, [selectedNotes]);
  useEffect(() => {
    setSelectedNotes([]);
  }, [search]);
  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors!.primary,
            height: selectedNotes.length === 0 ? '100%' : '90%',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name={icons.GLOBAL.BACK}
              size={iconSize.NORMAL}
              color={colors?.text}
            />
          </TouchableOpacity>
          <Text style={{color: colors!.text, marginLeft: 15}}>
            {selectedNotes.length === 0
              ? 'Archive'
              : `${selectedNotes.length} elements selectionnes`}
          </Text>
          <TouchableOpacity
            disabled={notes.map(n => n.id).length === 0}
            style={{position: 'absolute', right: 0}}
            onPress={() => {
              if (selectedNotes.length === 0) {
                Alert.alert(
                  'Restaurer toutes les notes',
                  'Voulez vous vraiment restaurer toutes les notes ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {},
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        dispatch(retaureArchiveNotes(notes.map(n => n.id)));
                      },
                    },
                  ],
                );
              }
            }}>
            {selectedNotes.length === 0 ? (
              <Icon
                name={icons.GLOBAL.ARCHIVE_REFRESH}
                size={iconSize.NORMAL}
                color={colors?.text}
              />
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: colors!.text}}>Tout</Text>
                <CheckBox
                  tintColors={{true: Color.primary, false: colors!.text}}
                  value={allIsSelected}
                  onValueChange={value => {
                    setAllIsSelected(value);
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginTop: heigth(2), alignItems: 'center'}}>
          <SearchButton
            width={'100%'}
            activeSearch={true}
            onChange={text => {
              setSearch(text);
            }}
          />
        </View>
        {notes.length === 0 && <EmptyArchive />}
        {notes.filter(
          note =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            (note.type === 'note' &&
              note.text?.toLowerCase().includes(search.toLowerCase())) ||
            (note.type === 'list' &&
              note.tasks!.filter(t =>
                t.title.toLowerCase().includes(search.toLowerCase()),
              ).length > 0),
        ).length === 0 &&
          search.length > 0 && <NotFound />}
        <ScrollView>
          {notes.map(note => {
            if (
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              (note.type === 'note' &&
                note.text?.toLowerCase().includes(search.toLowerCase())) ||
              (note.type === 'list' &&
                note.tasks!.filter(t =>
                  t.title.toLowerCase().includes(search.toLowerCase()),
                ).length > 0)
            ) {
              return (
                <ListMode
                  selected={selectedNotes.includes(note.id)}
                  select={id => {
                    if (!selectedNotes.includes(id)) {
                      setSelectedNotes([...selectedNotes, id]);
                    } else {
                      setSelectedNotes(
                        selectedNotes.filter(sId => sId! !== id),
                      );
                    }
                  }}
                  key={note.id}
                  note={note}
                />
              );
            }
          })}
        </ScrollView>
      </View>
      {selectedNotes.length > 0 && (
        <View
          style={{
            backgroundColor: colors!.primary,
            height: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(retaureArchiveNotes(selectedNotes));
              setSelectedNotes([]);
            }}
            style={[styles.button, {backgroundColor: Color.primary}]}>
            <Text style={{color: colors?.light}}>Restaurer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(deleteDefinitlyNotes(selectedNotes));
              setSelectedNotes([]);
            }}
            style={[styles.button, {backgroundColor: Color.danger}]}>
            <Text style={{color: colors?.light}}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Archive;
