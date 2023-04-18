import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, Text, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import User from '../../model/User';
import { shuffleArray } from '../../utils/math';
import { useSelector } from 'react-redux';

const TrainerList = (props: any) => {
    const [isLoading, setisLoading] = useState(true);
    const [listUsers, setListUser] = useState<User[]>([]);
      const currentUser = useSelector((state:any)=>state.currentUser);
      const onViewTrainer = (id: string, name: string, image: string, favoritepokemon: string) => {

        props.navigation.navigate('DetailTrainer', {
          id: id,
          name: name,
          image: image,
          favoritepokemon:favoritepokemon
        });
      };
    useEffect(() => {
        getUser();
    }, []);
    const getUser = () => {
        firestore().collection('users')
            .limit(100)
            .get()
            .then(querySnapshot => {
                let listUser: User[] = [];
                querySnapshot.forEach(doc => {
                    //@ts-ignore
                    listUser.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                listUser = listUser.filter((user:User ) => user.id !== currentUser.userId);
                setListUser(shuffleArray(listUser));
                setisLoading(false);
            })
    }
    return (
        <View>
            {
                isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={listUsers}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return <TrainerItem trainer={item} onViewTrainer={onViewTrainer} />;
                        }}
                    />
                )
            }

        </View>
    );
};

const TrainerItem = (props: any) => {
    const { trainer, onViewTrainer } = props;

    return (
        <View>
            <TouchableOpacity style={styles.main_container} onPress={()=>onViewTrainer(trainer.id,trainer.name,trainer.image,trainer.favoritepokemon)}>
                <Image source={{ uri: trainer.image }} style={styles.image} />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>name: {trainer.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.level_text}>favoritepokemon: {trainer.favoritepokemon}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        margin: 5,
        borderRadius: 60
    },
    divider_pokemon: {
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1
    },
    level_text: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#666666'
    }
});

export default TrainerList;
