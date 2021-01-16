import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Calendar} from 'react-native-calendars';
import {openDatabase} from 'react-native-sqlite-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

var db = openDatabase({name: 'UserDatabase.db'});
const data = [
  {
    label: 'Income',
  },
  {
    label: 'Expense',
  },
];
export default function CreateItemModal({onClose}) {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [date, setDate] = useState('');
  const [itemType, setItemType] = useState('');

  const onSubmit = () => {
    console.log(
      itemName,
      itemType.label,
      itemPrice,
      date.dateString,
      date.month,
      date.year,
    );

    if (!itemName) {
      alert('Please fill name');
      return;
    }

    if (!itemType) {
      alert('Please select type');
      return;
    }

    if (!itemPrice) {
      alert('Please fill price');
      return;
    }
    if (!date) {
      alert('Please fill date');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO item_table (item_name, type, item_price, date, month, year) VALUES (?,?,?,?,?,?)',
        [
          itemName,
          itemType.label,
          itemPrice,
          date.dateString,
          date.month,
          date.year,
        ],

        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item saved successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => onClose(),
                },
              ],
              {cancelable: false},
            );
          } else alert('Failed');
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => onClose()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color={'black'} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'dodgerblue'}}>Add Product</Text>
        </View>
        <View style={{height: 30, width: 30}} />
      </View>
      <ScrollView>
        <Text style={styles.text}>Item Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Here"
          onChangeText={(text) => setItemName(text)}
        />
        <Text style={styles.text}>Select Type</Text>
        <RadioButtonRN
          data={data}
          selectedBtn={(e) => {
            setItemType(e);
          }}
          icon={<FontAwesome name="check-circle" size={25} color="#2c9dd1" />}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '40%'}}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Here"
              keyboardType="number-pad"
              onChangeText={(text) => setItemPrice(text)}
            />
          </View>
        </View>
        <Text style={styles.text}>Pick Date</Text>
        <Calendar
          current={'2021-01-16'}
          minDate={'2021-01-01'}
          maxDate={'2027-01-01'}
          onDayPress={(day) => {
            setDate(day);
          }}
          monthFormat={'yyyy MM'}
          hideArrows={false}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          markedDates={{
            [date.dateString]: {
              selected: true,
              selectedColor: 'orange',
              selectedTextColor: 'red',
            },
          }}
        />
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.8}
          onPress={onSubmit}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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
  loginText: {
    color: 'grey',
  },

  textInput: {
    backgroundColor: '#F4F4FA',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
