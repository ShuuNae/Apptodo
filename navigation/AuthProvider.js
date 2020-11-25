import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value = {{
                user,
                setUser,
                login: async(email,password) => {
                    try{
                        if(email != null && password != null){
                            await auth().signInWithEmailAndPassword(email,password)
                        }else{
                            alert('Please enter something!');
                        }
                        
                    }catch(e){
                        console.log(e);
                        alert(e.message);
                        
                    }
                },
                register: async(email,password) => {
                    try{
                        if(email != null && password != null){
                            await auth().createUserWithEmailAndPassword(email,password);
                        }
                        else{
                            alert('Please enter something!');
                        }
                        
                    }catch(e){
                        console.log(e);
                        alert(e.message);
                    }
                },
                logout: async () => {
                    try{
                        await auth().signOut();
                    }catch(e){
                        console.log(e);
                        alert(e.message);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

