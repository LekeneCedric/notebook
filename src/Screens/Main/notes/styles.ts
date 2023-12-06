import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { width } from "../../../shared/space";

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: width(3),
    paddingLeft: width(3),
    paddingRight: width(3),
  },
  listNotes: {
    padding: width(3),
  },
  notesContainer: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

export default styles;
