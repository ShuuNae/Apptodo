import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {windowHeight,windowWidth} from '../utils/Dimensions';
import { AuthContext } from '../navigation/AuthProvider';

const SignoutButton = ({buttonTitle }) => {
    const {user, logout} = useContext(AuthContext);
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => logout()} >
            <Text style={styles.buttonText} >{buttonTitle}</Text>
        </TouchableOpacity>

    );
};

export default SignoutButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        width: windowWidth / 3.5,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Montserrat',

    },
});
