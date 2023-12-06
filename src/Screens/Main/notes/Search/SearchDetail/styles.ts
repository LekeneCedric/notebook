import {StyleSheet} from 'react-native';
import { heigth, width } from "../../../../../shared/space";

const styles = StyleSheet.create({
  icon: {
    marginRight: width(2),
  },
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: width(2),
  },
  headerRow: {
    marginTop: heigth(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  notesContainer: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
});
export default styles;
