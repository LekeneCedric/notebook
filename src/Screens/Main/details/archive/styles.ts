import {StyleSheet} from 'react-native';
import {width} from '../../../../shared/space';

const styles = StyleSheet.create({
  container: {
    padding: width(3),
    flexGrow: 1,
  },
  button: {
    borderRadius: width(2),
    alignItems: 'center',
    padding: width(3),
    justifyContent: 'center',
  },
});

export default styles;
