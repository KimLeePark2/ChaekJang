import BookEditor from '@components/Book/BookEditor';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import type { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import Check from 'src/assets/svgs/check.svg';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'NewBook'>;

const NewBook: React.FC<PropsType> = ({ navigation }) => {
  const [photo, setPhoto] = useState<Asset[]>([]);
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
            <ChevronLeft style={styles.headerIcon} />
          </Pressable>
          <Pressable onPress={onPressSubmit}>
            <Check style={styles.headerIcon} />
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View>
          <BookEditor
            photo={photo}
            title={title}
            price={price}
            description={description}
            setPhoto={setPhoto}
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
  headerIcon: {
    color: 'black',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default NewBook;
