import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Text, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native'
import styled from 'styled-components/native'

import Header from '../components/Header'
import { auth, db } from '../firebase';

const Container = styled.ScrollView`
	flex: 1;
    background-color: #000;
`


const FormWrapper = styled.View`
    width: 100%;
    justifyContent: center;
    alignItems: center;
    height: 80%;
`

const Form = styled.View`
height: 400px;
    width: 90%;
    background-color: black;
    flex-direction: column;
    border-radius: 20px;
    padding: 20px;
    justify-content: center;
`

const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center
    margin-top: 20px;
    background-color: #E7442E;
`

const Input = styled.TextInput`
    width: 95%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
	font-size: 15px;
	font-weight: bold;
    padding-left: 5px;
    color: white;
`
const SignInText = styled.Text`
font-size: 30px;
font-weight: bold;
color: white;
margin: 10px;
text-align: left;
`

const NewToNetflixTextWrapper = styled.TouchableOpacity`
    width: 100%;
`

const NewToNetflix = styled.Text`
font-size: 15px;
font-weight: 500;
text-align: center;
color: #ccc;
margin: 15px;
text-align: center;
`

const Overlay = styled.View`
    background-color: 'rgba(0,0,0,0.5)';
    flex: 1;
`

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const login = () => {
        setLoading(true);
        if (!email || !password) {
            alert("All fields are mandatory");
            setPassword("");
            setEmail("");
            setLoading(false);
            return;
        }

        auth.signInWithEmailAndPassword(email, password).then(authUser => {
            navigation.replace("BottomStack");
            setPassword('');
            setEmail("");
            console.log(authUser)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            alert(err)
        })
    }

    return (
        <>
            <StatusBar style="light" />
            <Container>
                <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }} resizeMode="cover" style={{ flex: 1, height: Dimensions.get("window").height }}>
                    <Overlay>
                        <Header login={false} />
                        <FormWrapper>
                            <Form>
                                <SignInText>Sign In</SignInText>
                                <Input placeholder="Enter your email" placeholderTextColor='grey' value={email} onChangeText={(text) => setEmail(text)} />
                                <Input placeholder="Password" placeholderTextColor='grey' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
                                <SubmitForm onPress={login} disabled={loading}><ButtonText>{loading ? "Loading..." : "Sign In"}</ButtonText></SubmitForm>
                                <NewToNetflixTextWrapper activeOpacity={0.5} onPress={() => navigation.navigate("Register")}><NewToNetflix>New to Netflix ? Sign Up</NewToNetflix></NewToNetflixTextWrapper>
                            </Form>
                        </FormWrapper>
                    </Overlay>
                </ImageBackground>
            </Container>
        </>
    )
}

export default Login
