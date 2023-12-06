/* eslint-disable */
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchButton from '../../../components/Notes/SearchButton';
import styles from './styles';
import AddNote from '../../../components/Buttons/AddNote';
import { useAppSelector } from "../../../../hook";
import { Calendar, DateData } from "react-native-calendars";
import {LocaleConfig} from 'react-native-calendars';
import Color from "../../../shared/color";
import { widthPercentageToDP } from "react-native-responsive-screen";
import categoryColors from "../../../shared/categoryColors";
import INote from "../../../models/note.model";
import { createInitDayToCalendarFormatByDate, extractMarkedDatesInNotes } from "../../../utils/calendarOperations";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../../../shared/icon";
import { iconSize } from "../../../shared/iconSize";
import ITask from "../../../models/task.model";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../../redux/reducers/noteSlice";
import EmptyTasks from "../../../components/NotFound/EmptyTasks";

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';
const CalendarPage = () => {
  const dispatch = useDispatch();
  const colors = useAppSelector(state => state.theme.colors);
  const initDay = createInitDayToCalendarFormatByDate(new Date());
  const [selectedDate, setSelectedDate] = useState(initDay);
  const notes = useAppSelector(state => state.notes.notes.filter(n => n.type === 'list' && !n.isDelete && !n.isArchived));
  const [refreshPage,setRefreshPage] = useState<boolean>(true)
  const updateCalendar = useAppSelector(state => state.notes.updateCalendar);
  const [markedDates, setMarkedDates] = useState({});
  const [notesGroupByDates, setNotesGroupByDates] = useState<any>({});
  const [selectedTasksFromDate, setSelectedTasksFromDate] = useState<{
    id: string;
    color:
      | 'red'
      | 'blue'
      | 'green'
      | 'yellow'
      | 'orange'
      | 'purple'
      | 'pink'
      | 'gray'
      | 'brown';
    title: string;
    done: boolean;
  }[]>([]);
  const LoadTasksFromNotes = () => {
    const allTasks: {
      id: string;
      color:
        | 'red'
        | 'blue'
        | 'green'
        | 'yellow'
        | 'orange'
        | 'purple'
        | 'pink'
        | 'gray'
        | 'brown';
      title: string;
      done: boolean;
    }[] = [];
    if (!notesGroupByDates[selectedDate]) return setSelectedTasksFromDate([]);
    notesGroupByDates[selectedDate].map((note: INote) => {
      note.tasks?.map((task, index) => {
        allTasks.push({ ...task, color: note.color });
      })
    });
    setSelectedTasksFromDate(allTasks);
  }
  const GroupNotesByDatesAndByMarked = () => {
    const {notesGroupByDates, markedColorsGroupByDates} = extractMarkedDatesInNotes(notes);
    setNotesGroupByDates(notesGroupByDates);
    setMarkedDates(markedColorsGroupByDates);
  }
  const updateTaskDoneStatus = (task: ITask) => {
    dispatch(updateTaskStatus({id: task.id, done: !task.done}));
    setRefreshPage(true);
  }
  useEffect(() => {
    GroupNotesByDatesAndByMarked();
    LoadTasksFromNotes();
    setRefreshPage(false);
  },[refreshPage,selectedDate])
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors!.primary}]}>
      <Calendar
        initialDate={initDay}
        markingType={'multi-dot'}
        markedDates={{ ...markedDates,[selectedDate]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: Color.primary,
                borderRadius: 20,
              },
              text: {
                color: 'white',
              }
            }
          }}}
        extraData = {updateCalendar}
        theme={{
          backgroundColor: colors?.primary,
          calendarBackground: colors?.primary,
          textSectionTitleColor: colors?.text,
          selectedDayBackgroundColor: Color.primary,
          selectedDayTextColor: colors?.light,
          todayTextColor: colors?.text,
          dayTextColor: colors?.text,
          textDisabledColor: 'gray',
          monthTextColor: colors?.text,
          indicatorColor: colors?.text,
          arrowColor: colors?.text,
          textDayFontWeight: 'normal',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'normal',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
        onDayPress={(day)=>setSelectedDate(day.dateString)} />
      <View style={styles.tasksContainer}>

        <ScrollView>
          {selectedTasksFromDate.length === 0 && (<EmptyTasks emptyCalendar />)}
          {
              selectedTasksFromDate.map((task, index) => {
                return (
                  <TouchableOpacity onPress={() => {updateTaskDoneStatus(task)}} key={index} style={styles.taskContainer}>
                    <View style={styles.taskCheck}>
                      <View>
                        <Icon
                          color={categoryColors[task.color].principal}
                          name={
                            task.done
                              ? icons.NOTE.CHECKLIST.CHECK
                              : icons.NOTE.CHECKLIST.UNCHECK
                          }
                          size={iconSize.NORMAL}
                        />
                      </View>
                    </View>
                    <TextInput
                      editable={false}
                      value={task.title}
                      multiline={true}
                      underlineColorAndroid={'transparent'}
                      placeholder={`tache ${index + 1}`}
                      placeholderTextColor={colors?.gray}
                      style={[styles.taskInput, {color: colors?.text, textDecorationLine: task.done ? 'line-through' : 'none'}]}
                    />
                  </TouchableOpacity>
                );
              })
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CalendarPage;
