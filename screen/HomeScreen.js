import React, {useContext, useState,Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tempData from '../utils/tempData';
import ToDoList from '../components/ToDoList';
import AddListModal from '../components/AddListModal';
import {windowHeight, WindowWidth} from '../utils/Dimensions';
import SignoutButton from '../components/SignoutButton';

export default class HomeScreen extends Component {

  static contextType = AuthContext;
  render() {
    const {user} =this.context;
    console.log(user.uid);
    return (
      <View style={styles.container}>
      <Modal animationType="slide" visible={false} onRequestClose= {() => {setModalVisible(false);}} >
          <AddListModal closeModal={() => {setModalVisible(false)}} />
      </Modal>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.title}>Todo  
          <Text style={styles.textTitle}> List </Text>
        </Text>
        
      </View>
      <View style={{marginVertical: 36}}>
        <TouchableOpacity style={styles.addList} onPress={() => {setModalVisible(!modalVisible);}} >
          <AntDesign name="plus" size={16} color={"#af2727"} />
        </TouchableOpacity>

        <Text style={styles.addListText} >Add List</Text>
      </View>

      <View style={{height: windowHeight/2.5, paddingLeft: 32}}> 
        <FlatList 
            data = {tempData}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ToDoList list={item} />}
             
        />
      </View>

      <View style={styles.buttonContainer}>
        <SignoutButton
          buttonTitle="Sign out"
        />
      </View>
    
      
    </View>
    )
  }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      title: {
        fontSize: 38,
        fontWeight: "900",
        color: '#00ff80',
      },
      textTitle: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#28CCCC',
        fontWeight: "300",
      },
      addList: {
        borderWidth: 2,
        borderColor: '#27af27',
        borderRadius: 4,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      },
      addListText: {
        color: '#28CCCC',
        fontWeight: '600',
        fontSize: 16,
      },
      buttonContainer: {
        marginTop: 5,
      }
});
