/* eslint-disable */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from "react";
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../shared/icon';
import { iconSize } from '../../../shared/iconSize';
import Colors from '../../../shared/color';
import { useAppSelector } from "../../../../hook";
import ColorChoiceModal from "../../Modals/ColorChoiceModal";
import { filterByColor } from "../../../redux/reducers/noteSlice";
import { useDispatch } from "react-redux";
import FilterNoteModal from "../../Modals/filterNoteModal";
import CategoryColors from "../../../shared/categoryColors";
import NoteModeModal from "../../Modals/NoteModeModal";

const HeaderRight = () => {
	const dispatch = useDispatch();
	const colors = useAppSelector(state => state.theme.colors);
	const [showColorModal,setShowColorModal] = useState(false);
	const [modalFilterVisible,setModalFilterVisible] = useState(false);
	const [modalModeVisible, setModalModeVisible] = useState(false);
	const selectedMode = useAppSelector(state => state.notes.mode);
	const defaultNoteColor = useAppSelector(state=> state.notes.defaultColor);
	useEffect(()=>{},[defaultNoteColor]);
  return (
	<View style={styles.container}>
	  <TouchableOpacity onPress={()=>{setShowColorModal(true)}}>
			<Icon color={CategoryColors[defaultNoteColor].principal} name={icons.GLOBAL.INDICATOR} size={iconSize.NORMAL} />
	  </TouchableOpacity>
	  <TouchableOpacity onPress={()=>{setModalFilterVisible(true)}}>
		<Icon color={colors!.text} name={icons.HEADER.FILTER} size={iconSize.NORMAL} />
	  </TouchableOpacity>
		<TouchableOpacity onPress={() =>{setModalModeVisible(true)}} >
			<Icon color={colors!.text} name={
				selectedMode === 'list' ? icons.GLOBAL.PRESENTATION.LIST
				: selectedMode === 'grid' ? icons.GLOBAL.PRESENTATION.GRID
				: icons.GLOBAL.PRESENTATION.DETAIL
			} size={iconSize.NORMAL} />
		</TouchableOpacity>
		<ColorChoiceModal filter={true} changeColor={(color)=>{dispatch(filterByColor(color));setShowColorModal(false)}} show={showColorModal} close={()=>{setShowColorModal(false)}}/>
		<FilterNoteModal show={modalFilterVisible} close={()=>{setModalFilterVisible(false)}} />
		<NoteModeModal show={modalModeVisible} close={()=>{setModalModeVisible(false)}} />
	</View>
  )
}

export default HeaderRight;
