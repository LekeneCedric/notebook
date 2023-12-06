import {StyleSheet} from 'react-native';
import { heigth, width } from "../../../shared/space";
import fontFamily from "../../../shared/fontFamily";

const styles = StyleSheet.create({
  container: {
    padding: width(3),
    flexGrow: 1,
  },
  title: {
    fontFamily: fontFamily.ysabeauBold
  },
  general: {
    padding: width(3),
    marginTop: heigth(3),
    borderRadius: width(1),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rowItem: {
    position: 'relative',
    marginTop: heigth(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: width(2),
  },
  switch: {
    position: 'absolute',
    right: width(2),
  }
});

export default styles;
