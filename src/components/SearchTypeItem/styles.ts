import {StyleSheet} from 'react-native';
import fontFamily from '../../shared/fontFamily';
import fontSize from '../../shared/fontSize';
import { heigth, width } from "../../shared/space";

const styles = StyleSheet.create({
  container: {
    height: heigth(14),
    width: width(30),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(1),
    padding: width(5),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: width(5),
  },
  title: {
    fontFamily: fontFamily.ysabeauText,
    fontSize: fontSize.text,
  },
});
export default styles;
