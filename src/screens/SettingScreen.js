import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
