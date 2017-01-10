import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
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
      chefs: [],
      loading: true,
    };
  }

  componentWillMount() {
    let context = this;
    AsyncStorage.getItem('currentUser').then(function(id) {
      fetch(`${serverURI}/chefs`, {
        headers: {
          'User-Id': id,
        }
      }).then(function(resp) {
        if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
          return resp.json();
        } else {
          return resp.text().then(function(message) {
            throw new Error(message);
          });
        }
      }).then(function(chefs) {
        context.setState({chefs});
      }).catch(function(err) {
        debugger;
        alert(err);
      });
    // show loading icon until respon arrives
    });
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
              img={`https://www.gravatar.com/avatar/${chef.md5}?s=256&d=mm&r=g`}
              name={chef.name}
              desc={chef.bio}
              rating={chef.avgRating}
              id={chef.id}
            />
          ))}
          <ChefListing
            img="http://lorempixel.com/192/192/people/1"
            name="Luv2Cook"
            desc="I am the best~!"
            rating="4.5"
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
            rating="3.5"
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
            rating="2.5"
          />
          <ChefListing
            img="http://lorempixel.com/192/192/people/7"
            name="Guy Fierri"
            desc="*I* can't cook"
            rating="1.5"
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
            rating="0.5"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  scrollViewContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
});
