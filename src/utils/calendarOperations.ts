import INote from '../models/note.model';
import categoryColors from '../shared/categoryColors';

function createInitDayToCalendarFormatByDate(date: Date) {
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  );
}
function extractMarkedDatesInNotes(notes: INote[]) {
  const notesGroupByDates: any = {};
  for (let i = 0; i < notes.length; i++) {
    let selectedNote = notes[i];
    let dateOfNoteCreation = new Date(selectedNote.created_at!);
    let parseDate =
      dateOfNoteCreation.getFullYear() +
      '-' +
      (dateOfNoteCreation.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      dateOfNoteCreation.getDate().toString().padStart(2, '0');
    if (notesGroupByDates[parseDate] === undefined) {
      notesGroupByDates[parseDate] = [selectedNote];
      continue;
    }
    let notesGroupByDatesUpdate = notesGroupByDates[parseDate];
    notesGroupByDatesUpdate.push(selectedNote);
    notesGroupByDates[parseDate] = notesGroupByDatesUpdate;
  }
  const markedColorsGroupByDates: any = {};
  for (const [date, notesForDate] of Object.entries(notesGroupByDates)) {
    const markedColors: any[] = [];
    const markedColorsObject: {marked: boolean; dots: any[]} = { marked: true, dots: []};
    for (let k = 0; k < notesForDate.length; k++) {
      let selectedNote: INote = notesForDate[k];
      let markedColorForNote = categoryColors[selectedNote.color].principal;
      let markedColorNotIncludeColorForSelectedNote =
        !markedColors.includes(markedColorForNote);
      if (markedColorNotIncludeColorForSelectedNote) {
        markedColors.push(markedColorForNote);
      }
    }
    const markedColorsArray = [];
    for (let l = 0; l < markedColors.length; l++) {
      markedColorsArray.push({key: `${l}`, color: `${markedColors[l]}`});
    }
    markedColorsObject.dots = markedColorsArray;
    markedColorsGroupByDates[date] = markedColorsObject;
  }
  console.log(markedColorsGroupByDates);
  return {notesGroupByDates, markedColorsGroupByDates};
}
export {extractMarkedDatesInNotes, createInitDayToCalendarFormatByDate};
