import React, {useContext, useState} from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import FormButton from '../components/FormButtons';
import FormInput from '../components/FormInputs';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {login} = useContext(AuthContext);

    
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/notebook-logo-design-vector-14543846.jpg')}
                style={styles.logo}
            />
            <Text style={styles.text} >
                To-Do App
            </Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)} 
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)} 
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Sign in"
                onPress={() => login(email,password)}
            />
            <TouchableOpacity 
                style={styles.createAccButton}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText} >Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
      },
      text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      createAccButton: {
        marginVertical: 35,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Montserrat',
      },
});
