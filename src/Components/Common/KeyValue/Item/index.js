import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function KeyValueItem(props) {
  const { title, value } = props;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <Text style={[styles.text, styles.value]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: -1,
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
  title: {
    color: '#888',
  },
  value: {
    // color: '#333',
  },
});
