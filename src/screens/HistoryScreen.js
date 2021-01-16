import React, {useState, useEffect} from 'react';
import {View, Text, Picker, StyleSheet, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'ItemDatabase.db'});
const YEAR = [2020, 2021, 2022, 2023, 2024];
const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function HistoryScreen() {
  const dateObj = new Date();

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(dateObj.getUTCMonth() + 1);
  const [year, setYear] = useState(dateObj.getUTCFullYear());

  const handleSelectYearMonthData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM item_table where year=? and month=?',
        [year, month],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log('history', temp);
          setData(temp);
        },
      );
    });
  };

  useEffect(() => {
    handleSelectYearMonthData();
    console.log(month, year);
  }, []);

  const pickerItem = () => {
    return MONTH.map((month) => {
      return <Picker.Item label={month} value={month} key={month} />;
    });
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text>Pick month</Text>
        <Picker
          selectedValue={month}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue) => setMonth(itemValue)}>
          {pickerItem()}
        </Picker>
        <Text>Pick year</Text>
        <Picker
          selectedValue={year}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue) => setYear(itemValue)}>
          <Picker.Item label="2020" value="2020" />
          <Picker.Item label="2021" value="2021" />
        </Picker>
      </View>
      <View style={{}}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text>Date Created: {item.date}</Text>
              <Text>Item Name : {item.item_name}</Text>
              <Text>Item Price: {item.item_price}</Text>
            </View>
          )}
        />
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
  container: {
    flex: 1,
  },
});
