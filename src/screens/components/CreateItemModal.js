import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function CreateItemModal({onClose}) {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
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

      <Text style={styles.text}>Item Name</Text>
      <TextInput style={styles.textInput} placeholder="Shampoo" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '40%'}}>
          <Text style={styles.text}>Price</Text>
          <TextInput
            style={styles.textInput}
            placeholder="12345"
            keyboardType="number-pad"
          />
        </View>
      </View>
      <Text style={styles.text}>Pick Date</Text>
      <Calendar
        current={'2021-01-16'}
        minDate={'2021-01-01'}
        maxDate={'2022-01-1'}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
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
    marginTop: 40,
    marginBottom: 10,
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
