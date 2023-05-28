import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import BookList from '@components/Book/BookList';
import NewBookButton from '@components/Book/NewBookButton';

type PropsType = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamsType, 'Home'>,
  NativeStackScreenProps<RootStackParamsType>
>;

const Home: React.FC<PropsType> = ({ navigation }) => {
  const onPressSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={styles.container}>
        <Pressable onPress={onPressSignIn}>
          <Text style={styles.temporaryText}>(sign-in page)</Text>
        </Pressable>
      </View>
      <View>
        <BookList />
      </View>
      <NewBookButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 30,
  },
  temporaryText: {
    color: 'blue',
  },
});

export default Home;
