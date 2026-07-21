import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';

export function RadiantEmotionSlider() {
  const [emotionValue, setEmotionValue] = useState<number>(0.5);

  const getCalyExpression = (val: number) => {
    if (val < 0.2) return require('../assets/images/angry.png');
    if (val < 0.4) return require('../assets/images/sad.png');
    if (val < 0.6) return require('../assets/images/anxious.png');
    if (val < 0.8) return require('../assets/images/happy.png');
    return require('../assets/images/optimistic.png');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <LinearGradient
          colors={['#4A4A4A', '#D8B4F8', '#FFD700']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientTrack}
        />
        
        <Slider
          containerStyle={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={emotionValue}
          onValueChange={(value) => setEmotionValue(value[0])} 
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          renderThumbComponent={() => (
            <View style={styles.thumbWrapper}>
              <Image 
                source={getCalyExpression(emotionValue)} 
                style={styles.calyThumb} 
                resizeMode="contain" 
              />
            </View>
          )}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  gradientTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 16,
    borderRadius: 8,
  },
  slider: {
    width: '100%',
    height: 50,
  },
  thumbWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  calyThumb: {
    width: 40,  
    height: 40,
  },
  label: {
    marginTop: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#333',
    letterSpacing: 0.2,
  },
});