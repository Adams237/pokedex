import React,{useState} from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const SingupView = (props:any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSingupPress = ()=>{
    auth()
    .createUserWithEmailAndPassword(email,password)
    .then(()=>{
      console.log('utilisateur créer');
      props.navigation.navigate('Home')
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
  };

  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../../assets/pikachu.jpg')}
        />
        <Text style={styles.textIntroduction}>Devenez le meilleur dresseur de Pokémon !</Text>
        <Text style={styles.textSingup}>Créer votre compte</Text>
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
            onPress={() => onSingupPress()}>
            <Text style={styles.buttonTitle}>Singp</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
            <Text style={styles.footerText}>Déjà un compte? <Text onPress={() => props.navigation.navigate('Login')} style={styles.footerLink}>Se connecter</Text></Text>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  },
  textSingup:{
    backgroundColor: 'green',
    color:'white',
    padding:15,
    borderRadius:20,
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

export default SingupView;
