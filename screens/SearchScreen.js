import React from 'react';
import {
  Button,
  Dimensions,
  Picker,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@exponent/vector-icons';
import Router from '../navigation/Router';
import Colors from '../constants/Colors';
import CuisineSelectionEntry from '../components/CuisineSelectionEntry';
import {
  setSearchCuisine,
  toggleSearchRestriction,
} from '../actions/searchActions';

import {
  setMapContext,
} from '../actions/mapContextActions';


import { serverURI } from '../config';
import Panel from '../components/Panel';
import SquareSelection from '../components/SquareRestrictions';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

import qs from 'qs';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Set Location',
      cuisine: 'american',
    }
  }
  static route = {
    navigationBar: {
      title: 'Chef Search',
    },
  }

  _chooseLocation() {
    this.props.dispatch(setMapContext('search'));
    this.props.navigator.push('chooseLocation');
  }

  _verifySearchForm() {
    if (!this.props.search.cuisine) {
      Alert.alert(
        'You must specify a cuisine type',
        '',
        [{text: 'Ok'}]
      );
      return false;
    }

    if (!this.props.search.location) {
      Alert.alert(
        'You must specify a location',
        '',
        [{text: 'Ok'}]
      );
      return false;
    }

    return true;
  }

  _search() {
    if(!this._verifySearchForm.call(this)) {
      return;
    }

    let dispatch = this.props.dispatch;
    let searchParams = {
      cuisine: this.props.search.cuisine,
      location: this.props.search.location,
    };

    let queryRestrictions = [];

    let searchRestrictions = this.props.search.restrictions;
    for(let key in searchRestrictions) {
      if (searchRestrictions[key]) {
        queryRestrictions.push(key);
      }
    }
    searchParams.restrictions = queryRestrictions;

    let context = this;
    this.setState({loading: true}, function() {
      fetch(`${serverURI}/chefs?${qs.stringify(searchParams)}`, {
        headers: {
          'User-Id': context.props.currentUser,
        }
      })
        .then(function(resp) {
          if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
            return resp.json();
          } else {
            return resp.text().then(function(message) {
              throw new Error(message);
            });
          }
        })
        .then(function(listings) {
          context.props.navigator.push('searchResults', { listings });
          context.setState({loading: false});
        })
        .catch(function(err) {
          alert(err);
        });
    });
  }

  render() {
    const context = this;
    return (this.state.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large"/>
        </View>
      ) :
      <ScrollView
        style={styles.container}
        contentContainerStyle={[this.props.route.getContentContainerStyle()]}>
        <Text style={styles.text}>Order Specification </Text>

        <Panel title="Select Cuisine Type"
          selectedValue={this.state.cuisine}
          onValueChange={(type) => {
            this.setState({ cuisine: type });
            return context.props.dispatch(setSearchCuisine(type));
          }}>
            <CuisineSelectionEntry name="American" />
            <CuisineSelectionEntry name="Chinese" />
            <CuisineSelectionEntry name="French" />
            <CuisineSelectionEntry name="Italian" />
            <CuisineSelectionEntry name="Japanese" />
            <CuisineSelectionEntry name="Korean" />
            <CuisineSelectionEntry name="Mexican" />
        </Panel>

        <Panel title="Select Restrictions">
          <Text style={{fontSize : 20}}>Allergens</Text>
            <View style={styles.square}>
              <SquareSelection name="Dairy"  />
              <SquareSelection name="Eggs" />
              <SquareSelection name="Peanuts" />
              <SquareSelection name="Tree Nuts" />
              <SquareSelection name="Gluten" />
              <SquareSelection name="Soy" />
              <SquareSelection name="Seafood" />
              <SquareSelection name="Shellfish" />
            </View>
          <Text style={{fontSize : 20, paddingTop: 10}}>Food</Text>
            <View style={styles.square}>
              <SquareSelection name="Halal" />
              <SquareSelection name="Kosher" />
              <SquareSelection name="Vegetarian" />
              <SquareSelection name="Vegan" />
            </View>
        </Panel>

        <Text style={styles.location}>
          Location: {this.props.search.location || 'not set'}
        </Text>         
         {!this.props.search.location ? 
         <TouchableHighlight
         style={styles.touchHighlight}
         onPress={this._chooseLocation.bind(this)}
         >
          <Text style={styles.touchHighlightText}>
            Set Location
          </Text>
        </TouchableHighlight>
        :
         <TouchableHighlight
         style={styles.touchHighlight}
         onPress={this._chooseLocation.bind(this)}
         >
          <Text style={styles.touchHighlightText}>
            Edit Location
          </Text>
        </TouchableHighlight>
        }

        {this.state.location ?
          <Text style={styles.location}>{this.state.location}</Text> : null}
        
         {this.props.search.location ?  
        <TouchableHighlight
         style={styles.button}
         onPress={this._search.bind(this)}
         >
          <Text style={styles.touchHighlightText}>
            Search
          </Text>
        </TouchableHighlight>
        : null}

      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#e7e7e6',
    paddingTop      : 30,
  },
  text: {
    fontSize: 25,
    paddingLeft: 13,
    color: 'black',
    fontWeight: '600',
  },
  touchHighlight: {
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor: '#4b3832',
    margin: 10,
    height: WINDOW_HEIGHT / 12,
    width: WINDOW_WIDTH / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  touchHighlightText: {
    color: '#FAFAFA',
    fontSize: 21,
    fontWeight: '500',
  },
  square: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 1,
  },
  location: {
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor: '#201d3e',
    margin: 10,
    marginLeft: 15,
    height: WINDOW_HEIGHT / 12,
    width: WINDOW_WIDTH / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  return {
    search: state.search,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(SearchScreen);
