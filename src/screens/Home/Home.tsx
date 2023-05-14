import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <Text>Main hi</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default Home;
