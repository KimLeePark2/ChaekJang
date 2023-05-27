import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BookList from 'src/components/Book/BookList';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NewBookButton from '@components/NewBookButton';

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
