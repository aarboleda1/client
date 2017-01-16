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
} from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

import Router from '../navigation/Router';
import Colors from '../constants/Colors';

import RestrictionSelectionEntry from '../components/RestrictionSelectionEntry';

import { connect } from 'react-redux';

import {
  setSearchCuisine,
  toggleSearchRestriction,
} from '../actions/searchActions';

import { serverURI } from '../config';
import Panel from '../components/Panel';
import SquareSelection from '../components/SquareRestrictions';

// ************ Begin Styling **************
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: 'italian'
    }
  }

  componentWillMount() {

    //FIXME: Replace this after MobX/Redux is implemented
    // if (!this.props.route.params.viewed) {
    //   this.props.navigator.push('searchResults');
    //   this.props.navigator.updateCurrentRouteParams({
    //     viewed: true,
    //   });
    // }
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
    /*
    REDUX: GET request for results
    display loading thing while waiting
    store data in redux
    reroute to search results
    */
    let dispatch = this.props.dispatch;
    var searchParams = new URLSearchParams();
    searchParams.append('cuisine', this.props.search.cuisine);
    searchParams.append('location', this.props.search.location);

    let restrictions = [];
    let searchRestrictions = this.props.search.restrictions;
    for(let key in searchRestrictions) {
      if (searchRestrictions[key]) {
        restrictions.push(key);
      }
    }
    searchParams.append('restrictions', restrictions);

    alert(`${serverURI}/chefs?${searchParams.toString()}`);

    fetch(`${serverURI}/chefs?${searchParams.toString()}`)
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
      }).catch(function(err) {
        alert(err);
      });

    // this.props.navigator.push('searchResults', {listings: data}); //add query string when implementing search
  }

  render() {
    const context = this;
    return (
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
            <RestrictionSelectionEntry name="Asian" />
            <RestrictionSelectionEntry name="Italian" />
            <RestrictionSelectionEntry name="Spanish" />
            <RestrictionSelectionEntry name="Mediterranean" />
            <RestrictionSelectionEntry name="Pastry" />
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
          Location: {this.props.search.location || 'not currently set'}
        </Text>
         
         <TouchableHighlight
         style={styles.touchHighlight}
         onPress={this._chooseLocation.bind(this)}
         >
          <Text style={styles.touchHighlightText}>
            Set Location
          </Text>
        </TouchableHighlight>

        {this.state.location ?
          <Text style={styles.location}>{this.state.location}</Text> : null}

        <Button
          style={styles.button}
          // color='red'
          onPress={this._search.bind(this)}
          title="Search"
        >
        </Button>
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
    margin: 20,
    height: WINDOW_HEIGHT / 12,
    width: WINDOW_WIDTH / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // flexDirection: 'column',
  },
  touchHighlightText: {
    color: '#FAFAFA',
    // flex: 1,
    fontSize: 21,
    fontWeight: '500',
  },
  square: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 1,
  },
  location: {
    fontSize: 20,
    alignSelf: 'center'
  },
  button: {
  }
});


function mapStateToProps(state, ownProps) {
  return {
    search: state.search,
  }
}

export default connect(mapStateToProps)(SearchScreen);
