import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

const Slide = ({title, right, image}) => {
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '-90deg' : '90deg'},
  ];

  return (
    <View style={styles.container}>
      <Image source={image} style={[styles.image, {left: right ? 0 : 100}]} />
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width,
  },
  image: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
