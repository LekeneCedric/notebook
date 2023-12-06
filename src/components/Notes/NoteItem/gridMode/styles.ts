import { StyleSheet } from 'react-native';
import { heigth, width } from '../../../../shared/space';
import fontFamily from '../../../../shared/fontFamily';
import fontSize from '../../../../shared/fontSize';
import Colors from '../../../../shared/color';

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginTop: heigth(2),
    marginBottom: heigth(0.2),
    height: heigth(30),
    padding: width(2),
    overflow: 'scroll',
    // borderLeftWidth: width(3),
    borderRadius: width(1),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginLeft: width(1),
  },
  title: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.smallTitle,
  },
  time: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.5,
    paddingBottom: heigth(1),
    marginBottom: heigth(1),
  },
  row: {
    position: 'absolute',
    width: '100%',
    right: 10,
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    // height: heigth(14),
  },
  contentText: {
    fontSize: fontSize.small,
  },
});
export default styles;
