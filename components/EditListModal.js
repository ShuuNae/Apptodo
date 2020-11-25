import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Dimensions, {windowWidth, windowHeight} from '../utils/Dimensions';

export default class EditListModal extends Component {
  state = {
    ListEdit: this.props.list.name,
  };
  editList = (text) => {
    let list = this.props.list;
    // console.log("list "+list.name);
    // console.log(text);
    if (!(list.name === text)) {
      if (!text.trim()) {
        alert('Please enter something!');
      } else {
        list.name = text;

        this.props.updateList(list);
        this.props.closeListModal();
        this.setState({ListEdit: ''});
      }
    } else {
      alert(text + ' is already exists!');
    }

    Keyboard.dismiss();
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          justifyContent: 'center',
        }}>
        <KeyboardAvoidingView style={styles.editTodoModal}>
          <Text style={{fontSize: 25, alignSelf: 'center', marginBottom: 5}}>
            Edit your list
          </Text>
          <View>
            <TextInput
              style={styles.inputEdit}
              onChangeText={(text) => this.setState({ListEdit: text})}
              value={this.state.ListEdit}
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
              onPress={() => this.editList(this.state.ListEdit)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editModalButton}
              onPress={this.props.closeListModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  inputEdit: {
    fontSize: 18,
    height: 48,
    borderWidth: 2,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
});
