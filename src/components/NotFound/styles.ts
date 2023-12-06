import {StyleSheet} from 'react-native';
import fontFamily from '../../shared/fontFamily';
import { heigth } from "../../shared/space";
import fontSize from "../../shared/fontSize";

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    marginTop: heigth(15),
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize.text,
    fontFamily: fontFamily.ysabeauText,
  },
});
export default styles;
