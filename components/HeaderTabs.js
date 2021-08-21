import React from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'

import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
align-items: center;
flex-direction: row;
justify-content: space-between;
padding: 25px 50px 0 50px;
width: 100%;
`

const Tab = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: #fff;
`

const HeaderTabs = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <TouchableOpacity activeOpacity={0.5}>
                <Tab>TV Shows</Tab>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <Tab>Movies</Tab>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                navigation.navigate("MyList")
            }}>
                <Tab>My List</Tab>
            </TouchableOpacity>
        </Container>
    )
}

export default HeaderTabs