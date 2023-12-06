import fontSize from '../../../../shared/fontSize';
import fontFamily from '../../../../shared/fontFamily';
import {heigth, width} from '../../../../shared/space';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  itemContainer: {
    alignItems: 'center',
    padding: width(2),
    borderRadius: width(2),
    width: width(40),
  },
  itemIcon: {},
  itemText: {
    fontFamily: fontFamily.ysabeauText,
  },
});
export default styles;
