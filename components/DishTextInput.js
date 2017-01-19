import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

class DishTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: ' Placeholder' };
  }

  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        underlineColorAndroid="rgba(0,0,0,0)"
        maxLength = {60}
        editable={true}
      />
    );
  }
}

export default DishTextInput;