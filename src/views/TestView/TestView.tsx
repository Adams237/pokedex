import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const TestView = () => {
  return (
    <View style={{ flex: 1 }}>
        <View style ={{ flex:1, backgroundColor: 'green' }} ></View> 
        <View style ={{ flex:2, backgroundColor: 'red' }} ></View> 
        <View style ={{ flex:3, backgroundColor: 'yellow' }} ></View> 
    </View>
  );
};

const styles = StyleSheet.create({

});

export default TestView;
