import { useState, useCallback } from 'react';
import { ActionSheetIOS, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useBookAPI from '@hooks/useBookAPI';

export default function useBookDetailActions(productId: number) {
  const { deleteProduct } = useBookAPI();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamsType & HomeStackParamsType>
    >();
  const [isSelecting, setIsSelecting] = useState(false);
  const edit = () => {
    console.log('TODO: edit');
    navigation.navigate('NewBook');
  };
  const remove = useCallback(async () => {
    try {
      const response = await deleteProduct(productId);
      if (response.status === 200) {
        navigation.goBack();
      }
    } catch (e) {
      console.log('remove error :: ', e);
    }
  }, []);
  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['게시글 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove().then();
          }
        },
      );
    }
  };
  const actions = [
    {
      icon: 'edit',
      text: '게시물 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];
  const onClose = () => {
    setIsSelecting(false);
  };
  return { isSelecting, onPressMore, onClose, actions };
}
