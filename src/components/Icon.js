import React from 'react';
import { StyleSheet, Text } from 'react-native';

const resolveIcon = name =>
  ({
    'icon-camera': 'c',
    'icon-cross': 'r',
    'icon-star': 't',
    'icon-empty-star': 'e',
    'icon-menu': 'm',
    'icon-list': 'l'
  }[name]);

const Icon = ({ name, style }) => (
  <Text style={[styles.icon, style]}>{resolveIcon(name) || 'r'}</Text>
);

export default Icon;

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'estimate',
    color: 'white',
    fontSize: 24
  },
});