import { Button } from '@rneui/base';
import { Card } from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';

import User from '../../model/User';
import { useSelector } from 'react-redux';
import { addInformation } from '../../utils/updateBd';

const PresentationView = (props:any) => {
    const [values, setValue] = useState({ });
    const [error, setError] = useState('');
    const currentUser = useSelector((state: any) => state.currentUser);
    const handleSubmit = () => {
        console.log('Submited');
        console.log('Values:', values);
        if(!values.name || !values.favoritePokemon || !values.age){
            return setError('Veillez remplir tous les champs');
        }
        else{
            console.log('Valuse validated');
            saveDataInFirebase(values);
        }
    };
    const saveDataInFirebase = (values:any)=>{
        const user: User = {
            name: values.name,
            age: Number(values.age),
            image: '',
            favoritepokemon: values.favoritePokemon,
            id: currentUser.userId
        };
        addInformation(currentUser.userId, user)
            .then(()=>{
                console.log('upadted succeful');
                props.navigation.navigate('Home');
            })
            .catch(err=>{
                console.log(err);
            });
    }
    return (
        <View>
            <Card>
                <Card.Title>Presentation Form</Card.Title>
                <Text style={styles.error_style}>{ error }</Text>
                <Form onButtonPress={handleSubmit} buttonText='Next' buttonStyle={{ backgroundColor:'green' }}>
                    <FormItem
                        label='name'
                        isRequired
                        value={values.name}
                        onChangeText={(name) => setValue({ ...values, name })}
                        asterik
                        placeholder='entrer votre nom'
                    />
                    <FormItem
                        label='Pokemon favorie'
                        value={values.favoritePokemon}
                        onChangeText={(favoritePokemon) => setValue({ ...values, favoritePokemon})}
                        placeholder='entrer le nom de votre pokemon favorit'
                    />
                    <FormItem
                        label='age'
                        value={values.age}
                        isRequired
                        onChangeText={(age) => setValue({ ...values, age })}
                        asterik
                        placeholder='entrer votre age'
                    />
                </Form>
            </Card>
        </View>
    );
};
const styles = StyleSheet.create({
    button_container: {
        margin: 5,
    },
    error_style:{
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default PresentationView;
