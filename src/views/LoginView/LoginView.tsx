import React,{useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';


const LoginView = (props:any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(()=>{
    _isUserAuth();
  },[])

  const _isUserAuth = ()=>{
    if(auth().currentUser){
        console.log('userId :', auth().currentUser?.uid);
        props.navigation.navigate('Home');
    }
  };

  const onLoginPress = ()=>{
    auth()
    .signInWithEmailAndPassword(email,password)
    .then((response: any)=>{
     const userid = response.user.uid;
     console.log('user login', userid);
      props.navigation.navigate('Home');
    })
    .catch(error=>{
      if(error.code ==='auth/email-already-in-use'){
        console.log('Email déjà utiliser');
        alert('Email déjà utiliser');
      }
      if(error.code === 'auth/invalid-email'){
        console.log('Email invalide');
        alert('Email invalide');
      }
      console.error(error);
    });
    console.log("connextion");
  }

  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../../assets/pikachu.jpg')}
        />
        <Text style={styles.textIntroduction}>Devenez le meilleur dresseur de Pokémon !</Text>
        <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}>
            <Text style={styles.buttonTitle}>Se connecter</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
            <Text style={styles.footerText}>Pas de compte? <Text onPress={() => props.navigation.navigate('Singup')} style={styles.footerLink}>Créer un compte</Text></Text>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  textIntroduction: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 16,
      width: 300,
  },

  logo: {
      marginTop: 100,
      marginBottom: 20,
      width: 100,
      height: 100,
      borderRadius: 20,
  },
  input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      width: 200,
  },
  button: {
      backgroundColor: '#788eec',
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      width: 100,
  },
  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },
  footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  }
});

export default LoginView;