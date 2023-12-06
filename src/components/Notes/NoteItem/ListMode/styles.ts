import { StyleSheet } from 'react-native';
import { heigth, width } from "../../../../shared/space";
import fontFamily from "../../../../shared/fontFamily";
import fontSize from "../../../../shared/fontSize";
import Colors from "../../../../shared/color";

const styles = StyleSheet.create({
  container: {
    width: '98%',
    marginTop: heigth(2),
    marginBottom: heigth(0.2),
    height: heigth(9),
    paddingLeft: width(2),
    paddingRight: width(2),
    overflow: 'scroll',
    borderLeftWidth: width(3),
    borderRadius: width(1),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
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
});
export default styles;
