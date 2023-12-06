import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import SearchButton from '../../../../components/Notes/SearchButton';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../shared/icon';
import {iconSize} from '../../../../shared/iconSize';
import {useAppSelector} from '../../../../../hook';
import Text from '../../../../components/Text';
import SearchTypeItem from '../../../../components/SearchTypeItem';
import Color from '../../../../shared/color';
import categoryColors from '../../../../shared/categoryColors';
import SearchColorItem from '../../../../components/SearchColorItem';
import INote from '../../../../models/note.model';
import DetailMode from '../../../../components/Notes/NoteItem/detailMode';
import NotFound from '../../../../components/NotFound';

const Search: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);
  const notesTemp = useAppSelector(state =>
    state.notes.notesTemp.filter(n => !n.isArchived && !n.isDelete),
  );
  const [notes, setNotes] = useState<INote[]>([]);
  const types = [
    {
      icon: icons.NOTE.TEXT,
      type: 'note',
      title: 'TXT',
    },
    {
      icon: icons.NOTE.LIST,
      type: 'list',
      title: 'LISTS',
    },
  ];
  const [search, setSearch] = useState('');
  useEffect(() => {
    const filterNote = notesTemp.filter(
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
    setNotes(filterNote);
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
      {search.length > 0 ? (
        notes.length > 0 ? (
          notes.map(note => {
            return <DetailMode key={note.id} note={note} />;
          })
        ) : (
          <NotFound />
        )
      ) : (
        <View>
          <Text style={[{color: colors!.text}]}>Type</Text>
          <View style={styles.row}>
            {types.map(type => {
              return (
                <SearchTypeItem
                  //@ts-ignore
                  type={type.type}
                  key={type.title}
                  icon={type.icon}
                  title={type.title}
                  iconColor={Color.primary}
                  textColor={colors!.text}
                />
              );
            })}
          </View>
          <Text style={[{color: colors!.text}]}>Couleur</Text>
          <View style={styles.row}>
            {Object.values(categoryColors).map(color => {
              return (
                <SearchColorItem title={color.title} color={color.principal} />
              );
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
