import firestore from '@react-native-firebase/firestore';

export const addInformation = async (userId:string, information: any) =>{
    const ref = firestore().collection('users').doc(userId);
    await ref.set(
        information
    );
}