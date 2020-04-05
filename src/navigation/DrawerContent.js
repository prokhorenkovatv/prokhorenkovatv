import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  TouchableRipple,
  useTheme,
  Switch,
  Drawer,
  Avatar
} from 'react-native-paper';

const DrawerContent = (props) => {
  const theme = useTheme();
  return (
    <DrawerContentScrollView
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.drawerHeader}>
        <Avatar.Icon size={80} icon='feather' />
        <Text style={styles.drawerTitle}>Posts App</Text>
      </View>
      <Drawer.Section title="Main" style={styles.drawerSection}>
        <DrawerItemList {...props} />
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <TouchableRipple
          onPress={props.toggleTheme}
        >
          <View style={styles.preference}>
            <View pointerEvents="none" style={styles.themeBlock}>
              <Text style={styles.themeText}>Dark Theme</Text>
              <Switch
                style={styles.themeSwitch}
                color={theme.colors.primary}
                value={theme.dark} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerStyles: {
    flex: 1,
    width: '50%'
  },
  drawerItem: {
    alignItems: 'flex-start',
    marginVertical: 0
  },
  drawerHeader: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  drawerTitle: {
    fontSize: 24
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerSection: {
    marginTop: 35,
  },
  themeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontFamily: 'OpenSans-Bold'
  },
  themeSwitch: {
    paddingLeft: 40
  }
});