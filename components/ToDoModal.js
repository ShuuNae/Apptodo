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
  Modal,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dimensions, {windowWidth, windowHeight} from '../utils/Dimensions';
import EditListModal from './EditListModal';

export default class ToDoModal extends Component {
  state = {
    newToDo: '',
    todoEditable: false,
    ToDoEdit: '',
    modalIndex: '',
    ListEditVisible: false,
  };

  toggleToDoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  toggleTodoEditable() {
    this.setState({todoEditable: !this.state.todoEditable});
  }
  toggleListEditVisible() {
    this.setState({ListEditVisible: !this.state.ListEditVisible});
  }

  addToDo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newToDo)) {
      if (!this.state.newToDo.trim()) {
        alert('Please enter something!');
      } else {
        list.todos.push({title: this.state.newToDo, completed: false});

        this.props.updateList(list);
      }
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
    if (!list.todos.some((todo) => todo.title === text)) {
      if (!text.trim()) {
        alert('Please enter something!');
      } else {
        list.todos[index].title = text;
        this.props.updateList(list);
        this.toggleTodoEditable();
      }
    } else {
      alert(text + ' is already exists!');
    }
    // this.setState({ToDoEdit: ''});
    this.setState({modalIndex: ''});
    Keyboard.dismiss();
  };
  deleteList = () => {
    let list = this.props.list;
    this.props.deleteList(list);
  };

  alertDelete = (type, index) => {
    Alert.alert(
      'Delete',
      'Do you want to delete this ' + type + ' ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            if (type == 'todo') {
              this.deleteTodo(index);
            } else if (type == 'list') {
              this.deleteList();
            }
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],

      {cancelable: false},
    );
  };

  renderToDo = (todo, index) => {
    return (
      <View style={styles.ToDoContainer}>
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
            numberOfLines={3}
            style={[
              styles.todos,
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
            onPress={() => this.alertDelete('todo', index)}>
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
    // console.log('ID list: ' + list.id);

    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <Modal
          visible={this.state.todoEditable}
          transparent={true}
          position="center">
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
              justifyContent: 'center',
            }}>
            <KeyboardAvoidingView style={styles.editTodoModal}>
              <Text
                style={{fontSize: 25, alignSelf: 'center', marginBottom: 5}}>
                Edit your todo
              </Text>
              <View>
                <TextInput
                  style={styles.inputEdit}
                  onChangeText={(text) => this.setState({ToDoEdit: text})}
                  value={this.state.ToDoEdit}
                  maxLength={20}
                />
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={styles.editModalButton}
                  onPress={() =>
                    this.editTodo(this.state.modalIndex, this.state.ToDoEdit)
                  }>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editModalButton}
                  onPress={() => this.toggleTodoEditable()}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        <Modal
          visible={this.state.ListEditVisible}
          transparent={true}
          position="center">
          <EditListModal
            list={list}
            closeListModal={() => this.toggleListEditVisible()}
            updateList={this.props.updateList}
          />
        </Modal>

        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{position: 'absolute', top: 32, right: 32, zIndex: 10}}
            onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color={'#000000'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{position: 'absolute', top: 32, right: 52, zIndex: 10}}
            onPress={() => this.alertDelete('list')}>
            <FontAwesome
              name={'trash'}
              size={24}
              style={{width: 32}}
              color={'#000000'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{position: 'absolute', top: 32, right: 82, zIndex: 10}}
            onPress={() => this.toggleListEditVisible()}>
            <FontAwesome
              name={'pencil'}
              size={24}
              style={{width: 32}}
              color={'#000000'}
            />
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
                paddingHorizontal: 24,
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
              maxLength={20}
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
    fontSize: 16,
    fontWeight: '700',
  },
  editTodoModal: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 50,
    borderRadius: 10,
    shadowRadius: 10,
    flexDirection: 'column',
    width: windowWidth - 50,
    height: 200,
    marginLeft: 25,
  },
  inputEdit: {
    fontSize: 18,
    height: 48,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  editModalButton: {
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a8dff',
    height: windowHeight / 15,
    width: windowWidth / 3.5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Montserrat',
  },
});
