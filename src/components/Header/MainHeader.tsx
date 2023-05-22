import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  isBorderBottom?: boolean;
}

const MainHeader: React.FC<PropsWithChildren<Props>> = ({
  children,
  isBorderBottom,
}) => {
  return (
    <View style={[styles.block, { borderBottomWidth: isBorderBottom ? 1 : 0 }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    width: '100%',
    borderColor: '#aaa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

export default MainHeader;
