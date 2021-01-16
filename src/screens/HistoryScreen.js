import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'ItemDatabase.db'});

export default function HistoryScreen() {
  const handleSelectYearMonthData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM item_table where year=? && month=?',
        [2021, 2],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log('history', temp);
        },
      );
    });
  };
  return (
    <View style={{flexDirection: 'row'}}>
      {/* <Text>{item.item_price}</Text> */}
      <TouchableOpacity onPress={() => handleSelectYearMonthData()}>
        <AntDesign name="delete" size={30} />
      </TouchableOpacity>
    </View>
  );
}
