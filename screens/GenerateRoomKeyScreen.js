import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, Text, TouchableOpacity, /* TextInput, */
} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fonts, colors } from '../constants/GlobalStyles';
import { signUpUser } from '../store/actions';

const GenerateRoomKeyScreen = (props, { navigation, route }) => {
  // const navigation = useNavigation();
  const firstName2 = route.params;
  // console.log(route.params.email1);
  const [roomCode, setRoomCode] = useState('');
  const generateCode = () => {
    const length = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    setRoomCode(result);
    console.log(firstName2);
  };

  // find out how to get rid of hardcoded stuff
  const firstName = 'fn';
  const lastName = 'ln';
  const email = 'user18@test.com';
  const password = 'user18pw';

  const { signup } = props;
  const handleSignup = () => {
    if (firstName && lastName && email && password && roomCode) {
      signup(email.toLowerCase(), password, firstName, lastName, roomCode);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Generate a room key</Text>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={generateCode}
      >
        <Text style={styles.bottomTextBold}>Generate!</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Your room key is:
        {' '}
        {roomCode}
      </Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 20,
    marginBottom: -30,
    color: colors.darkSageGreen,
  },
  title: {
    fontSize: fonts.large24,
    textAlign: 'center',
    margin: 20,
    color: colors.darkSageGreen,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 40,
    borderWidth: 1,
    padding: 10,
    color: colors.darkSageGreen,
  },
  forgotPw: {
    alignItems: 'flex-end',
    marginRight: 40,
    marginTop: -25,
  },
  forgotPwText: {
    fontSize: fonts.smallText,
    color: colors.loginGreen,
  },
  loginButton: {
    width: 310,
    height: 40,
    padding: 10,
    marginTop: 40,
    backgroundColor: colors.loginGreen,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: fonts.smallText,
    color: colors.lightGray,
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  bottomTextBold: {
    fontSize: fonts.smallText,
    color: colors.loginGreen,
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstName, lastName, email, password, roomCode) => {
      dispatch(signUpUser(firstName, lastName, email, password, roomCode));
    },
  };
};

export default connect(null, mapDispatchToProps)(GenerateRoomKeyScreen);
