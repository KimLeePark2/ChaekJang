import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'BookDetail'>;

const BookDetail: React.FC<PropsType> = ({ navigation, route }) => {
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView edges={['bottom']}>
      <View
        style={{
          height: 30,
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={onPressBack}>
          <Text style={{ color: 'blue', fontSize: 24 }}>{'<'}</Text>
        </Pressable>
      </View>
      <Text>BookDetail hi</Text>
      <Text>ID is {route.params?.id}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default BookDetail;
