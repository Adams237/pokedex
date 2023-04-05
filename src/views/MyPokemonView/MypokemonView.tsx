import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, FlatList, Image } from 'react-native';
import { listPokemonOriginal } from '../../datas/PokemonList';
import { useSelector } from 'react-redux';

const MypokemonView = (props: any) => {
  const pokemonCapture = useSelector((state:any)=>state.pokemonCapdured.value);
  const onViewpokemon = (idpokemon: string, namePokemon: string, imagePokemon: string) => {

    props.navigation.navigate('Detailpokemon', {
      id: idpokemon,
      name: namePokemon,
      src: imagePokemon,
      isReleasePosible:true
    });
  };
  return (
    <View>
      <Text>this my list pokemons</Text>
      <FlatList
        data={pokemonCapture}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return <PokemonItem pokemon={item} onClickPokemon={onViewpokemon} />;
        }}
      />
    </View>
  );
};

const PokemonItem = (props: any) => {
  const { pokemon, onClickPokemon } = props;

  return (
    <View>
      <TouchableOpacity style={styles.main_container}
        onPress={() => onClickPokemon(pokemon.id, pokemon.name, pokemon.src)}>
        <Image source={{ uri: pokemon.src }} style={styles.image} />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>name: {pokemon.name}</Text>
          </View>
          <View>
            <Text style={styles.level_text}>level: {pokemon.level}</Text>
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
    width:60,
    height:60,
    margin:5,
    borderRadius:60
  },
  divider_pokemon:{
    height:1,
    width:'86%',
    backgroundColor:'#CED0CE',
    marginLeft:'14%'
  },
  content_container:{
    flex:1,
    margin:5
  },
  header_container:{
    flex:3,
    flexDirection:'row'
  },
  title_text:{
    fontWeight:'bold',
    fontSize:20,
    flex:1
  },
  level_text:{
    fontWeight:'bold',
    fontStyle:'italic',
    fontSize:12,
    color:'#666666'
  }
});

export default MypokemonView;
