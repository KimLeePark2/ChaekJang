import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from 'src/components/Book/BookList';

type PropsType = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamsType, 'Home'>,
  NativeStackScreenProps<RootStackParamsType>
>;

const Home: React.FC<PropsType> = ({ navigation }) => {
  const onPressBookDetail = () => {
    navigation.navigate('BookDetail');
  };

  const onPressSignIn = () => {
    navigation.navigate('SignIn');
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
        <Pressable onPress={onPressBookDetail}>
          <Text style={{ color: 'blue' }}>click me (detail page)</Text>
        </Pressable>
        <Pressable onPress={onPressSignIn}>
          <Text style={{ color: 'blue' }}>click me (sign-in page)</Text>
        </Pressable>
      </View>
      <View>
        <BookList />
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   block: {},
// });

export default Home;
