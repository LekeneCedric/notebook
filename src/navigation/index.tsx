import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Main from '../Screens/Main';
import AddNote from '../Screens/AddNote';
import Search from '../Screens/Main/notes/Search';
import SearchDetail from '../Screens/Main/notes/Search/SearchDetail';
import Corbeille from '../Screens/Main/details/corbeille';
import Archive from '../Screens/Main/details/archive';

const Stack = createNativeStackNavigator();
const Routes: React.FC<{}> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'flip',
        }}>
        <Stack.Screen
          name="main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'addNote'} component={AddNote} />
        <Stack.Screen
          options={{headerShown: false}}
          name={'search'}
          component={Search}
        />
        <Stack.Screen
          name={'searchDetail'}
          component={SearchDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'corbeille'}
          component={Corbeille}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'archive'}
          component={Archive}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
