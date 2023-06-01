import BookEditor from '@components/Book/BookEditor';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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
import useAxios from '@hooks/useAxios';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'NewBook'>;

const NewBook: React.FC<PropsType> = ({ navigation }) => {
  const { requestNewBookApi } = useAxios();
  const [photo, setPhoto] = useState<Asset[]>([]);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(
      photo.length === 0 || title === '' || price === 0 || description === '',
    );
  }, [photo, title, price, description]);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSubmit = async () => {
    try {
      const { status } = await requestNewBookApi('/v1/products', {
        userId: '1',
        photo,
        title,
        price,
        description,
      });
      if (status === 200) {
        navigation.goBack();
        return;
      }
      Alert.alert('재시도 바랍니다.');
    } catch (error) {
      console.log(error);
    }
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
          <Pressable onPress={onPressSubmit} disabled={disabled}>
            <Check
              style={disabled ? styles.disableCheckIcon : styles.ableCheckIcon}
            />
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
  disableCheckIcon: {
    color: '#BFBFBF',
  },
  ableCheckIcon: {
    color: '#48BA95',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default NewBook;
