import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import ToDoModal from './ToDoModal';

export default class ToDoList extends Component {
  state = {
    showListVisible: false,
  };

  toggleListVisible() {
    this.setState({showListVisible: !this.state.showListVisible});
  }

  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const RemainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListVisible()}>
          <ToDoModal
            list={list}
            closeModal={() => this.toggleListVisible()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, {backgroundColor: list.color}]}
          onPress={() => this.toggleListVisible()}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Count}>{RemainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.Count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 18,
  },
  Count: {
    fontSize: 48,
    fontWeight: '200',
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
});
