import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { THEME } from 'styles/theme';
import Icon from 'components/Icon';

const AppHeaderIcon = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Icon}
      color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
    />
  );
}

export default AppHeaderIcon;
