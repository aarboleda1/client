import React, { Component } from 'React';
import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';

import { serverURI } from '../config';

import { connect } from 'react-redux';

class ChefActionsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Chef Actions'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],
      restrictions: [],
    };
  }

  componentWillMount() {
    let context = this;
    console.log(`GET TO ${serverURI}/chefs/userId/${this.props.currentUser}`);
    fetch(`${serverURI}/chefs/userId/${this.props.currentUser}`)
      .then(function(resp) {
        if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
          return resp.json();
        } else {
          return resp.text();
        }
      })
      .then(function(chefData) {
        chefData = chefData[0] || {};
        context.setState({
          name: chefData.name || context.state.name,
          imageURL: chefData.imageURL || context.state.imageURL,
          locations: chefData.locations || context.state.locations,
          restrictions: chefData.restrictions || context.state.restrictions,
          loading: false,
        });
      })
      .catch(function(err) {
        alert(err);
      });
  }

  render() {
    return ( this.state.loading ? <ActivityIndicator size="large" style={styles.flex} /> :
      <ScrollView style={styles.textPadding}>
        <TextInput
          onChangeText={()=>{}}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Full Name"
          defaultValue={this.state.name}
        />
        <TextInput
          onChangeText={()=>{}}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Avatar Image URL (Optional)"
          defaultValue={this.state.imageURL}
        />

        {/* Implement some way for the user to edit locations */}
        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Locations:</Text>
        {this.state.locations.map((location, index) =>
          <Text key={index}>{location}</Text>
        )}
        <Button
          title="Edit Locations"
          onPress={()=>alert('Under Construction')}
        />

        {/* Add buttons for toggling restrictions */}
        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Restrictions:</Text>
        {this.state.restrictions.map((restriction, index) =>
          <Text key={index}>{restriction}</Text>
        )}
        <Button
          title="Edit Restrictions"
          onPress={()=>alert('Under Construction')}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  textPadding: {
    padding: 8,
  },
  formInput: {
    flex: 1,
    height: 30,
  },
  textCenter: {
    textAlign: 'center',
  },
  verticalMargins: {
    marginVertical: 8,
  },
});

function mapStateToProps({currentUser}) {
  return {
    currentUser,
  }
}

export default connect(mapStateToProps)(ChefActionsScreen);
