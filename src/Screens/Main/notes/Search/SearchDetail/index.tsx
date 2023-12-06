import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../../../../hook';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../../shared/icon';
import {iconSize} from '../../../../../shared/iconSize';
import SearchButton from '../../../../../components/Notes/SearchButton';
import INote from '../../../../../models/note.model';
import NotFound from '../../../../../components/NotFound';
import DetailMode from '../../../../../components/Notes/NoteItem/detailMode';

const SearchDetail: React.FC<{}> = ({}) => {
  //@ts-ignore
  const {type, color} = useRoute().params;
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);
  const notesTemp = useAppSelector(state =>
    state.notes.notesTemp.filter(
      n =>
        !n.isArchived &&
        !n.isDelete &&
        (type !== undefined ? n.type === type : n.color === color),
    ),
  );
  const [notes, setNotes] = useState(
    useAppSelector(state => state.notes.notesTemp),
  );
  useEffect(() => {
    const filterNote = () => {
      let filters = notesTemp.filter(
        note =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          (note.type === 'note' &&
            note.text?.toLowerCase().includes(search.toLowerCase())) ||
          (note.type === 'list' &&
            note.tasks!.filter(t =>
              t.title.toLowerCase().includes(search.toLowerCase()),
            ).length > 0) ||
          // eslint-disable-next-line eqeqeq
          search.length == 0,
      );
      setNotes(filters);
    };
    filterNote();
  }, [search]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors!.primary}]}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon}>
          <Icon
            name={icons.GLOBAL.BACK}
            size={iconSize.NORMAL}
            color={colors!.text}
          />
        </TouchableOpacity>
        <SearchButton
          onChange={text => {
            setSearch(text);
          }}
          activeSearch={true}
        />
      </View>
      <ScrollView>
        <View style={styles.notesContainer}>
          {notes.map(note => {
            if (!note.isDelete && !note.isArchived)
              return <DetailMode key={note.id} note={note} />;
            return <></>;
          })}
        </View>
        {notes.length === 0 && <NotFound />}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SearchDetail;
