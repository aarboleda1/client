import React, { Component } from 'React';
import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
} from 'react-native';

import { serverURI } from '../config';

import {
  setMapContext,
} from '../actions/mapContextActions';

import { connect } from 'react-redux';

class ChefActionsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Chef Actions',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],
      restrictions: [],
      dishes: [],
    };
  }

  toggleState(key) {
    let update = {};
    update[key] = !this.state[key];
    this.setState(update);
  }

  componentWillMount() {
    let context = this;
    console.log(`GET TO ${serverURI}/chefs/userId/${this.props.currentUser}`);
    fetch(`${serverURI}/chefs/userId/${this.props.currentUser}`)
      .then(function(resp) {
        let contentType = resp.headers.map['content-type'];
        if(contentType && contentType === "application/json; charset=utf-8") {
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
          dishes: chefData.dishes || context.state.dishes,
          loading: false,
        });
      })
      .catch(function(err) {
        alert(err);
      });
  }

  addLocation() {
    this.props.dispatch(setMapContext('chefActions'));
    this.props.navigator.push('chooseLocation');
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
          onPress={this.toggleState.bind(this, 'showLocationsModal')}
        />

        {/* Add buttons for toggling restrictions */}
        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Restrictions:</Text>
        {this.state.restrictions.map((restriction, index) =>
          <Text key={index}>{restriction}</Text>
        )}
        <Button
          title="Edit Restrictions"
          onPress={this.toggleState.bind(this, 'showRestrictionsModal')}
        />

        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Dishes:</Text>
        {this.state.dishes.map((dish, index) =>
          <Text key={index}>{dish.name}</Text>
        )}
        <Button
          title="Edit Dishes"
          onPress={this.toggleState.bind(this, 'showDishesModal')}
        />
        <Button
          title="Save Chef Profile"
          onPress={()=>alert('Under Construction')}
        />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={!!this.state.showLocationsModal}>
          <ScrollView style={[styles.textPadding, styles.modal]}>
            <Text>Locations Modal</Text>
            {this.state.locations.map((location, index) =>
              <Text key={index}>{location}</Text>
            )}
            <Button
              title="Add Location"
              onPress={this.addLocation.bind(this)}
              />
            <Button
              title="Close"
              onPress={this.toggleState.bind(this, 'showLocationsModal')}
              />
          </ScrollView>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={!!this.state.showRestrictionsModal}>
          <ScrollView style={[styles.textPadding, styles.modal]}>
            <Text>Restrictions Modal</Text>
            {this.state.restrictions.map((restriction, index) =>
              <Text key={index}>{restriction}</Text>
            )}
            <Button
              title="Close"
              onPress={this.toggleState.bind(this, 'showRestrictionsModal')}
              />
          </ScrollView>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={!!this.state.showDishesModal}>
          <ScrollView style={[styles.textPadding, styles.modal]}>
            <Text>Dishes Modal</Text>
            {this.state.dishes.map((dish, index) =>
              <Text key={index}>{dish}</Text>
            )}
            <Button
              title="Close"
              onPress={this.toggleState.bind(this, 'showDishesModal')}
              />
          </ScrollView>
        </Modal>
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
  modal: {
    paddingTop: 15,
  },
});

function mapStateToProps({currentChef, currentUser}) {
  return {
    currentChef,
    currentUser,
  }
}

export default connect(mapStateToProps)(ChefActionsScreen);
