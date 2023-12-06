/* eslint-disable */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import Details from './details';
import Notes from './notes';
import icons from '../../shared/icon';
import IconTab from '../../components/Tabs/icon';
import fontFamily from '../../shared/fontFamily';
import { useAppSelector } from '../../../hook';
import Color from "../../shared/color";
import CalendarPage from "./calendar";
const Tab = createBottomTabNavigator();
const Main: React.FC<{}> = ({}) => {
  const colors = useAppSelector(state=>state.theme.colors);
  const currentTheme = useAppSelector(state=>state.theme.currentTheme);
  useEffect(()=>{
  },[])
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: colors!.primary,borderColor:colors!.primary,borderTopWidth:0.0},
        tabBarIcon: ({focused}) => {
          let iconName: string = '';
          let color: string = '';
          if (route.name === 'note') {
            color = focused ? currentTheme==='light'?Color.primary:colors!.light : currentTheme==='light'?colors!.text:Color.gray;
            iconName = focused
              ? icons.TABS.NOTES.SHARP
              : icons.TABS.NOTES.OUTLINE;
          }
          else if (route.name === 'calendar') {
            color = focused ? currentTheme==='light'?Color.primary:colors!.light : currentTheme==='light'?colors!.text:Color.gray;
            iconName = focused
              ? icons.TABS.CALENDAR.SHARP
              : icons.TABS.CALENDAR.OUTLINE;
          }
          else if (route.name === 'details') {
            color = focused ? currentTheme==='light'?Color.primary:colors!.light : currentTheme==='light'?colors!.text:Color.gray;
            iconName = focused
              ? icons.TABS.DETAILS.SHARP
              : icons.TABS.DETAILS.OUTLINE;
          }
          return <IconTab iconName={iconName} color={color} />;
        },
        tabBarLabel: ()=>(<></>),
        tabBarLabelStyle: {fontFamily: fontFamily.ysabeauMedium},
      })}>
      <Tab.Screen
        name="note"
        component={Notes}
        options={{
          headerStyle:{backgroundColor: colors!.primary,borderWidth:0,borderColor: colors!.primary},
          headerShown: true,
          headerTitle:"",
          // headerLeft: HeaderLeft,
          // headerRight: HeaderRight
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalendarPage}
        options={{
          headerShown: false,
          // headerTitle: "",
          // headerLeft: HeaderLeft,
          // headerRight: HeaderRight
        }}
      />
      <Tab.Screen
        name="details"
        component={Details}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
export default Main;
