import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToDoList from '../components/ToDoList';
import AddListModal from '../components/AddListModal';
import {windowHeight, WindowWidth} from '../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends Component {
  static contextType = AuthContext;

  state = {
    addTodoVisible: false,
    lists: [],
  };

  componentDidMount() {
    const {user} = this.context;
    this.subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('lists')
      .onSnapshot((snapshot) => {
        let lists = [];
        snapshot.forEach((doc) => {
          lists.push({id: doc.id, ...doc.data()});
        });
        this.setState({lists});
        // console.log(lists);
      });
  }
  componentWillUnmount() {
    this.subscriber();
  }

  toggleAddTodoModal() {
    this.setState({addTodoVisible: !this.state.addTodoVisible});
  }

  renderList = (list) => {
    return (
      <ToDoList
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };

  addList = (list) => {
    const {user} = this.context;
    firestore().collection('users').doc(user.uid).collection('lists').add({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    const {user} = this.context;
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('lists')
      .doc(list.id)
      .update(list);
  };
  deleteList = (list) => {
    const {user} = this.context;
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('lists')
      .doc(list.id)
      .delete();
  };

  render() {
    const {user} = this.context;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>
            Todo
            <Text style={styles.textTitle}> List </Text>
          </Text>
        </View>
        <View style={{marginVertical: 36}}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={'#af2727'} />
          </TouchableOpacity>

          <Text style={styles.addListText}>Add List</Text>
        </View>

        <View style={{height: windowHeight / 2.5, paddingLeft: 10}}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

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
    fontWeight: '900',
    color: '#00ff80',
  },
  textTitle: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#28CCCC',
    fontWeight: '300',
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
  },
});
