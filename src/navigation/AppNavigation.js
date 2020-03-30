import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator }
  from '@react-navigation/material-bottom-tabs';
import { SCREENS } from 'navigation/constants';
import 'react-native-gesture-handler';
import MainScreen from 'features/screens/MainScreen/MainScreen';
import AboutScreen from 'features/screens/AboutScreen/AboutScreen';
import CreateScreen from 'features/screens/CreateScreen/CreateScreen';
import PostScreen from 'features/screens/PostScreen/PostScreen';
import BookmarkedScreen from
  'features/screens/BookmarkedScreen/BookmarkedScreen';
import { THEME } from 'styles/theme';
import { StyleSheet, Platform } from 'react-native';
import AppHeaderIcon from 'components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'components/Icon';

const AppNavigation = () => {
  const Post = createStackNavigator();
  const Booked = createStackNavigator();
  const About = createStackNavigator();
  const Create = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const navigatorConfig = (screen) => ({
    initialRouteName: { screen },
    screenOptions: {
      gestureEnabled: true,
      geastureDirection: 'horizontal',
      headerStyle: {
        backgroundColor:
          Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
      },
      headerTitleStyle: {
        alignSelf: 'center',
      },
      headerTitleAlign: 'center',
      headerTintColor:
        Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
      headerBackTitleVisible: false,
    },
    headerMode: "float"
  });

  const screenConfig = (screenTitle, isHeaderRightShown) => {
    return ({ navigation }) => ({
      title: screenTitle,
      headerRight: isHeaderRightShown ? () => (
        <HeaderButtons
          HeaderButtonComponent={AppHeaderIcon}
        >
          <Item
            title="Take photo"
            iconName="icon-camera"
            onPress={() => navigation.dispatch(StackActions.replace(SCREENS.CREATE))}
            buttonStyle={{ color: '#fff' }}
          />
        </HeaderButtons>) : null,
      headerLeft: () => (
        <HeaderButtons
          HeaderButtonComponent={AppHeaderIcon}
        >
          <Item
            title="Toggle Drawer"
            iconName="icon-menu"
            onPress={() => navigation.toggleDrawer()}
            buttonStyle={{ color: '#fff' }}
          />
        </HeaderButtons>)
    })
  };

  const postScreenConfig = () => {
    return ({ route }) => ({
      title:
        `Post from ${new Date(route.params.date).toLocaleDateString()}`,
      headerStyle: {
        backgroundColor: THEME.DANGER_COLOR
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={AppHeaderIcon}
        >
          <Item
            title="Rate post"
            iconName={
              route.params.booked
                ? "icon-star"
                : 'icon-empty-star'
            }
            onPress={() => console.log('Pressed star')}
            buttonStyle={{ color: '#fff' }}
          />
        </HeaderButtons>),
    })
  }

  const HomeTabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (({ focused }) => {
          let iconName = {
            'All': 'icon-list',
            'Bookmarked': 'icon-star'
          };
          return (
            <Icon
              name={iconName[route.name]}
              style={focused ? styles.iconActiveTabs : styles.iconTabs}
            />
          )
        })
      })}
      shifting
      tabBarOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        inactiveTintColor: THEME.GREY
      }}
      barStyle={{
        backgroundColor: THEME.MAIN_COLOR
      }}
    >
      <Tab.Screen name="All">{PostNavigator}</Tab.Screen>
      <Tab.Screen name="Bookmarked">{BookedNavigator}</Tab.Screen>
    </Tab.Navigator>
  );

  const AboutNavigator = () => (
    <About.Navigator
      {...navigatorConfig(SCREENS.ABOUT)}
    >
      <About.Screen
        name={SCREENS.ABOUT}
        component={AboutScreen}
        options={screenConfig('About App', false)} />
    </About.Navigator>
  );

  const CreateNavigator = () => (
    <Create.Navigator
      {...navigatorConfig(SCREENS.CREATE)}
    >
      <Create.Screen
        name={SCREENS.CREATE}
        component={CreateScreen}
        options={screenConfig('Create Post', false)}
      />
    </Create.Navigator>
  );

  const PostNavigator = () => (
    <Post.Navigator
      {...navigatorConfig(SCREENS.MAIN)}
    >
      <Post.Screen
        name={SCREENS.MAIN}
        component={MainScreen}
        options={screenConfig('Post App', true)}
      />
      <Post.Screen
        name={SCREENS.POST}
        component={PostScreen}
        options={postScreenConfig()}
      />
    </Post.Navigator>
  );

  const BookedNavigator = () => (
    <Booked.Navigator
      {...navigatorConfig(SCREENS.BOOKED)}
    >
      <Booked.Screen
        name={SCREENS.BOOKED}
        component={BookmarkedScreen}
        options={screenConfig('Bookmarked posts', false)}
      />
      <Booked.Screen
        name={SCREENS.POST}
        component={PostScreen}
        options={postScreenConfig()}
      />
    </Booked.Navigator>
  );
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeTabNavigator} />
        <Drawer.Screen name="About" component={AboutNavigator} />
        <Drawer.Screen name="Create" component={CreateNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  iconActiveTabs: {
    fontSize: 24,
    color: Platform.OS === 'android' ? "#fff" : THEME.MAIN_COLOR
  },
  iconTabs: {
    fontSize: 24,
    color: THEME.GREY
  }
})