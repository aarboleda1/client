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
  ActivityIndicator,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from '../navigation/Router';
import Colors from '../constants/Colors';

import RestrictionSelectionEntryList from '../components/RestrictionSelectionEntryList';

import { connect } from 'react-redux';

import {
  setSearchCuisine,
  toggleSearchRestriction,
} from '../actions/searchActions';

import {
  setMapContext,
} from '../actions/mapContextActions';

import { serverURI } from '../config';

import qs from 'qs';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: 'american'
    }
  }
  static route = {
    navigationBar: {
      title: 'Search',
    },
  }

  _chooseLocation() {
    this.props.dispatch(setMapContext('search'));
    this.props.navigator.push('chooseLocation');
  }

  _search() {
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

    console.log(`GET to ${serverURI}/chefs?${qs.stringify(searchParams)}`);

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
    const {height, width} = Dimensions.get('window'); //This must be in the render function to adjust to device rotation

    const dynamicStyles = StyleSheet.create({
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
    });
    // console.log(this.state.location);

    const context = this;
    return (this.state.loading ? <ActivityIndicator size="large" style={styles.loading}/> :
      <ScrollView
        style={styles.container}
        contentContainerStyle={[this.props.route.getContentContainerStyle()]}>

        <Picker
          selectedValue={this.state.cuisine}
          onValueChange={(type) => {
            this.setState({ cuisine: type });
            return context.props.dispatch(setSearchCuisine(type));
          }}
          style={styles.cuisine}>
           <Picker.Item label="American" value="american" />
           <Picker.Item label="Chinese" value="chinese" />
           <Picker.Item label="French" value="french" />
           <Picker.Item label="Italian" value="italian" />
           <Picker.Item label="Japanese" value="japanese" />
           <Picker.Item label="Korean" value="korean" />
           <Picker.Item label="Mexican" value="mexican" />
        </Picker>

        <RestrictionSelectionEntryList />

        <Button
          onPress={this._chooseLocation.bind(this)}
          title="Set Location"
        />
        <Text style={styles.location}>
          {this.props.search.location || 'Location not set'}
        </Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  cuisine: {
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    textAlign: 'center',
  },
  loading: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    search: state.search,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(SearchScreen);
