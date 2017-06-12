'use-strict';

import React, { Component } from 'react';
import { 
  Container, 
  Content, 
  Body, 
  Text,
  List,
  Card,
  CardItem,
  Button,
  Spinner,
  Badge
} from 'native-base';
import {
  StyleSheet,
  Image,
  View,
  FlatList
} from 'react-native';
import axios from 'axios';

var styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    poster: {
        height: 280,
        flex: 1,
        width: null
    },
    container: {
        margin: 8
    }
});

const baseURL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w500";

class ListMovies extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
            page: 1,
            error: null,
            loading: false,
            refreshing: false
        };
    }

    componentWillMount(){
        this.getPopular(this.state.page);
    }

    getPopular(page){
        this.setState({ loading:true });
        axios.get(baseURL+'/movie/popular?', {
            params: {
                api_key: "136451254291f50e7661446b9450ede6",
                language: "en-US",
                page: page
            }
        })
        .then( response => {
            console.log(response);
            this.setState({
             list: page === 1 ? response.data.results : [...this.state.list, ...response.data.results],
             page: page+1,
             loading: false,
             refreshing: false
            }) 
        })
        .catch( error => {
            console.log(error);
            this.setState({
                error: error,
                loading: false,
                refreshing: false
            })
        });
    }

    onClickCard(item){
        this.props.navigation.navigate(
            'Detail', 
            {
                movieID: item.id,
                movieName: item.title
            }
        );
    }

    /*renderItem(item){
            return (<Card>
                <CardItem>
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.release_date}</Text>
                    </Body>
                    <Badge info>
                        <Text>{item.vote_average}</Text>
                    </Badge>
                </CardItem>
                <CardItem>
                    <Image 
                        style={styles.poster}
                        source={{uri: imageURL+item.poster_path}}
                    />
                </CardItem>
                <CardItem>
                    <Text>{item.vote_count} Votes</Text>
                    <View  style={{ flex: 1 }}/>
                    <Button info 
                        onPress={this.onClickCard.bind(this,item)}>
                        <Text> See Detail </Text>
                    </Button>
                </CardItem>
            </Card>);
    }*/
    
    handleRefresh = () => {
        this.setState(
        {
            page: 1,
            refreshing: true
        },
        () => {
            this.getPopular(this.state.page);
        }
        );
    }

    handleLoadMore = () => {
        this.setState(
        {
            page: this.state.page + 1
        },
        () => {
            this.getPopular(this.state.page);
        }
        );
    }

    renderFooter(){
        if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#CED0CE"
                }}>
                <Spinner/>
            </View>
        )
    }

    render() {
        return (
        //<Container>
            //<Content>
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.list}
                        renderItem={({ item }) => 
                            (<Card>
                                <CardItem>
                                    <Body>
                                        <Text>{item.title}</Text>
                                        <Text note>{item.release_date}</Text>
                                    </Body>
                                    <Badge info>
                                        <Text>{item.vote_average}</Text>
                                    </Badge>
                                </CardItem>
                                <CardItem>
                                    <Image 
                                        style={styles.poster}
                                        source={{uri: imageURL+item.poster_path}}
                                    />
                                </CardItem>
                                <CardItem>
                                    <Text>{item.vote_count} Votes</Text>
                                    <View  style={{ flex: 1 }}/>
                                    <Button info 
                                        onPress={this.onClickCard.bind(this,item)}>
                                        <Text> See Detail </Text>
                                    </Button>
                                </CardItem>
                            </Card>)
                        }
                        keyExtractor={item => item.id}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={50}
                    />
                </List>
        //     </Content>
        // </Container>
        );
    }
}

export default ListMovies;