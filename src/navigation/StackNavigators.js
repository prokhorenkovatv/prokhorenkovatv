import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from 'navigation/constants';
import MainScreen from 'features/screens/MainScreen/MainScreen';
import AboutScreen from 'features/screens/AboutScreen/AboutScreen';
import CreateScreen from 'features/screens/CreateScreen/CreateScreen';
import PostScreen from 'features/screens/PostScreen/PostScreen';
import BookmarkedScreen from
  'features/screens/BookmarkedScreen/BookmarkedScreen';
import { THEME } from 'styles/theme';
import { Platform } from 'react-native';
import AppHeaderIcon from 'components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const Post = createStackNavigator();
const Booked = createStackNavigator();
const About = createStackNavigator();
const Create = createStackNavigator();

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
          onPress={() => navigation.navigate(SCREENS.CREATE)}
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
          onPress={route.params.toggleHandler}
          buttonStyle={{ color: '#fff' }}
        />
      </HeaderButtons>),
  })
};

export const AboutNavigator = () => (
  <About.Navigator
    {...navigatorConfig(SCREENS.ABOUT)}
  >
    <About.Screen
      name={SCREENS.ABOUT}
      component={AboutScreen}
      options={screenConfig('About App', false)} />
  </About.Navigator>
);

export const CreateNavigator = () => (
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

export const PostNavigator = () => (
  <Post.Navigator
    {...navigatorConfig(SCREENS.MAIN)}
  >
    <Post.Screen
      name={SCREENS.MAIN}
      component={MainScreen}
      options={screenConfig('Post App', true)}
    />
    <Post.Screen
      name={SCREENS.CREATE}
      component={CreateScreen}
      options={screenConfig('Create Post', false)}
    />
    <Post.Screen
      name={SCREENS.POST}
      component={PostScreen}
      options={postScreenConfig()}
    />
  </Post.Navigator>
);

export const BookedNavigator = () => (
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

