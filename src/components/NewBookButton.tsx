import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';

const NewBookButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsType>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('NewBook')}
        style={({ pressed }) => [
          styles.button,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Text style={{ color: 'white' }}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 36,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#4D4D4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: Platform.select({ android: 'hidden' }),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#48BA95',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewBookButton;
