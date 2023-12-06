/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IThemeState {
	currentTheme: 'light'|'black';
	colors ?: {
		primary: string;
		secondary: string;
		text: string;
		light: string;
		gray: string;
		yellow: string;
		black: string;
		success: string;
		danger: string;
		inputBackground: string;
	}
}
const initialState: IThemeState = {
	currentTheme: "black",
	colors: {
		primary: '#18181a',
		secondary: '#2a2a2a',
		text: '#FFFFFF',
		light: '#FAFAFA',
		gray: '#8d8d8d',
		yellow: '#FFC300',
		black: '#2A2727',
		success: '#2ECC71',
		danger: '#f35f5f',
		inputBackground: '#233C57',
	},
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		switchTheme: (state, action: PayloadAction<'light'|'black'>) => {
			state.currentTheme = action.payload;
			state.colors = {
				primary: action.payload === 'light' ? '#FFFFFF' : '#18181a',
				secondary: action.payload === 'light' ? '#f5f4f4' : '#2a2a2a',
				text: action.payload === 'light' ? '#232325' : '#FFFFFF',
				light: '#FAFAFA',
				gray: '#BEB3B3',
				yellow: '#FFC300',
				black: '#2A2727',
				success: '#2ECC71',
				danger: '#EC2424',
				inputBackground: '#233C57',
			};
		},
		switchColor: (state, action: PayloadAction<any>) => {
			state.colors = action.payload;
		}
	},
});
export const {switchTheme, switchColor} = themeSlice.actions;
export default themeSlice.reducer;
