import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const addInformation = async (userId:string, information: any) =>{
    const ref = firestore().collection('users').doc(userId);
    await ref.set(
        information
    );
};
export const updateInformationFirebase = async (userId:string, information: any) =>{
    const ref = firestore().collection('users').doc(userId);
    await ref.update(
        information
    );
};

export const createStorageReferenceToFile = ( pathFireStore: string )=>{
    return  storage().ref( pathFireStore );
}