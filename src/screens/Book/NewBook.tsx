import BookEditor from '@components/Book/BookEditor';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'NewBook'>;

const NewBook: React.FC<PropsType> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSubmit = () => {
    Alert.alert(`완료되었습니다${title}\n${price}\n${description}`);
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={styles.avoidingView}
      >
        <View style={styles.header}>
          <Pressable onPress={onPressBack}>
            <Text style={{ color: 'blue', fontSize: 24 }}>{'<'}</Text>
          </Pressable>
          <Pressable onPress={onPressSubmit}>
            <Text>완료</Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View>
          <BookEditor
            title={title}
            price={price}
            description={description}
            setTitle={setTitle}
            setPrice={setPrice}
            setDescription={setDescription}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  avoidingView: {
    flex: 1,
  },
  header: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default NewBook;
