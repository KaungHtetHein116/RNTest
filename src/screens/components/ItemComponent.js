import React from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
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
    <View>
      <View style={styles.itemContainer}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text>Item Name : {item.item_name}</Text>
          <TouchableOpacity onPress={() => handlePressDelete(item.item_id)}>
            <AntDesign name="delete" size={30} />
          </TouchableOpacity>
        </View>
        <Text>Item Price : {item.item_price}</Text>
        <Text>Date : {item.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
  },
});
