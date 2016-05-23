import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Icon from 'react-native-vector-icons/FontAwesome';

import Constants from '../Utils/Constants';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';


var styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    backgroundColor: Constants.THEME_DARK_BLUE,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barButtonIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#FFF'
  },
  barButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  }
});

export default class BarButton extends Component {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor="#A53230"
        onPress={this.props.onPress}>
        <View style={styles.buttonWrapper}>
          {this.props.icon ? (
            <Icon style={styles.barButtonIcon} name={this.props.icon} />
          ) : <View />}
          <Text style={styles.barButtonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};