// import firestore from '@react-native-firebase/firestore';
// import { AuthContext } from '../navigation/AuthProvider';

// class Firestore {
//     static contextType = AuthContext;

//     getLists() {
//         const {user} =this.context;
//         let ref = firestore().collection('users').doc(user.uid).collection('lists');

//         this.unsubscribe = ref.onSnapshot(snapshot => {
//             lists = [];

//             snapshot.forEach(doc => {
//                 lists.push({ id: doc.id, ...doc.data() });
//             });
//         })
//     }

// }


// export default Firestore;