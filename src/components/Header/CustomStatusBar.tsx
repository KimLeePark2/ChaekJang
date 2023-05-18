import React from 'react';
import { View, StatusBar, ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'src/styles/colors';

interface IProps {
  backgroundColor?: ColorValue;
}

const CustomStatusBar: React.FC<IProps> = ({
  backgroundColor = colors.white,
}) => {
  // iOS 기기별 status bar 높이
  const { top } = useSafeAreaInsets();
  const barStyle =
    backgroundColor === colors.white ? 'dark-content' : 'light-content';
  return (
    <>
      <View style={{ height: top, backgroundColor }} />
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    </>
  );
};

export default CustomStatusBar;
