import {StyleSheet} from 'react-native';
import {heigth, width} from '../../../shared/space';
import Color from '../../../shared/color';
import fontFamily from "../../../shared/fontFamily";
import fontSize from "../../../shared/fontSize";

const styles = StyleSheet.create({
  modalView: {
    paddingTop: heigth(2),
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: width(100),
    height: heigth(30),
    borderTopLeftRadius: width(5),
    borderTopRightRadius: width(5),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  icon: {
    position: 'absolute',
    right: width(2),
  },
  modalChildView: {
    width: width(100),
    padding: width(2),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: width(2),
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.smallTitle,
    marginBottom: heigth(1),
  },
  rowItem: {
    width: '100%',
    position: 'relative',
    marginTop: heigth(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItem: {
    marginLeft: width(2),
  },
});
export default styles;
