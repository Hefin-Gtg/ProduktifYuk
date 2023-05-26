import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = setField => text => {
        setField(text);
    }
    const handleLogin = async () => {
        try {

            await auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            console.log("error", e);
            const err = e.message;
            alert(err);
        }

    }
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>ProduktifYuk!</Text>
        <Text variant="titleLarge" style={styles.subtitile}>Login</Text>
        <View style={styles.formContainer}>
            <TextInput
                mode="outlined"
                placeholder="Email"
                value={email}
                onChangeText={handleChange(setEmail)}
                left={<TextInput.Icon icon="email" />}
                autoFocus
            />
            <TextInput
                mode="outlined"
                placeholder="Password"
                value={password}
                onChangeText={handleChange(setPassword)}
                secureTextEntry
                left={<TextInput.Icon icon="key" />}
            />
            <View style={styles.btnContainer}>
                <Button mode="contained" onPress={handleLogin}>Login</Button>
                <Text style={styles.or}>or</Text>
                <Button onPress={() => navigation.navigate("Register")}>Create a new account</Button>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: "100%",
        padding: 20,
        marginTop: 8,
    },
    btnContainer: {
        marginTop: 20
    },
    or: {
        alignSelf: "center",
        marginVertical: 4
    },
    title: {
        color: theme.colors.primary
    },
    subtitile: {
        color: theme.colors.secondary
    }
})
