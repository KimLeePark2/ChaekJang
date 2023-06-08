import { useState } from 'react';
import { ActionSheetIOS, Platform } from 'react-native/types';

export default function usePostAction() {
    const [isSelecting, setIsSelecting] = useState(false);

    const edit = () => {
        console.log('TODO: edit');
    };
    const remove = () => {
        console.log('TODO: remove');
    };
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
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        edit();
                    } else if (buttonIndex === 1) {
                        remove();
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
    return { isSelecting, onPressMore, onClose, actions, };
}