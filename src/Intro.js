import {Dimensions, StyleSheet, View, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import Slide, {SLIDE_HEIGHT} from './components/Slide';
import Subslide from './components/Subslide';
import {_backgroundColors, slides} from './components/_slideData';

const Intro = () => {
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef(null);
  const value = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('window');

  const onScroll = val => {
    setScrollX(val.nativeEvent.contentOffset.x);
    Animated.timing(value, {
      toValue: val.nativeEvent.contentOffset.x / width,
      useNativeDriver: false,
      duration: 0,
    }).start();
  };

  const inputRange = [0, 1, 2, 3];
  const backgroundColor = value.interpolate({
    inputRange,
    outputRange: _backgroundColors,
  });
  const dots = [
    {
      width: value.interpolate({inputRange, outputRange: [16, 8, 8, 8]}),
      color: value.interpolate({
        inputRange,
        outputRange: [
          'rgba(44, 185, 176, 1)',
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 0.3)',
        ],
      }),
    },
    {
      width: value.interpolate({inputRange, outputRange: [8, 16, 8, 8]}),
      color: value.interpolate({
        inputRange,
        outputRange: [
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 1)',
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 0.3)',
        ],
      }),
    },
    {
      width: value.interpolate({inputRange, outputRange: [8, 8, 16, 8]}),
      color: value.interpolate({
        inputRange,
        outputRange: [
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 1)',
          'rgba(44, 185, 176, 0.3)',
        ],
      }),
    },
    {
      width: value.interpolate({inputRange, outputRange: [8, 8, 8, 16]}),
      color: value.interpolate({
        inputRange,
        outputRange: [
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 0.3)',
          'rgba(44, 185, 176, 1)',
        ],
      }),
    },
  ];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.slider, {backgroundColor: backgroundColor}]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScroll}>
          {slides.map(({title, right, image}, index) => (
            <Slide key={index} {...{title, image, right}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: backgroundColor,
          }}
        />
        <View
          style={{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75}}>
          <View style={styles.indicatorContainer}>
            {dots.map((val, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.normalDot,
                  {width: val.width, backgroundColor: val.color},
                ]}
              />
            ))}
          </View>
          <Animated.View
            style={[
              styles.footerMain,
              {
                width: width * slides.length,
                transform: [{translateX: scrollX * -1}],
              },
            ]}>
            {slides.map(({subtitle, decription}, index) => (
              <Subslide
                key={index}
                {...{subtitle, decription}}
                last={index === slides.length - 1}
                onPress={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      x: width * (index + 1),
                      animated: true,
                    });
                  }
                }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: 75,
    overflow: 'hidden',
  },
  footer: {
    flex: 1,
  },
  footerMain: {
    flex: 1,
    flexDirection: 'row',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
