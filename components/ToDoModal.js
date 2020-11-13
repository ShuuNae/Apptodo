import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class ToDoModal extends Component {
  state = {
    newToDo: '',
  };

  toggleToDoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addToDo = () => {
    let list = this.props.list;
    list.todos.push({title: this.state.newToDo, completed: false});

    this.props.updateList(list);
    this.setState({newToDo: ''});

    Keyboard.dismiss();
  };
  // style={{flexDirection: 'row'}}

  renderToDo = (todo, index) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
        <View style={styles.ToDoContainer}>
          <TouchableOpacity onPress={() => this.toggleToDoCompleted(index)}>
            <FontAwesome
              name={todo.completed ? 'check-square-o' : 'square-o'}
              size={24}
              color={'#5b5b5b'}
              style={{width: 32}}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.todo,
              {
                textDecorationLine: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#b8b8b8' : this.props.list.color,
              },
            ]}>
            {todo.title}
          </Text>
        </View>
      </Swipeable>
    );
  };

  rightActions = (dragX, index) => {
    return (
      <TouchableOpacity>
        <Animated.View>
          <Animated.Text>Delete</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{position: 'absolute', top: 32, right: 32, zIndex: 10}}
            onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color={'#000000'} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              {borderBottomColor: list.color},
            ]}>
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks completed
              </Text>
            </View>
          </View>

          <View style={[styles.section, {flex: 3}]}>
            <FlatList
              data={list.todos}
              renderItem={({item, index}) => this.renderToDo(item, index)}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, {borderColor: list.color}]}
              onChangeText={(text) => this.setState({newToDo: text})}
              value={this.state.newToDo}
            />
            <TouchableOpacity
              style={[styles.addToDo, {backgroundColor: list.color}]}
              onPress={() => this.addToDo()}>
              <AntDesign name="plus" size={16} color={'#ffff'} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000000',
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: '#5b5b5b',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addToDo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ToDoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todos: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
