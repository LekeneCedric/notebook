import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const width: any = (percent: number) => {
  return wp(`${percent}%`);
};

export const heigth: any = (percent: number) => {
  return hp(`${percent}%`);
};
