import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'ItemDatabase.db'});

export default function SettingScreen() {
  const onDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure to delete your data history?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dropDatabase()},
      ],
      {cancelable: false},
    );
  };

  const dropDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM  item_table', [], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Item is deleted successfully',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('table do not exist');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.8}
          onPress={onDelete}>
          <Text style={{color: 'white'}}>Delete History Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: '50%',
    backgroundColor: 'dodgerblue',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
