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
import FormButton from '../components/FormButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tempData from '../utils/tempData';
import ToDoList from '../components/ToDoList';
import AddListModal from '../components/AddListModal';
import {windowHeight, WindowWidth} from '../utils/Dimensions';
import SignoutButton from '../components/SignoutButton';
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends Component {
  static contextType = AuthContext;

  state = {
    addTodoVisible: false,
    lists: [],
    // lists2: [],
  };

  componentDidMount() {
    const {user} = this.context;
    // console.log('user uid: ' + user.uid);
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

  toggleAddTodoModal() {
    this.setState({addTodoVisible: !this.state.addTodoVisible});
  }

  renderList = (list) => {
    return <ToDoList list={list} updateList={this.updateList} />;
  };

  addList = (lists) => {
    this.setState({
      lists: [
        ...this.state.lists,
        {...lists, id: this.state.lists.length + 1, todos: []},
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    const {user} = this.context;
    // console.log(user.uid);
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
        <View>
          <Text>{user.uid}</Text>
        </View>
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

        <View style={{height: windowHeight / 2.5, paddingLeft: 32}}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>

        <View style={styles.buttonContainer}>
          <SignoutButton buttonTitle="Sign out" />
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
