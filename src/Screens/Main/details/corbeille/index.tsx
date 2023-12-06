import React, {useEffect, useState} from 'react';
import { Alert, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import styles from './styles';
import Text from '../../../../components/Text';
import {useAppSelector} from '../../../../../hook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../shared/icon';
import {iconSize} from '../../../../shared/iconSize';
import {useNavigation} from '@react-navigation/native';
import SearchButton from '../../../../components/Notes/SearchButton';
import {heigth} from '../../../../shared/space';
import INote from '../../../../models/note.model';
import ListMode from '../../../../components/Notes/NoteItem/ListMode';
import CheckBox from '@react-native-community/checkbox';
import Color from '../../../../shared/color';
import {
  deleteDefinitlyNotes,
  restaureDeleteNotes,
  setSelectMode,
} from '../../../../redux/reducers/noteSlice';
import {useDispatch} from 'react-redux';
import EmptyTrash from '../../../../components/NotFound/EmptyTrash';
import NotFound from '../../../../components/NotFound';
const Corbeille: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);
  const [search, setSearch] = useState<string>('');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [allIsSelected, setAllIsSelected] = useState(false);
  const notes = useAppSelector(state =>
    state.notes.notesTemp.filter(n => n.isDelete),
  );
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  useEffect(() => {
    if (allIsSelected === true) {
      setSelectedNotes(notes.filter(n => n.isDelete).map(n => n.id));
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
              ? 'Corbeille'
              : `${selectedNotes.length} elements selectionnes`}
          </Text>
          <TouchableOpacity
            disabled={notes.map(n => n.id).length === 0}
            style={{position: 'absolute', right: 0}}
            onPress={() => {
              if (selectedNotes.length === 0) {
                Alert.alert(
                  'Vider la corbeille',
                  'Voulez vous vraiment supprimer tout les elements de la corbeille ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {},
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        dispatch(deleteDefinitlyNotes(notes.map(n => n.id)));
                      },
                    },
                  ],
                );
              }
            }}>
            {selectedNotes.length === 0 ? (
              currentTheme === 'light' ? (
                <Image
                  style={{width: 36, height: 36}}
                  source={require('../../../../assets/images/recovery_light.png')}
                />
              ) : (
                <Image
                  style={{width: 36, height: 36}}
                  source={require('../../../../assets/images/recovery_black.png')}
                />
              )
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
        {notes.length === 0 && <EmptyTrash />}
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
              dispatch(restaureDeleteNotes(selectedNotes));
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
export default Corbeille;
