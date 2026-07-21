import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  total: number;
  active: number;
}

export function Dots({ total, active }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === active ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dot: {
    height: 5,
    borderRadius: 2.5,
  },
  activeDot: {
    width: 30,
    backgroundColor: '#D8B4F8',
    borderRadius: 2,
  },
  inactiveDot: {
    width: 5,
    backgroundColor: 'rgba(216,180,248,0.7)',
  },
});
