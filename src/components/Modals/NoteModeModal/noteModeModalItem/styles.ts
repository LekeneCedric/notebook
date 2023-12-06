import {StyleSheet} from 'react-native';
import { heigth, width } from "../../../../shared/space";
import fontSize from '../../../../shared/fontSize';
import Color from "../../../../shared/color";

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    container: width(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heigth(2),
  },
  title: {
    marginLeft: width(2),
    fontSize: fontSize.smallTitle,
  },
  icon: {
    color: Color.primary,
  },
});
export default styles;
