import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {openDatabase} from 'react-native-sqlite-storage';
import CreateItemModal from './components/CreateItemModal';
import ItemComponent from './components/ItemComponent';

var db = openDatabase({name: 'ItemDatabase.db'});
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
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
  const getItem = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM item_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log('temp', temp);
        setData(temp);
      });
    });
    console.log('get item');
  };
  useEffect(() => {
    getItem();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <CreateItemModal
          onClose={() => {
            setModalVisible(false);
            getItem();
          }}
        />
      </Modal>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <ItemComponent item={item} getItem={() => getItem()} />
        )}
      />
      <ActionButton
        buttonColor="dodgerblue"
        onPress={() => {
          setModalVisible(true);
        }}
        style={{marginBottom: 40}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  submitBtn: {
    width: '50%',
    backgroundColor: 'dodgerblue',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
