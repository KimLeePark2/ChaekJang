import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

type PropsType = {
  title: string;
  price: number;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

const BookEditor: React.FC<PropsType> = ({
  title,
  price,
  description,
  setTitle,
  setPrice,
  setDescription,
}) => {
  const priceRef = useRef<TextInput>(null);

  const onPressNewPhoto = () => {
    Alert.alert('Comming Soon ^^7');
  };

  return (
    <View>
      <View style={styles.photoContainer}>
        <Pressable onPress={onPressNewPhoto} style={styles.photo}>
          <Text>+</Text>
        </Pressable>
        <Pressable style={styles.photo}>
          <Text>Photo</Text>
        </Pressable>
        <Pressable style={styles.photo}>
          <Text>Photo</Text>
        </Pressable>
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.title}
        placeholder="책 제목"
        returnKeyType="next"
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={() => priceRef.current?.focus()}
      />
      <View style={styles.separator} />
      <View style={styles.priceContainer}>
        <Text style={price === 0 && styles.priceUnit}>₩</Text>
        <TextInput
          style={[styles.price, price === 0 && styles.priceUnit]}
          ref={priceRef}
          placeholder="가격"
          inputMode="numeric"
          maxLength={10}
          value={price?.toLocaleString()}
          onChangeText={(newPrice: string) =>
            setPrice(Number(newPrice.replaceAll(',', '')))
          }
        />
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.description}
        placeholder="책 상태 및 거래 관련 설명"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  photo: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#B6B6B6',
    borderRadius: 10,
  },
  title: {
    height: 40,
  },
  priceContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceUnit: {
    color: '#ACACAC',
  },
  price: {
    height: 40,
    flex: 1,
  },
  description: {
    height: 300,
  },
  separator: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default BookEditor;
