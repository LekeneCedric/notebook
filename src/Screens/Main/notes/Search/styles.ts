import { StyleSheet } from "react-native";
import { heigth, width } from "../../../../shared/space";

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  container: {
    flexGrow: 1,
    padding: width(2),
  },
  headerRow: {
    marginTop: heigth(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    padding: width(2),
    flexWrap: 'wrap',
    lineHeight: heigth(2),
  }
});
export default styles;
