import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import { serverURI } from '../config';

import Rating from '../components/Rating';
import ChefListing from '../components/ChefListing';

export default class SearchResultsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Search Results',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      chefs: this.props.route.params.listings || [],
      loading: true,
    };
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[this.props.route.getContentContainerStyle(), styles.scrollViewContainer]}>
        <View>
          {this.state.chefs.map((chef, index) => (
            <ChefListing
              key={index}
              img={chef.image || chef.md5}
              name={chef.name}
              desc={chef.bio}
              id={chef.id}
            />
          ))}
          {this.state.chefs.length ? null : <Text style={styles.status}>Sorry, there are currently no chefs that match your search</Text>}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e6'
  },
  scrollViewContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  status: {
    fontSize: 15,
    marginLeft: 5,
    color: 'red',
  },
});
