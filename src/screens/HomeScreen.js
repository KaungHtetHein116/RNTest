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
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
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
