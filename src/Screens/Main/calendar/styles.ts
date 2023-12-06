/* eslint-disable */
import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { width } from "../../../shared/space";
import fontSize from "../../../shared/fontSize";
import fontFamily from "../../../shared/fontFamily";
const styles = StyleSheet.create({
	container: {
		height: '100%',
	  },
	tasksContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: width(2),
		paddingLeft: width(5),
		paddingRight: width(5),
	},
	taskDelete: {
		flex: 1,
	},
	taskContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
});

export default styles;
