/* eslint-disable */
import { StyleSheet } from 'react-native';
import { heigth, width } from '../../../shared/space';


const styles = StyleSheet.create({
	container: {
		zIndex: 10000000,
		position: 'absolute',
		bottom: heigth('2%'),
		right: width('5%'),
		borderRadius: 100,
		padding: width('4%'),
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		margin: heigth('1%'),
		alignItems: 'center',
		flexDirection: 'row'
	},
});
export default styles;
