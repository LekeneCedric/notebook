import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { width } from '../../../shared/space';
import { iconSize } from "../../../shared/iconSize";

type props = {
  iconName: string;
  color: string;
};
const IconTab: React.FC<props> = ({iconName, color}) => {
  return <Icon name={iconName} size={iconSize.NORMAL} color={color} />;
};

export default IconTab;
