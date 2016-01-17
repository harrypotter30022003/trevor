import React from 'react-native';

import Constants from '../Utils/Constants';

var {
  Platform,
  StyleSheet,
  TextInput,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.THEME_DARK_BLUE,
    padding: (Platform.OS === 'ios' ? 15 : 10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: {
    height: (Platform.OS === 'ios' ? 30 : 35),
    fontSize: 14,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 5
  }
});

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.setState({
        text: ''
      });
    }
  }

  changeText(text) {
    this.props.search(text);

    this.setState({
      text: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          onChangeText={this.changeText.bind(this)}
          value={this.state.text}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Enter Search Keywords...'
          placeholderTextColor='#b0b0b0'
          clearButtonMode='always'
          returnKeyType='search' />
      </View>
    );
  }
};
