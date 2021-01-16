import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'ItemDatabase.db'});

export default function ItemComponent({item, getItem}) {
  const handlePressDelete = (itemId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  item_table where item_id=?',
        [itemId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item is deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: getItem(),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('item Id is not valid');
          }
        },
      );
    });
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{item.item_price}</Text>
      <TouchableOpacity onPress={() => handlePressDelete(item.item_id)}>
        <AntDesign name="delete" size={30} />
      </TouchableOpacity>
    </View>
  );
}
