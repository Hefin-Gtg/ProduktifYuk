import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, List, Text } from "react-native-paper";
import auth from '@react-native-firebase/auth';

import { useAuth } from "../../contexts/AuthProvider";



const handleLogout = ()=> {
  auth().signOut();
}

const MyProfile = () => {
  const user = auth().currentUser;
  return (
    <SafeAreaView style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Hello!</Text>
        
        <Text>Email: {user?.email}</Text>
        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleLogout} buttonColor='#FF0D0E'>Logout</Button>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex :0,
    paddingTop:20,
  }
});

export default MyProfile;


