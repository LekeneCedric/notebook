import {StyleSheet} from 'react-native';
import {heigth, width} from '../../../shared/space';
import fontSize from '../../../shared/fontSize';
import fontFamily from '../../../shared/fontFamily';
import Color from "../../../shared/color";

const styles = StyleSheet.create({
  itemTitle: {
    alignSelf: 'flex-start',
    fontSize: fontSize.smallTitle,
    fontFamily: fontFamily.ysabeauBold,
    marginBottom: heigth(2),
  },
  modalView: {
    paddingTop: heigth(4),
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
  modalChildView: {
    width: width(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.smallTitle,
    marginBottom: heigth(2),
  }
});
export default styles;
