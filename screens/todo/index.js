import { FlatList, StyleSheet, View, Alert } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState,useEffect } from "react";
import firestore from '@react-native-firebase/firestore';

import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Todo() {
    const {user} = useAuth();
    const navigation = useNavigation();
    const [data,setData]=useState([]);


    useEffect(()=>{
        const snapshot= firestore()
        .collection("todos")
        .where("userId","==",user?.uid)
        .orderBy("createdAt","desc")
        .onSnapshot((snapshots)=>{
            const todos = [];
            snapshots.forEach((snapshot)=>{
                todos.push({
                    ...snapshot.data(),
                    id: snapshot.id
                })
            })
            setData(todos);
        })
        return ()=>{
            snapshot?.();
        }
    }, [user?.uid])



    const handleDelete = item => e => {
        Alert.alert('Delete Confirmation', 'Are you sure want to delete this todo?', [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {

                    await firestore().collection("todos").doc(item.id).delete();

                }
            },
        ]);

    }


    console.log(data)
    return <SafeAreaView style={styles.container}>
    
        <Appbar>
            <Appbar.Content title="Your To-do" />
        </Appbar>
    
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    const { title, description } = item;
                    return <List.Item
                        left={props => <List.Icon {...props} icon="checkbox-blank-circle" />}
                        title={title}
                        description={description}
                        right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                <IconButton onPress={() => navigation.navigate("Form", {
                                    mode: "update",
                                    item
                                })} icon="pencil" />
                                <IconButton
                                    onPress={handleDelete(item)}
                                    icon="delete" />
                            
                            </View>
                        </View>}
                    />
                }}
            />


        <FAB
            onPress={() => navigation.navigate("Form", { mode: "create" })}
            style={styles.fab}
            icon={"plus"}
        />
    </SafeAreaView>

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        color: theme.colors.primary
    },
    fab: {
        position: "absolute",
        right: 40,
        bottom: 40,
        overlayColor:"Grey",
        
    },
    actionBtns: {
        flexDirection: "row",
        color:theme.colors.primary
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

