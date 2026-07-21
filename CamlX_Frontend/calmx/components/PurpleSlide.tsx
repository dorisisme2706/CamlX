import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SlideData } from '../app/onboarding';

const { width, height } = Dimensions.get('window');
const PURPLE = '#D8B4F8';

interface Props {
  slide: Extract<SlideData, { type: 'purple' }>;
  onFinish: () => void;
}

export function PurpleSlide({ slide, onFinish }: Props) {
  return (
    <View style={styles.container}>
      {/* Decorative circle top-right */}
      <View style={styles.circleTopRight} />
      {/* Decorative circle bottom-left */}
      <View style={styles.circleBottomLeft} />

      {/* Quote block */}
      <View style={styles.quoteBlock}>
        <Text style={styles.quoteMark}>&quot;</Text>
        <Text style={styles.quoteText}>{slide.quoteText}</Text>
        <Text style={styles.attribution}>{slide.attribution}</Text>
        {/* <Text style={styles.quoteMark}>&quot;</Text> */}
      </View>

      {/* CTA button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onFinish} style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Bắt đầu ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTopRight: {
    position: 'absolute',
    width: 225,
    height: 225,
    borderRadius: 112.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    top: 40,
    right: -40,
  },
  circleBottomLeft: {
    position: 'absolute',
    width: 225,
    height: 225,
    borderRadius: 112.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    bottom: height - 754 - 225,
    left: -49,
  },
  quoteBlock: {
    paddingHorizontal: 41,
    alignItems: 'center',
    marginBottom: 40,
  },
  quoteMark: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#fff',
    lineHeight: 56,
    marginBottom: 4,
    alignSelf: 'center',
  },
  quoteText: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: '#000',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  attribution: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: PURPLE,
    letterSpacing: -0.32,
  },
});
