import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

const Subslide = ({subtitle, decription, last, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{decription}</Text>
      <Pressable
        style={[
          styles.btnContainer,
          {backgroundColor: last ? '#2CB9B0' : 'rgba(12, 13, 52, 0.05)'},
        ]}
        onPress={last ? () => {} : onPress}>
        <Text style={[styles.btnText, {color: last ? '#fff' : '#0C0D34'}]}>
          {last ? 'Let’s get started' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Subslide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 24,
    color: '#0C0D34',
    paddingBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#0C0D34',
    textAlign: 'center',
    marginBottom: 40,
  },
  btnContainer: {
    width: 245,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '500',
    fontSize: 15,
  },
});
