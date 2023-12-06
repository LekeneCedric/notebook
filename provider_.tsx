import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import INote from './src/models/note.model';
import {
  loadCategoriesFromStorage,
  loadNotesFromStorage,
} from './src/redux/reducers/noteSlice';
import {useAppSelector} from './hook';
import {switchTheme} from './src/redux/reducers/themeSlice';
import {Color} from './src/enums/color.enum';
function Provider_() {
  const dispatch = useDispatch();
  const notes = useAppSelector(state => state.notes.notesTemp);
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const categoriesColors = useAppSelector(state => state.notes.categoriesColor);
  useEffect(() => {
    // Initialisation ou chargement des themes
    const loadTheme = async () => {
      const curTheme: string | null = await AsyncStorage.getItem(
        '@currentTheme',
      );
      //@ts-ignore
      dispatch(switchTheme(curTheme !== null ? curTheme : 'black'));
    };
    loadTheme().then(() => {});
    // Chargement des notes
    const loadNotes = async () => {
      try {
        const notesNotParse = await AsyncStorage.getItem('@notes');
        const notesParse: INote[] =
          notesNotParse === null ? [] : JSON.parse(notesNotParse!);
        dispatch(loadNotesFromStorage(notesParse));
      } catch (e) {
        console.warn(e);
      }
    };
    loadNotes().then(() => {});
    // Chargement des categories de notes
    const loadCategories = async () => {
      try {
        const categoriesColorsNotParse = await AsyncStorage.getItem(
          '@categories',
        );
        const categoriesColors =
          categoriesColorsNotParse === null
            ? {
                [Color.Red]: {
                  title: 'red',
                  principal: '#f35f5f',
                  background: '#f8e3e3',
                  intitule: '',
                },
                [Color.Blue]: {
                  title: 'blue',
                  principal: '#4387f1',
                  background: '#e7edf5',
                  intitule: '',
                },
                [Color.Green]: {
                  title: 'green',
                  principal: '#3fc380',
                  background: '#ebf6e9',
                  intitule: '',
                },
                [Color.Yellow]: {
                  title: 'yellow',
                  principal: '#f3d250',
                  background: '#f8f6e9',
                  intitule: '',
                },
                [Color.Purple]: {
                  title: 'purple',
                  principal: '#a35ff3',
                  background: '#ede9f6',
                  intitule: '',
                },
                [Color.Orange]: {
                  title: 'orange',
                  principal: '#f3a35f',
                  background: '#f5eae7',
                  intitule: '',
                },
                [Color.Pink]: {
                  title: 'pink',
                  principal: '#f35f9e',
                  background: '#f8d9e5',
                  intitule: '',
                },
                [Color.Brown]: {
                  title: 'brown',
                  principal: '#a35f3f',
                  background: '#e3dbd6',
                  intitule: '',
                },
                [Color.Gray]: {
                  title: 'gray',
                  principal: '#a3a3a3',
                  background: '#e5e5e5',
                  intitule: '',
                },
              }
            : JSON.parse(categoriesColorsNotParse!);
        dispatch(loadCategoriesFromStorage(categoriesColors));
      } catch (e) {
        console.warn(e);
      }
    };
    loadCategories().then(() => {});
  }, [dispatch]);
  //
  useEffect(() => {
    const setTheme = async () => {
      await AsyncStorage.setItem('@currentTheme', currentTheme);
    };
    setTheme().then(() => {});
  }, [currentTheme]);
  //
  useEffect(() => {
    const setNotes = async () => {
      await AsyncStorage.setItem('@notes', JSON.stringify(notes));
    };
    setNotes().then(() => {
      console.log('sauvegarde');
      console.log('notes', notes);
    });
  }, [notes]);

  useEffect(() => {
    const setCategories = async () => {
      await AsyncStorage.setItem(
        '@categories',
        JSON.stringify(categoriesColors),
      );
    };
    setCategories().then(() => {
      console.log('set cat');
    });
  }, [categoriesColors]);
  return null;
}

export default Provider_;
