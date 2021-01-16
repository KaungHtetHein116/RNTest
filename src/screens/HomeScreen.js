import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import CreateItemModal from './components/CreateItemModal';

export default function HomeScreen() {
  var db = openDatabase({name: 'UserDatabase.db'});
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='item_table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS item_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS item_table(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(20), type VARCHAR(20), item_price INT(100), date VARCHAR(20), month VARCHAR(15), year VARCHAR(10))',
              [],
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM item_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log('temp', temp);
      });
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <CreateItemModal onClose={() => setModalVisible(false)} />
      </Modal>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
