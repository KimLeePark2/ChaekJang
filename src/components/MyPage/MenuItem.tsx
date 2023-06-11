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
    <Text style={styles.text}>{name}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  block: {
    height: 40,
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: '#eeeeee',
  },
  text: {
    fontSize: 16,
  },
});

export default MenuItem;
