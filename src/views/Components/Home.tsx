import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import image  from '../../assets/pikachu.jpg';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

declare const global: { HermesInternal: null | {} };


const Home = () =>  {
    const isDarkMode = useColorScheme() === 'dark';
    const name = 'Pikatsu';
    const level: number = 15;
    const isMal: boolean = true;

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View>
            <Text>this is a pokemon</Text>
            <Text>His name is { name }</Text>
            <Text>his level is { level }</Text>
            {
                isMal ? (<Text>This is a mal</Text>) : (<Text> this a female</Text>)
            }
            {/* <Image  source={require(image)} style={ styles.imagePokemon }/> */}
        </View>
    );
};
const styles = StyleSheet.create({
    imagePokemon:{
        height:200,
        width:200,
    }
});
export default Home;