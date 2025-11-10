import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const DOTS = 3;
  const speed = 600; // ms for a full up+down cycle per dot

  // create animated values for each dot
  const anims = useRef(
    Array.from({ length: DOTS }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // build looping animations with a staggered start
    const loops = anims.map((val, i) => {
      const up = Animated.timing(val, {
        toValue: 1,
        duration: Math.round(speed / 2),
        useNativeDriver: true,
      });
      const down = Animated.timing(val, {
        toValue: 0,
        duration: Math.round(speed / 2),
        useNativeDriver: true,
      });

      // stagger each dot by a fraction so they bounce in sequence
      return Animated.loop(
        Animated.sequence([
          Animated.delay(i * Math.round(speed / (DOTS * 2))),
          up,
          down,
        ])
      );
    });

    loops.forEach(loop => loop.start());

    // navigate after the splash timeout
    const t = setTimeout(() => navigation.replace('Signup'), 2000);

    return () => {
      clearTimeout(t);
      loops.forEach(loop => loop.stop());
    };
  }, [anims, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>RN Chat App</Text>

      <View style={styles.dotsWrap} accessible accessibilityLabel="Loading">
        {anims.map((val, i) => {
          const translateY = val.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -8], // how high the dot moves
          });
          const scale = val.interpolate({
            inputRange: [0, 1],
            outputRange: [0.75, 1.15],
          });
          const opacity = val.interpolate({
            inputRange: [0, 1],
            outputRange: [0.35, 1],
          });

          return (
            <Animated.View
              key={`dot-${i}`}
              style={[
                styles.dot,
                {
                  transform: [{ translateY }, { scale }],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 18,
  },
  dotsWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 24,
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#f31212ff',
    marginHorizontal: 6,
  },
});
