'use-strict';

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { StackNavigator } from "react-navigation";

import ListMovies from './ListMovies';
import DetailMovies from './DetailMovies';

const Stack = StackNavigator({
    Popular: {
        screen: ListMovies,
        navigationOptions: ({navigation}) => ({
            title: 'Popular Movies',
        }),
    },
    Detail: {
        screen: DetailMovies
    }
});

class App extends Component {
    render(){
        return (
            <Stack/>
        );
    }
}

export default App;