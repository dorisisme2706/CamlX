import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface Props {
  onPress: () => void;
}

export function ArrowButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>
      <View style={styles.button}>
        <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
          <Circle cx="25" cy="25" r="25" fill="rgba(255,255,255,0.2)" />
          <Path
            d="M20 25H30M30 25L25 20M30 25L25 30"
            stroke="#D8B4F8"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});
