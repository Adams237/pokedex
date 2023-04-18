import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { Card } from '@rneui/themed';
import { useDispatch } from 'react-redux';

const TrainerDetails = (props: any) => {
  const [weight, setWeight] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [arrayTypes, setArrayTypes] = useState([]);
  const dispatch = useDispatch();
  const { id, name, image, favoritepokemon } = props.route.params;
  console.log(props.route.params);
  
//   useEffect(() => {
//     fetchPokemondetail(id);
//   }, [id]);
//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   const fetchPokemondetail = (id: string) => {
//     const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
//     fetch(url)
//       .then(response => response.json())
//       .then(json => {
//         // console.log(json);
//         setHeight(json.height);
//         setWeight(json.weight);

//         setArrayTypes(json.types.map((item: any) => {
//           return item.type.name;
//         }));

//       })
//       .catch(err => console.log(err));
//   };


  return (
    <View>
      <Card>
        <Card.Title>{name}</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: image }} style={styles.imagePokemon} />
        </View>
        <View style={styles.details_containair}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text>favoritepokemon: {favoritepokemon} </Text>
          </View>
        </View>
        <Button title='Créer un chat' onPress={()=>console.log('créer un chat')}/>
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

export default TrainerDetails;
