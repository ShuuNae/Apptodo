import React, {useContext, useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const LogoutScreen = () => {
    const {user, logout} = useContext(AuthContext);
    logout();
    return(
    <View style={styles.container} OnLayout={() => logout()}>
     
    </View>
    );  
};

export default LogoutScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
});
