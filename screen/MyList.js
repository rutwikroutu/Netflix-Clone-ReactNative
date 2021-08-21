import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";

const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const MovieScroll = styled.View`
    padding-left: 10px;
    margin: 30px;
    margin-left: 10px;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
`

const MoviePoster = styled.Image`
	width: ${Math.round((Dimensions.get('window').width * 30) / 100)}px;
    height: 200px;
    border-radius: 10px;
`

const MovieCard = styled.View`
	padding-right: 9px;
`

const Warning = styled.Text`
    color: #fff;
    font-family: "Montserrat_400Regular";
    font-size: 23px;
    text-align: center;
`

const WarningButton = styled.TouchableOpacity`
    background-color: #E7442E;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
`

const WarningButtonText = styled.Text`
    color: white;
    font-family: "Montserrat_300Light";
    font-size: 15px;
`

const WarningWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: absolute;
    z-index: 50;
    top: 40%;
`

const MyList = () => {
    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });


    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).collection('myList').onSnapshot(snapshot => {
            setMovies(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    const navigation = useNavigation();

    return fontsLoaded && (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
            {
                movies?.length == 0 && (
                    <WarningWrapper>
                        <Warning>There are no movies in your list.</Warning>
                        <WarningButton activeOpacity={0.5} onPress={() => navigation.navigate("Home")}><WarningButtonText>Browse Movies</WarningButtonText></WarningButton>
                    </WarningWrapper>
                )
            }
            <Container>
                <Header login={true} goBack={navigation.goBack} label="My List" />
                <MovieScroll>
                    {movies?.map((movie, item) => {
                        console.log(movie.banner)
                        return (
                            <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                navigation.navigate("ViewMovie", {
                                    id: movie.movieID,
                                })
                            }}>
                                <MovieCard>
                                    <MoviePoster resizeMode='cover' source={{ uri: movie.banner }} />
                                </MovieCard>
                            </TouchableOpacity>
                        )
                    })}
                </MovieScroll>
            </Container>
        </>
    )
}

export default MyList
