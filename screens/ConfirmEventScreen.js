import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class ConfirmEventScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Confirm Event',
    }
  }
  constructor(props) {
    super(props);
  }

  doConfirm() {
    const rootNavigator = this.props.navigation.getNavigator('root');
    rootNavigator.navigationContext.performAction(({ tabs, stacks }) => {
      tabs('main').jumpToTab('upcoming');
      stacks('search').popToTop();
    });
  }

  render() {
    context = this;
    function renderDish(dish, context) {
      return (
        <TouchableOpacity key={dish} style={styles.dish}>
          <View style={styles.dish}>
            <Image style={styles.dishImage} source={{ uri: dish.image }}/>
            <View style={styles.dishDetails}>
              <Text>{dish.name}</Text>
              <Text>{dish.text}</Text>
              <Text>${dish.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {
          <View style={styles.dishes}>
            {this.props.dishes.map(function(dish, index) {
              return (
                <View key={index}>
                  {renderDish(dish, context)}
                </View>
              );
            })}
          </View>
        }
        <Button
          title="Confirm"
          onPress={this.doConfirm.bind(this)}
        />
      </ScrollView>
    );
  }
}
const {height, width} = Dimensions.get('window'); //This must be in the render function to adjust to device rotation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {

  },
  dish: {
    flex: 1,
    flexDirection: 'row',
  },
  dishes: {
    flex: 1,
    flexDirection: 'column',
  },
  dishImage: {
    // flex: 1,
    height: width/4,
    width: width/2
  },
});
