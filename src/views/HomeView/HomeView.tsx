import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Pokemon } from '../../model/Pokemon';
import { addPokemon } from '../../store/redurcer/pokemonSlice';
import { shuffleArray } from '../../utils/math';

// import auth from '@react-native-firebase/auth';



const HomeView = (props: any) => {
    /* 
        devoir à faire
        modifier le code pour afficher dès le depart 3 pokemon et lorsqu'on click sur u, les 2 autre disparaissent
    */
    const [counterPokedex, setCounterPokedex] = useState(0);
    const [listPokemon, setListpokemon] = useState<Pokemon[]>(undefined);
    const [isData, setIsData] = useState(false);
    const [arrayPokemonCapture, setArrayCapturePokemon] = useState<Pokemon[]>([]);
    const [userid, setUserId] = useState<String>('');
    const currentUser = useSelector((state: any) => state.currentUser);
    const dispatch = useDispatch();
  
   
    useEffect(()=>{
        if(currentUser.userId){
            setUserId(currentUser.userId);
        }else{
            props.navigation.navigate('Login')
        }
    },[]);
    
    const capturePokemon = () => {
        const currentPokemon = listPokemon[counterPokedex];

        dispatch(addPokemon(currentPokemon));

    };
    const onNext = () => {
        if (counterPokedex === listPokemon.length - 1) {
            setCounterPokedex(0);
        }
        else {
            setCounterPokedex(counterPokedex + 1);
        }
    };
    // console.log(listPokemon);

    const onPrevious = () => {
        if (counterPokedex === 0) {
            setCounterPokedex(listPokemon.length - 1);
        }
        else {
            setCounterPokedex(counterPokedex - 1);
        }
    };



    const onViewpokemon = (idpokemon: string, namePokemon: string, imagePokemon: string) => {
        props.navigation.navigate('Detailpokemon', {
            id: idpokemon,
            name: namePokemon,
            src: imagePokemon,
            isReleasePosible: false
        });
    };


    // const randunNumber = (max: number, min: number)=>{
    //     return Math.floor(Math.random()*)
    // }

    const fetchpokemon = () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // console.log(json.results);
                const newArray = json.results.map((pokemon: any, index: number) => {
                    let indexPokemon = index + 1;
                    pokemon.id = indexPokemon;
                    pokemon.level = Math.floor(Math.random() * 101);
                    pokemon.isMale = true;
                    pokemon.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + indexPokemon + '.png';
                    return pokemon;
                });
                setListpokemon(shuffleArray(newArray));
                setIsData(true);

            })
            .catch(error => console.log(error));
    };
    useEffect(() => {
        fetchpokemon();
    }, []);
    return (
        <View style={styles.main_container}>
            <View style={styles.title_container}>
                <Text style={styles.text_title}> Pokedex App </Text>
                <Text> UserId : {userid} </Text>
            </View>
            {isData ?
                <View style={styles.pokemon_container}>
                    <PokemonInfo id={listPokemon[counterPokedex].id}
                        name={listPokemon[counterPokedex].name}
                        level={listPokemon[counterPokedex].level}
                        isMal={listPokemon[counterPokedex].isMal}
                        src={listPokemon[counterPokedex].src}
                        onClickPokemon={onViewpokemon} />
                </View>
                : <ActivityIndicator size="large" />

            }
            <View style={styles.button_container}>
                <TouchableOpacity style={styles.buttonNextPrevious} onPress={onPrevious}>
                    <Image source={require('../../assets/left.png')} style={styles.iconButton} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNextPrevious} onPress={capturePokemon}>
                    <Image source={require('../../assets/pokeball.png')} style={styles.iconButton} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNextPrevious} onPress={onNext}>
                    <Image source={require('../../assets/rigth.jpg')} style={styles.iconButton} />
                </TouchableOpacity>

            </View>
        </View>
    );
};



const PokemonInfo = ({ id, name, level, isMal, src, onClickPokemon }: Pokemon) => {
    return (
        <>
            <Text>this is a pokemon</Text>


            <TouchableOpacity onPress={() => onClickPokemon(id, name, src)}>
                <Image source={{ uri: src }} style={styles.imagePokemon} />
            </TouchableOpacity>
            <Text>His name is {name}</Text>
            <Text>his level is {level}</Text>
            {
                isMal ? (<Text>This is a mal</Text>) : (<Text> this a female</Text>)
            }
        </>
    );
};


const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    title_container: {
        flex: 1,
        alignItems: 'center'
    },
    pokemon_container: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonNextPrevious: {
        alignItems: 'center',
        borderRadius: 360,
        height: 70,
        justifyContent: 'center',
        width: 70,
        shadowColor: 'rgba(0,0,0,4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 6
    },
    iconButton: {
        width: 40,
        height: 40
    },
    text_title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'rgb(200,0,0)',
        marginTop: 30
    },
    imagePokemon: {
        height: 200,
        width: 200,
    }
});
export default HomeView;
