import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Card } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'

import User from '../../model/User';
import { signOut } from '../../store/redurcer/userSlice';
import { createStorageReferenceToFile, updateInformationFirebase } from '../../utils/updateBd';

const Profile = (props: any) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const [imageUrl, setImageUrl] = useState<any>(require('../../assets/dragon.png'));
  const [user, setUser] = useState({
    name: '',
    age: 0,
    image: '',
    favoritepokemon: '',
    id: '0'
  });
  useEffect(() => {
    const substriber = firestore()
      .collection('users')
      .doc(currentUser.userId)
      .onSnapshot(documentSnaphot => {
        console.log('User data :', documentSnaphot.data());
        //@ts-ignore
        setUser(documentSnaphot.data());
        //@ts-ignore
        setImageUrl({uri: documentSnaphot.data()?.image});
      });

    return () => substriber();
  }, [currentUser.userId]);
  const onSingOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(signOut(''));
        props.navigation.navigate('Login');
      });
  };
  const _updateImageSore = async (image:any, pathFirestore:string)=>{
    
    const fileSource = image.path;
    const storageRef = storage().ref(pathFirestore);
    const test = await storageRef.putFile(fileSource);
    
    return test;
  };
  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      const date = new Date().toISOString();
      setImageUrl({ uri: image.path });
      const pathFirebase = `/users/${currentUser.userId}/images/${date}.png`;
      _updateImageSore(image,pathFirebase)
        .then(()=>{
          console.log('image téléchargé');
          storage().ref(pathFirebase).getDownloadURL().then((downloadURL:string)=>{
            console.log('url: ', downloadURL);
            updateInformationFirebase(currentUser.userId, {image:downloadURL})
              .then(()=>{
                console.log('image modifier pour: ', currentUser.userId);
              }).catch((err:any)=>console.log('error1: ',err));
          }).catch((err:any)=>console.log('error2: ',err))
        }).catch((err)=>console.log('error3: ',err));

    }).catch(err => console.log('erro4 :',err));
  };
  return (
    <View>
      {
        user?.id === '0' ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Card>
            <Card.Title>{user?.name} (ID:{currentUser.userId})</Card.Title>
            <Card.Divider />
            <View style={{ alignItems: 'center' }}>
              <Image source={imageUrl} style={styles.imagePokemon} />
            </View>
            <View style={styles.details_containair}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text>Age: {user?.age}</Text>
                <Text>Pokemon Favorie: {user?.favoritepokemon}</Text>
              </View>
              <View style={{ margin: 10 }}>
                <Button title="changer d'image" onPress={onSelectImage} color="#ffa07a" />
              </View>
              <Button title='deconnecter' onPress={onSingOut} color="#ffa07a" />
            </View>
          </Card>
        )
      }

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