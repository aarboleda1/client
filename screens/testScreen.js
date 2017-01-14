import React from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView} from 'react-native';
import { Components } from 'exponent';

import Panel from './test2';  // Step 1

class Panels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    };
  }

  render() {
    return (  //Step 2
      <ScrollView style={styles.container}>
        <Panel title="Cuisine Type">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Panel>
        <Panel title="Restrictions">
          <Text>Lorem ipsum...</Text>
        </Panel>
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
  
});

export default Panels;