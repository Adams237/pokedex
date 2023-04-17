import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { Card } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import User from '../../model/User';
import { signOut } from '../../store/redurcer/userSlice';

const Profile = (props:any) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const UserId: string = 'test123';
  const user: User = {
    name: 'Adams',
    age: 24,
    image: '../../assets/dragon.png',
    favoritepokemon: 'pikachu',
    id: '123'
  };
  const onSingOut = ()=>{
    auth()
    .signOut()
    .then(()=>{
      dispatch(signOut(''));
        props.navigation.navigate('Login');
    });
};
  return (
    <View>
      <Card>
        <Card.Title>{currentUser.userEmail} ID:{ currentUser.userId }</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/dragon.png')} style={styles.imagePokemon} />
        </View>
        <View style={styles.details_containair}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text>Age: {user.age}</Text>
            <Text>Pokemon Favorie: {user.favoritepokemon}</Text>
          </View>
          <Button title='deconnecter' onPress={onSingOut} color="#ffa07a"/>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePokemon: {
    width: 400,
    height: 400
  },
  details_containair: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: '#fff',
    elevation: 6
  }
});

export default Profile