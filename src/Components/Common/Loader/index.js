import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// @todo: replace with a spinner
export default function Loader(props) {
  return (
    <View style={styles.container}>
      <Text>Loading..</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    zIndex: 999,
  }
});
