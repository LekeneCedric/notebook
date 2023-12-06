import { StyleSheet } from "react-native";
import { heigth, width } from "../../../shared/space";
import Color from "../../../shared/color";
import fontFamily from "../../../shared/fontFamily";
import fontSize from "../../../shared/fontSize";

const styles = StyleSheet.create({
  modalView: {
    paddingTop: heigth(4),
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: width(100),
    height: heigth(50),
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: width(2),
    fontFamily: fontFamily.ysabeauMedium,
    fontSize: fontSize.smallTitle,
  },
  sectionContainer: {
    flexDirection: 'row',
    width: width(90),
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: width(3.5),
    borderRadius: width(1),
    marginBottom: heigth(1),
  },
  sectionColor: {
    width: width(5),
    height: width(5),
    borderRadius: width(3),
  },
  sectionTitle: {
    marginLeft: width(2),
    fontFamily: fontFamily.ysabeauText,
  },
});
export default styles;
