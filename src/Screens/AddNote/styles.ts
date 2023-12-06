import {StyleSheet} from 'react-native';
import { heigth, width } from "../../shared/space";
import fontFamily from "../../shared/fontFamily";
import fontSize from "../../shared/fontSize";
import color from "../../shared/color";
import Color from "../../shared/color";

const styles = StyleSheet.create({
  containerHeaderRight: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginRight: width(2),
    width: width(40),
  },
  headerRightItem: {
    marginLeft: width(5),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: width(2),
    paddingLeft: width(5),
    paddingRight: width(5),
  },
  inputTitle: {
    fontSize: fontSize.mediumTitle,
    fontFamily: fontFamily.ysabeauBold,
    textDecorationLine: 'none',
    borderBottomWidth: 0,
  },
  date: {
    fontFamily: fontFamily.ysabeauMedium,
  },
  horizontalAlign: {
    height: heigth(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: heigth(3),
    borderBottomWidth: 0.5,
  },
  inputDescription: {
    flex: 1,
    fontSize: fontSize.small,
    fontFamily: fontFamily.ysabeauText,
    borderBottomWidth: 0,
    overflow: 'scroll',
    marginBottom: heigth(5),
  },
  inputDesc: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.ysabeauText,
    // height: heigth(75),
  },
  scrollTask: {
    height: heigth(60),
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    padding: 0,
    paddingLeft: width(1),
    paddingRight: width(1),
    paddingTop: heigth(1),
    paddingBottom: heigth(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heigth(7),
  },
  presentationText: {
    fontFamily: fontFamily.ysabeauBold,
  },
  taskCheck: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInput: {
    flex: 10,
    fontSize: fontSize.text,
    fontFamily: fontFamily.ysabeauText,
  },
  taskInputDone: {
    flex: 10,
    textDecorationLine: 'line-through',
    fontSize: fontSize.text,
    fontFamily: fontFamily.ysabeauText,
  },
  taskDelete: {
    flex: 1,
  },
  addTask: {
    padding: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: heigth(3),
    borderBottomWidth: 0.4,
  },
  addText: {
    fontFamily: fontFamily.ysabeauBold,
  },
});
export default styles;
