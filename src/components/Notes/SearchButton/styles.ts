import {StyleSheet} from 'react-native';
import {width} from '../../../shared/space';
import fontFamily from '../../../shared/fontFamily';
import fontSize from '../../../shared/fontSize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width(1),
    justifyContent: 'flex-start',
    elevation: 6,
  },
  text: {
    flex: 9,
    fontFamily: fontFamily.ysabeauText,
    fontSize: fontSize.text,
    marginLeft: '2%',
  },
  icon: {
    flex: 1,
    marginLeft: '2%',
  },
});

export default styles;
