import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {windowHeight,windowWidth} from '../utils/Dimensions';
import ToDoModal from './ToDoModal';

export default ToDoList = ({list}) => {

    const completedCount = list.todos.filter(todo => todo.completed).length;
    const RemainingCount = list.todos.length - completedCount;
    const [showListVisible, setShowListVisible] = useState(false);

    return (
        <View>
            <Modal animationType="slide" visible={showListVisible} onRequestClose= {() => {setShowListVisible(false);}} >
                <ToDoModal list ={list} closeModal={() => {setShowListVisible(false)}} />
            </Modal>
            <TouchableOpacity style={[styles.listContainer,{backgroundColor: list.color }]}
                    onPress={() => {setShowListVisible(!showListVisible);}}
                > 
                <Text style={styles.listTitle} numberOfLines={1} >
                    {list.name}
                </Text>

                <View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.Count}>{RemainingCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <Text style={styles.Count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
       
    );
};


const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,   
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        marginBottom:18,
    },
    Count: {
        fontSize: 48,
        fontWeight: "200",
        color: "white",
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "white",
    }
})