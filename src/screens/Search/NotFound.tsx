import React from 'react';
import { View, Text } from 'react-native';

const NotFound = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 6,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Text style={{ fontSize: 16 }}>검색 결과가 없어요</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#aaa' }}>
            키워드 알림으로 새 글이 등록되면
          </Text>
          <Text style={{ color: '#aaa' }}>알려주는 기능을 넣을까요..?</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#ececec',
            padding: 8,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>이렇게 해보세요</Text>
          <Text>- 검색어를 바르게 입력했는지 확인</Text>
          <Text>- 간단한 단어로 검색해보세요</Text>
        </View>
      </View>
    </View>
  );
};

export default NotFound;
