import INote from '../../models/note.model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Color} from '../../enums/color.enum';
import ITask from "../../models/task.model";

type INoteState = {
  defaultColor:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'orange'
    | 'purple'
    | 'pink'
    | 'gray'
    | 'brown';
  mode: 'list' | 'grid' | 'detail';
  notes: INote[];
  notesTemp: INote[];
  selectMode: boolean;
  colorFilter:
    | 'all'
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'orange'
    | 'purple'
    | 'pink'
    | 'gray'
    | 'brown';
  filter: 'none' | 'modif' | 'create' | 'color' | 'fav';
  updateCalendar: boolean;
  categoriesColor: any;
};
const initialState: INoteState = {
  mode: 'grid',
  updateCalendar: false,
  notes: [],
  notesTemp: [],
  colorFilter: 'all',
  defaultColor: 'blue',
  filter: 'none',
  selectMode: false,
  categoriesColor: {
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
  },
};
export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    updateTaskStatus(
      state,
      action: PayloadAction<{id: string; done: boolean}>,
    ) {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (note.type === 'list') {
          const tasks: ITask[] = note.tasks!.map(task => {
            if (task.id === action.payload.id) {
              return {...task, done: action.payload.done};
            }
            return task;
          });
          return {...note, tasks: tasks};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (note.type === 'list') {
          const tasks: ITask[] = note.tasks!.map(task => {
            if (task.id === action.payload.id) {
              return {...task, done: action.payload.done};
            }
            return task;
          });
          return {...note, tasks: tasks};
        }
        return note;
      });
      console.log('update');
    },
    updateCalendar(state) {
      state.updateCalendar = !state.updateCalendar;
    },
    setSelectMode(state, action: PayloadAction<boolean>) {
      state.selectMode = action.payload;
    },
    editCategory: (
      state,
      action: PayloadAction<{color: Color; value: string}>,
    ) => {
      state.categoriesColor[action.payload.color].intitule =
        action.payload.value;
    },
    loadCategoriesFromStorage: (state, action: PayloadAction<any>) => {
      state.categoriesColor = action.payload;
    },
    switchMode: (state, action: PayloadAction<'list' | 'grid' | 'detail'>) => {
      state.mode = action.payload;
    },
    setDefaultColor: (
      state,
      action: PayloadAction<
        | 'red'
        | 'blue'
        | 'green'
        | 'yellow'
        | 'orange'
        | 'purple'
        | 'pink'
        | 'gray'
        | 'brown'
      >,
    ) => {
      state.defaultColor = action.payload;
    },
    loadNotesFromStorage: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
      state.notesTemp = action.payload;
    },
    addNote: (state, action: PayloadAction<INote>) => {
      updateCalendar();
      state.notesTemp.push(action.payload);
      if (state.colorFilter === 'all') {
        state.notes.push(action.payload);
      }
      filter_(state.filter);
    },
    updateNote: (state, action: PayloadAction<INote>) => {
      updateCalendar();
      // si la note n'a pas de titre
      // recherche si note existante dans note
      let noteList = state.notesTemp.filter(
        note => note.id === action.payload.id,
      );
      // Si on ne retrouve pas la note
      if (noteList.length === 0 && action.payload.title.length > 0) {
        // Ajouter la note parmis les notes
        state.notesTemp.push(
          action.payload.type === 'list'
            ? {
                ...action.payload,
                tasks: action.payload.tasks?.filter(t => t.title.length > 0),
              }
            : action.payload,
        );
        if (state.colorFilter === 'all') {
          state.notes.push(
            action.payload.type === 'list'
              ? {
                  ...action.payload,
                  tasks: action.payload.tasks?.filter(t => t.title.length > 0),
                }
              : action.payload,
          );
        }
      } else if (
        noteList.length === 0 &&
        action.payload.title.length === 0 &&
        ((action.payload.type === 'note' && action.payload.text?.length! > 0) ||
          (action.payload.type === 'list' && action.payload.tasks?.length! > 0))
      ) {
        state.notesTemp.push(
          action.payload.type === 'list'
            ? {
                ...action.payload,
                tasks: action.payload.tasks?.filter(t => t.title.length > 0),
              }
            : action.payload,
        );
        if (state.colorFilter === 'all') {
          state.notes.push(
            action.payload.type === 'list'
              ? {
                  ...action.payload,
                  tasks: action.payload.tasks?.filter(t => t.title.length > 0),
                }
              : action.payload,
          );
        }
      } else if (
        action.payload.title.length === 0 &&
        ((action.payload.type === 'note' &&
          action.payload.text?.length === 0) ||
          (action.payload.type === 'list' &&
            action.payload.tasks?.length === 0))
      ) {
        state.notesTemp = state.notesTemp.filter(
          note => note.id !== action.payload.id,
        );
        state.notes = state.notes.filter(note => note.id !== action.payload.id);
      } else {
        state.notesTemp = state.notesTemp.map(note => {
          if (note.id === action.payload.id) {
            return {
              ...action.payload,
              tasks: action.payload.tasks?.filter(t => t.title.length > 0),
            };
          }
          return note;
        });
        state.notes = state.notes.map(note => {
          if (note.id === action.payload.id) {
            return {
              ...action.payload,
              tasks: action.payload.tasks?.filter(t => t.title.length > 0),
            };
          }
          return note;
        });
      }
      filter_(state.filter);
    },
    // Envoyer note a la corbeille
    deleteNote: (state, action: PayloadAction<string>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (note.id === action.payload) {
          return {...note, isDelete: true};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (note.id === action.payload) {
          return {...note, isDelete: true};
        }
        return note;
      });
    },
    deleteNotes: (state, action: PayloadAction<string[]>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isDelete: true};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isDelete: true};
        }
        return note;
      });
      state.selectMode = false;
    },
    deleteDefinitlyNotes: (state, action: PayloadAction<string[]>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.filter(
        note => !action.payload.includes(note.id),
      );
      state.notes = state.notes.filter(
        note => !action.payload.includes(note.id),
      );
      state.selectMode = false;
    },
    restaureDeleteNotes: (state, action: PayloadAction<string[]>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isDelete: false};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isDelete: false};
        }
        return note;
      });
      state.selectMode = false;
    },
    archiveNotes: (state, action: PayloadAction<string[]>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isArchived: true};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isArchived: true};
        }
        return note;
      });
      state.selectMode = false;
    },
    retaureArchiveNotes: (state, action: PayloadAction<string[]>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isArchived: false};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isArchived: false};
        }
        return note;
      });
      state.selectMode = false;
    },
    starNotes: (state, action: PayloadAction<string[]>) => {
      updateCalendar();
      state.notesTemp = state.notesTemp.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isFavorite: true};
        }
        return note;
      });
      state.notes = state.notes.map(note => {
        if (action.payload.includes(note.id)) {
          return {...note, isFavorite: true};
        }
        return note;
      });
    },
    filter_: (
      state,
      action: PayloadAction<'none' | 'modif' | 'create' | 'color' | 'fav'>,
    ) => {
      state.filter = action.payload;
      switch (action.payload) {
        case 'modif':
          state.notes = state.notes.sort((a, b) => {
            let a_date = new Date(a.updated_at!);
            let b_date = new Date(b.updated_at!);
            console.warn('created', a_date.getTime());
            console.warn('updated', b_date.getTime());
            if (a.updated_at && b.updated_at) {
              return b_date.getTime() - a_date.getTime();
            }
            return 0;
          });
          break;
        case 'create':
          state.notes = state.notes.sort((a, b) => {
            let a_date = new Date(a.updated_at!);
            let b_date = new Date(b.updated_at!);
            if (a.created_at && b.created_at) {
              return a_date.getTime() - b_date.getTime();
            }
            return 0;
          });
          break;
        case 'fav':
          state.notes = state.notes.sort((a, b) =>
            a.isFavorite === true && b.isFavorite === false ? -1 : 1,
          );
          break;
        case 'color':
          state.notes = state.notes.sort((a, b) =>
            a.color < b.color ? -1 : a.color > b.color ? 1 : 0,
          );
          break;
      }
    },
    filterByColor: (
      state,
      action: PayloadAction<
        | 'all'
        | 'red'
        | 'blue'
        | 'green'
        | 'yellow'
        | 'orange'
        | 'purple'
        | 'pink'
        | 'gray'
        | 'brown'
      >,
    ) => {
      state.colorFilter = action.payload;
      if (action.payload === 'all') {
        state.notes = state.notesTemp;
        return;
      }
      state.notes = state.notesTemp.filter(
        note => note.color === action.payload,
      );
    },
    filter: state => {
      if (state.colorFilter === 'all') {
        state.notes = state.notesTemp;
        return;
      }
      state.notes = state.notesTemp.filter(
        note => note.color === state.colorFilter,
      );
    },
  },
});
export const {
  updateTaskStatus,
  updateCalendar,
  setSelectMode,
  loadCategoriesFromStorage,
  editCategory,
  switchMode,
  loadNotesFromStorage,
  filter_,
  setDefaultColor,
  addNote,
  updateNote,
  deleteNote,
  deleteNotes,
  deleteDefinitlyNotes,
  restaureDeleteNotes,
  archiveNotes,
  retaureArchiveNotes,
  starNotes,
  filterByColor,
  filter,
} = noteSlice.actions;
export default noteSlice.reducer;
