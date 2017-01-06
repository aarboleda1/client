import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Picker,
  Dimensions,
  Button,
  Text,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from '../navigation/Router';

import Colors from '../constants/Colors';
import MultipleSelection from '../components/MultipleSelection';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: 'italian',
      location: null
    }
  }

  componentWillMount() {

    //FIXME: Replace this after MobX/Redux is implemented
    if (!this.props.route.params.viewed) {
      this.props.navigator.push('searchResults');
      this.props.navigator.updateCurrentRouteParams({
        viewed: true,
      });
    }
  }

  static route = {
    navigationBar: {
      title: 'Search',
    },
  }

  _chooseLocation() {
    this.props.navigator.push('chooseLocation');
  }

  _search() {
    this.props.navigator.push('searchResults', {queryString: null}); //add query string when implementing search
  }

  render() {
    const {height, width} = Dimensions.get('window'); //This must be in the render function to adjust to device rotation

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 15,
      },
      restrictions: {
        width: width * 0.75,
        marginLeft: width * 0.25 / 2,
        marginBottom: 12,
      },
      pricing: {
        width: width * 0.75,
        marginLeft: width * 0.25 / 2,
        marginBottom: 12,
      },
      cuisine: {
        marginBottom: 12,
      },
      location: {
        fontSize: 16,
        textAlign: 'center',
      }
    });

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[this.props.route.getContentContainerStyle(), ]}>

        <Picker
        selectedValue={this.state.cuisine}
        onValueChange={(type) => this.setState({cuisine: type})}
        style={styles.cuisine}>
           <Picker.Item label="Italian" value="italian" />
           <Picker.Item label="Korean" value="korean" />
           <Picker.Item label="Pastry" value="pastry" />
        </Picker>

        <MultipleSelection style={styles.restrictions} options={restrictions}/>
        <MultipleSelection style={styles.pricing} options={pricing}/>

        <Button
          onPress={this._chooseLocation.bind(this)}
          title="Set Location"
        />

        {this.state.location ?
          <Text style={styles.location}>{this.state.location}</Text> : null}

        <Button
          onPress={this._search.bind(this)}
          title="Search"
        >
          <FontAwesome name='search' size={16} color='#FFF' comment='This does not render'/>
        </Button>

      </ScrollView>
    );
  }
}

const pricing = [
  {
    name: '$',
    value: 'low'
  },
  {
    name: '$$',
    value: 'medium'
  },
  {
    name: '$$$',
    value: 'high'
  },
];

const restrictions = [
  {
    name: 'Nut',
    value: 'nut',
  },
  {
    name: 'Dairy',
    value: 'dairy',
  },
  {
    name: 'Kosher',
    value: 'kosher',
  },
  {
    name: 'Vegetarian',
    value: 'vegetarian',
  },
  {
    name: 'Vegan',
    value: 'vegan',
  },
];

