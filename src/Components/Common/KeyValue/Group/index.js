import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default function KeyValueGroup(props) {
  const { title, children } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    paddingBottom: 10,
    paddingLeft: 20,
    // color: '#bbb',
  },
});
