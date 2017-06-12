'use-strict';

import React, { Component } from 'react';
import { 
  Container, 
  Content, 
  Body,
  Card,
  CardItem, 
  Text,
  Badge
} from 'native-base';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import axios from 'axios';

var styles = StyleSheet.create({
    separator: {
        height: 1,
        margin: 8,
        backgroundColor: '#dddddd'
    },
    poster: {
        height: 280,
        flex: 1,
        width: null
    }
});

const baseURL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w500";

class DetailMovies extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.movieName
    });
    
    constructor(props){
        super(props);
        this.state = {
            movieID: props.navigation.state.params.movieID,
            movie: {}
        };
    }

    componentWillMount(){
        this.getDetail();
    }

    getDetail(){
        console.log(baseURL+'/movie/'+this.state.movieID+'?');
        axios.get(baseURL+'/movie/'+this.state.movieID+'?', {
            params: {
                api_key: "136451254291f50e7661446b9450ede6",
                language: "en-US"
            }
        })
        .then( response => this.setState({ movie: response.data }) )
        .catch( error => console.log(error) );
    }

    render() {
        return (
        <Container>
            <Content style={{
                    margin: 8
                }}>
                <Image 
                    style={styles.poster}
                    source={{uri: imageURL+this.state.movie.poster_path}}
                />
                <Body>
                    <Text>{this.state.movie.overview}</Text>
                </Body>
                <View style={styles.separator}/>
            </Content>
        </Container>
        );
    }
}

export default DetailMovies;