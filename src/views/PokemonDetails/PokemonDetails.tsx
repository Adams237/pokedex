import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { Card } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { removePokemon } from '../../store/redurcer/pokemonSlice';

const PokemonDetails = (props: any) => {
  const [weight, setWeight] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [arrayTypes, setArrayTypes] = useState([]);
  const dispatch = useDispatch();
  const { id, name, src, isReleasePosible } = props.route.params;
  useEffect(() => {
    fetchPokemondetail(id);
  }, [id]);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchPokemondetail = (id: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        setHeight(json.height);
        setWeight(json.weight);

        setArrayTypes(json.types.map((item: any) => {
          return item.type.name;
        }));

      })
      .catch(err => console.log(err));
  };


  return (
    <View>
      <Card>
        <Card.Title>{name}</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: src }} style={styles.imagePokemon} />
        </View>
        <View style={styles.details_containair}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text>weight: {weight}</Text>
            <Text>height: {height}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text>Types:
              {
                arrayTypes.length !== 0 && (
                  arrayTypes.map((item, index) => {
                    return <Text key={index} >{item}</Text>;
                  })
                )
              }
            </Text>
          </View>
        </View>
        { isReleasePosible && <Button title='Relacher le pokemon' onPress={ ()=>dispatch(removePokemon(props.route.params))} /> }
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

export default PokemonDetails;
