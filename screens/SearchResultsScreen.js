import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Rating from '../components/Rating';
import ChefListing from '../components/ChefListing';

export default class SearchResultsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Search Results',
    },
  }

  componentWillMount() {
    // make request with this.props.route.params.queryString
    // show loading icon until respon arrives
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[this.props.route.getContentContainerStyle(), styles.scrollViewContainer]}>
        <ChefListing
          img="http://lorempixel.com/192/192/people/1"
          name="Luv2Cook"
          desc="I am the best~!"
          rating="4"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/2"
          name="Biker Group"
          desc="Exercise is good for you"
          rating="5"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/3"
          name="Group"
          desc="*We* are the best~!"
          rating="3"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/4"
          name="A Guy"
          desc="The images aren't consitent to their ids!"
          rating="4"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/5"
          name="Big Bird"
          desc="I'm running out of ideas!"
          rating="1"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/6"
          name="Llama"
          desc="It can't cook"
          rating="2"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/7"
          name="Guy Fierri"
          desc="*I* can't cook"
          rating="1"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/8"
          name="Cat in the Hat"
          desc="I like to rhyme"
          rating="3"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/people/9"
          name="Cake Boss"
          desc="I have a TV show about making cakes."
          rating="5"
        />
        <ChefListing
          img="http://lorempixel.com/192/192/technics"
          name="Spam Account"
          desc="Go to spam.web.site for free stuffs!"
          rating="0"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  chefEntry: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  chefImage: {
    height: 48,
    width: 48,
    marginRight: 6,
    borderRadius: 24,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  rating: {
    flexDirection: 'row',
  },
});
