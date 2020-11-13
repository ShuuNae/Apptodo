import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class AddListModal extends Component {
  backgroundColors = [
    '#ff1a1a',
    '#ff748c',
    '#ffc04d',
    '#5aff5a',
    '#3333ff',
    '#0000b3',
    '#b300b3',
  ];

  state = {
    name: '',
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    const {name, color} = this.state;

    const list = {name, color};

    this.props.addList(list);

    this.setState({name: ''});
    this.props.closeModal();
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, {backgroundColor: color}]}
          onPress={() => this.setState({color})}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 32, right: 32}}
          onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={'#000000'} />
        </TouchableOpacity>

        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
          <Text style={styles.title}>Create ToDo List</Text>

          <TextInput
            style={styles.input}
            placeholder="List Name"
            onChangeText={(text) => this.setState({name: text})}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, {backgroundColor: this.state.color}]}
            onPress={this.createTodo}>
            <Text style={styles.createText}>Create!</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#009a00',
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#006700',
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
