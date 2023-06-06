import React from 'react';
import { StyleSheet, Text, Pressable, Platform } from 'react-native';

const MenuItem = ({ name, onPress }: IMenuItem) => (
  <Pressable
    style={({ pressed }) => [
      styles.block,
      Platform.OS === 'ios' && pressed && styles.pressed,
    ]}
    onPress={onPress}
    android_ripple={{ color: '#eeeeee' }}>
    <Text>{name}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  pressed: {
    backgroundColor: '#eeeeee',
  },
});

export default MenuItem;
