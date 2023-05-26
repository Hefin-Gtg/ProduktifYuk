import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import 'react-native-gesture-handler';



import { useAuth } from './contexts/AuthProvider';
import theme from './config/theme';


import Landing from './screens/landing';
import Login from './screens/login';
import Register from './screens/register';
import ToDoForm from './screens/form';
import Todo from './screens/todo';
import Podomoro from './screens/podomoro';'./screens/register';
import MyProfile from './screens/profile';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


function TodoNav() {
    return (
    <Stack.Navigator
        screenOptions={{
        headerShown: false,
        }}
        initialRouteName="Todo"
    >
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Form" component={ToDoForm} />
    </Stack.Navigator>
    );
}
  
function BottomTabNavigator() {
    return (
    <Tab.Navigator
        initialRouteName="Pomodoro"
        screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        showLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Pomodoro') {
            iconName = 'business-time';
            } else if (route.name === 'To-do List') {
            iconName = 'list';
            } else if (route.name === 'Profile') {
            iconName = 'user';
            }

            return (
            <FontAwesome5
                name={iconName}
                size={size}
                color={color}
            />
            );
        },
        })}
    >
        <Tab.Screen
        name="Pomodoro"
        component={Podomoro}
        options={{
            tabBarLabel: 'Pomodoro',
        }}
        />
        <Tab.Screen
        name="To-do List"
        component={TodoNav}
        options={{
            tabBarLabel: 'To-do',
        }}
        />
        <Tab.Screen
        name="Profile"
        component={MyProfile}
        options={{
            tabBarLabel: 'Profile',
        }}
        />
    </Tab.Navigator>
    );
}

  
export default function Navigation() {
const { user } = useAuth(); 

return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            }}
        >
            
            {!user ? (
            <>
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </>
            ) : (
            <>
                <Stack.Screen name="Home" component={BottomTabNavigator} />
                
            </>      
            )}
            
        </Stack.Navigator>
    </NavigationContainer>
);
}
