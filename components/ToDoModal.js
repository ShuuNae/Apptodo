import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';

export default class ToDoModal extends Component {

    state = {
        name: this.props.list.name,
        color: this.props.list.color,
        todos: this.props.list.todos
    };

    renderToDo = todo => {
        return (
            <View style={styles.ToDoContainer}> 
                <TouchableOpacity>
                    <FontAwesome name={todo.completed ? "check-square-o" : "square-o"} size={24} color={"#5b5b5b"} style={{width: 32}} />
                </TouchableOpacity>
                
                <Text 
                    style={[
                        styles.todo, 
                        { 
                            textDecorationLine: todo.completed ? "line-through" :"none", 
                            color: todo.completed ? "#b8b8b8" : this.state.color
                        }
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    };

    render() {
        const taskCount = this.state.todos.length;
        const completedCount = this.state.todos.filter(todo => todo.completed).length;

        return (
            <SafeAreaView style={styles.container}> 
                <TouchableOpacity 
                style={{position: 'absolute', top: 32, right :32 , zIndex: 10}} 
                onPress={this.props.closeModal}
                 >
                    <AntDesign name="close" size={24} color={"#000000"} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderBottomColor: this.state.color}]}>
                    <View>
                        <Text style={styles.title}>{this.state.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks completed
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, {flex: 3}]}>
                    <FlatList 
                        data={this.state.todos} 
                        renderItem={({item}) => this.renderToDo(item)} 
                        keyExtractor={item => item.title}  
                        contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                        showsVerticalScrollIndicator={false}                   
                        />
                </View>

                <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="padding" >
                    <TextInput style={[styles.input, {borderColor: this.state.color}]} />
                    <TouchableOpacity style={[styles.addToDo, {backgroundColor: this.state.color}]} >
                        <AntDesign name="plus" size={16} color={"#ffff"} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    section: {
        flex: 1,
        alignSelf: "stretch",
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#000000",
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: "#5b5b5b",
        fontWeight: "600",
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 2,
        borderRadius: 6,
        marginRight : 8,
        paddingHorizontal: 8,
    },
    addToDo: {
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent:"center",
    },
    ToDoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    todos: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "600",
    },
});
