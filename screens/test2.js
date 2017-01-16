import React from 'react';
import {Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

class Panel extends React.Component{
    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('../Images/Arrowhead-01-128.png'),
            'down'  : require('../Images/Arrowhead-Down-01-128.png')
        };

        this.state = {
            title       : props.title,
            expanded    : true,
            animation   : new Animated.Value(),
        };
    }

    toggle(){
        //Step 1
    let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    let finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
        expanded : !this.state.expanded  //Step 2
    });

    this.state.animation.setValue(initialValue);  //Step 3
    Animated.spring(
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();  //Step 5
        
    }


     _setMaxHeight(event){
        this.setState({
            maxHeight   : 330
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
             <Animated.View style={[styles.container,{height: this.state.animation}]} >
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    {console.log (this.state.minHeight, this.state.maxHeight)}
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: 'white',
        margin:10,
        overflow:'hidden',
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold',
        fontSize: 17,
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default Panel;