import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import BookList from 'src/components/Book/BookList';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type PropsType = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamsType, 'Home'>,
  NativeStackScreenProps<RootStackParamsType>
>;

const Home: React.FC<PropsType> = ({ navigation }) => {
  const onPressBookDetail = (id: number) => {
    navigation.navigate('BookDetail', { id });
  };

  const onPressSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onPressNewBook = () => {
    navigation.push('NewBook');
  };
  return (
    <SafeAreaView edges={['bottom']}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 30,
        }}
      >
        <Pressable onPress={() => onPressBookDetail(1)}>
          <Text style={{ color: 'blue' }}>(detail page)</Text>
        </Pressable>
        <Pressable onPress={onPressSignIn}>
          <Text style={{ color: 'blue' }}>(sign-in page)</Text>
        </Pressable>
        <Pressable onPress={onPressNewBook}>
          <Text style={{ color: 'blue' }}>(new-book page)</Text>
        </Pressable>
      </View>
      <View>
        <BookList onPressBookDetail={onPressBookDetail} />
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   block: {},
// });

export default Home;
