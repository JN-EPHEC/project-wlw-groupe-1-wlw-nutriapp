import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../styles/theme';

export default function PrimaryButton({ label, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    // Native shadow properties
    ...Platform.select({
      ios: {
        shadowColor: '#7447ff',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 4px 8px rgba(116, 71, 255, 0.2)',
      },
    }),
  },
  text: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

