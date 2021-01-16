import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const db = openDatabase({name: 'ItemDatabase.db'});
const YEAR = ['2020', '2021', '2022', '2023', '2024'];
const MONTH = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const LABEL = {
  day: 'Day',
  item_name: 'Description',
  item_price: 'Amount',
  balance: 'Balance',
};

const {width, height} = Dimensions.get('window');
export default function HistoryScreen() {
  const dateObj = new Date();

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(dateObj.getUTCMonth() + 1);
  const [year, setYear] = useState(dateObj.getUTCFullYear());
  const [balance, setBalance] = useState(0);

  const handleSelectYearMonthData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM item_table where year=? and month=?',
        [year, month],
        (tx, results) => {
          var temp = [];
          var tempBalance = [];
          var tempResult = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tempResult =
              results.rows.item(i).type === 'Income'
                ? tempResult + results.rows.item(i).item_price
                : tempResult - results.rows.item(i).item_price;
            tempBalance.push(tempResult);
          }
          console.log('history', temp);
          setData(temp);
          setBalance(tempBalance);
        },
      );
    });
  };

  useEffect(() => {
    handleSelectYearMonthData();
    console.log(month, year);
  }, []);

  const pickerItem = (array) => {
    return array.map((item) => {
      return <Picker.Item label={item} value={item} key={item} />;
    });
  };

  const dataItem = (item, index) => {
    return (
      <View style={styles.tableTitleContainer}>
        <View style={styles.firstColumn}>
          <Text>{item.day}</Text>
        </View>
        <View style={styles.secondColumn}>
          <Text>{item.item_name}</Text>
        </View>
        <View style={styles.thirdColumn}>
          <Text style={{color: item.type === 'Income' ? 'blue' : 'red'}}>
            {item.type === 'Income' ? null : '- '}
            {item.item_price}
          </Text>
        </View>
        <View style={styles.lastColumn}>
          <Text>{item.balance ? item.balance : balance[index]}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text>Pick month</Text>
          <Text>Pick year</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Picker
            selectedValue={month}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue) => setMonth(itemValue)}>
            {pickerItem(MONTH)}
          </Picker>
          <Picker
            selectedValue={year}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue) => setYear(itemValue)}>
            {pickerItem(YEAR)}
          </Picker>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.8}
            onPress={handleSelectYearMonthData}>
            <Text style={{color: 'white'}}>Set Date</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View>
          <View>
            {dataItem(LABEL)}
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => dataItem(item, index)}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                  }}>
                  <Text>no data</Text>
                </View>
              )}
              ListFooterComponent={dataItem({
                day: '',
                item_name: 'Total',
                item_price: balance[balance.length - 1],
                balance: balance[balance.length - 1],
              })}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  submitBtn: {
    backgroundColor: 'dodgerblue',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tableTitleContainer: {
    flexDirection: 'row',
    width: width,
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  firstColumn: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondColumn: {
    width: (width - 50) / 2,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdColumn: {
    width: (width - 50) / 4,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastColumn: {
    width: (width - 50) / 4,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
