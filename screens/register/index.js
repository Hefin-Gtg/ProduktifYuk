import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';

export default function Register() {

    const navigation = useNavigation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleChange = setField => text => {
        setField(text);
    }

    const handleRegister = async () => {
        try {

            await auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
            console.log("error", e);
            const err = e.message;
            alert(err);
        }

    }
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>ProduktifYuk!</Text>
        <Text variant="titleLarge" style={styles.subtitile}>Create a New Account</Text>
        <View style={styles.formContainer}>
            <TextInput
                value={email}
                mode="outlined"
                placeholder="Email"
                onChangeText={handleChange(setEmail)}
                left={<TextInput.Icon icon="email" color={(isFocused) => isFocused ? theme.colors.primary : theme.colors.secondary} />}
                autoFocus
            />
            <TextInput
                value={password}
                mode="outlined"
                placeholder="Password"
                onChangeText={handleChange(setPassword)}
                left={<TextInput.Icon icon="key" color={(isFocused) => isFocused ? theme.colors.primary : theme.colors.secondary} />}
                secureTextEntry
            />
            <TextInput
                value={repeatPassword}
                mode="outlined"
                onChangeText={handleChange(setRepeatPassword)}
                placeholder="Repeat Password"
                left={<TextInput.Icon icon="key" color={(isFocused) => isFocused ? theme.colors.primary : theme.colors.secondary} />}
                secureTextEntry
            />
            <View style={styles.btnContainer}>
                <Button mode="contained" onPress={handleRegister}>Register</Button>
                <Text style={styles.or}>or</Text>
                <Button onPress={() => navigation.navigate("Login")} >Login</Button>
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
