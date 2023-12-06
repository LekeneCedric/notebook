import { StyleSheet } from 'react-native';
import { heigth, width } from '../../../../shared/space';
import fontFamily from '../../../../shared/fontFamily';
import fontSize from '../../../../shared/fontSize';

const styles = StyleSheet.create({
  container: {
    width: '98%',
    marginTop: width(2),
    marginBottom: width(0.2),
    height: width(35),
    padding: width(2),
    overflow: 'scroll',
    borderRadius: width(1),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    height: heigth(10),
  },
  title: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.smallTitle,
  },
  icon: {
    marginLeft: width(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentText: {
    fontSize: fontSize.small,
  },
});
export default styles;
