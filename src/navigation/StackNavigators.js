import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from 'navigation/constants';
import MainScreen from 'features/screens/MainScreen/MainScreen';
import AboutScreen from 'features/screens/AboutScreen/AboutScreen';
import CreateScreen from 'features/screens/CreateScreen/CreateScreen';
import PostScreen from 'features/screens/PostScreen/PostScreen';
import BookmarkedScreen from
  'features/screens/BookmarkedScreen/BookmarkedScreen';
// import { THEME } from 'styles/theme';
import { Platform } from 'react-native';
import AppHeaderIcon from 'components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Post = createStackNavigator();
const Booked = createStackNavigator();
const About = createStackNavigator();
const Create = createStackNavigator();

const navigatorConfig = (screen) => {
  const theme = useTheme();
  return {
    initialRouteName: { screen },
    screenOptions: {
      gestureEnabled: true,
      geastureDirection: 'horizontal',
      headerStyle: {
        backgroundColor:
          Platform.OS === 'android' ? theme.colors.primary : theme.colors.card
      },
      headerTitleStyle: {
        alignSelf: 'center',
      },
      headerTitleAlign: 'center',
      headerTintColor:
        Platform.OS === 'android' ? theme.colors.card : theme.colors.primary,
      headerBackTitleVisible: false,
    },
    headerMode: "float"
  }
};

const screenConfig = (screenTitle, isHeaderRightShown) => {
  const theme = useTheme();
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
          buttonStyle={{ color: theme.colors.card }}
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
          buttonStyle={{ color: theme.colors.card }}
        />
      </HeaderButtons>)
  })
};

const postScreenConfig = () => {
  const theme = useTheme();
  return ({ route }) => ({
    title:
      `Post from ${new Date(route.params.date).toLocaleDateString()}`,
    headerStyle: {
      backgroundColor: theme.colors.danger
    },
    headerTintColor: theme.colors.card,
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
          buttonStyle={{ color: theme.colors.card }}
        />
      </HeaderButtons>),
  })
};

export const AboutNavigator = ({ style }) => (
  <Animated.View style={[styles.stack, style]}>
    <About.Navigator
      {...navigatorConfig(SCREENS.ABOUT)}
    >
      <About.Screen
        name={SCREENS.ABOUT}
        component={AboutScreen}
        options={screenConfig('About App', false)} />
    </About.Navigator>
  </Animated.View>

);

export const CreateNavigator = ({ style }) => (
  <Animated.View style={[styles.stack, style]}>
    <Create.Navigator
      {...navigatorConfig(SCREENS.CREATE)}
    >
      <Create.Screen
        name={SCREENS.CREATE}
        component={CreateScreen}
        options={screenConfig('Create Post', false)}
      />
    </Create.Navigator>
  </Animated.View>

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


const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
})
