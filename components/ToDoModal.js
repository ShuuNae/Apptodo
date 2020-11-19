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
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormButton from '../components/FormButtons';

export default class ToDoModal extends Component {
  state = {
    newToDo: '',
    todoEditable: false,
    ToDoEdit: '',
    modalIndex: '',
  };

  toggleToDoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    console.log(index);

    this.props.updateList(list);
  };

  toggleTodoEditable() {
    this.setState({todoEditable: !this.state.todoEditable});
  }

  addToDo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newToDo)) {
      list.todos.push({title: this.state.newToDo, completed: false});

      this.props.updateList(list);
    } else {
      alert(this.state.newToDo + ' is already exists!');
    }

    this.setState({newToDo: ''});

    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  editTodo = (index, text) => {
    let list = this.props.list;
    list.todos[index].title = text;

    this.props.updateList(list);
    this.setState({ToDoEdit: ''});
    this.setState({modalIndex: ''});
    Keyboard.dismiss();
    this.toggleTodoEditable();
  };
  renderToDo = (todo, index) => {
    return (
      <View style={styles.ToDoContainer}>
        <Modal transparent={true} visible={this.state.todoEditable}>
          <View style={{backgroundColor: '#000000aa', flex: 2}}>
            <KeyboardAvoidingView style={styles.editTodoModal}>
              <Text style={{fontSize: 25, alignSelf: 'center'}}>
                Edit your todo
              </Text>
              <View>
                <TextInput
                  style={styles.inputEdit}
                  onChangeText={(text) => this.setState({ToDoEdit: text})}
                  value={this.state.ToDoEdit}
                />
              </View>

              <View style={{flexDirection: 'row'}}>
                <FormButton
                  buttonTitle="Save"
                  onPress={() =>
                    this.editTodo(this.state.modalIndex, this.state.ToDoEdit)
                  }
                />
                <FormButton
                  buttonTitle="Cancel"
                  onPress={() => this.toggleTodoEditable()}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.toggleToDoCompleted(index)}>
            <FontAwesome
              name={todo.completed ? 'check-square-o' : 'square-o'}
              size={24}
              color={'#5b5b5b'}
              style={{width: 32}}
            />
          </TouchableOpacity>

          <Text
            // editable={this.state.todoEditable}
            // onChangeText={(text) => this.editTodo(index, text)}
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
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                ToDoEdit: this.props.list.todos[index].title,
                modalIndex: index,
              });
              this.toggleTodoEditable();
            }}>
            <FontAwesome
              name={'pencil'}
              size={24}
              style={{width: 32}}
              color={this.props.list.color}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => this.deleteTodo(index)}>
            <FontAwesome
              name={'trash'}
              size={24}
              style={{width: 32}}
              color={this.props.list.color}
            />
          </TouchableOpacity>
        </View>
      </View>
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
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
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
    justifyContent: 'space-between',
  },
  todos: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  editTodoModal: {
    backgroundColor: '#ffffff',
    margin: 50,
    marginBottom: 200,
    padding: 40,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
  },
  inputEdit: {
    fontSize: 18,
    height: 48,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
});
