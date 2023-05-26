import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import theme from "../../config/theme";

export default function Landing() {

    const navigation = useNavigation();

    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>ProduktifYuk!</Text>
        <Text>Jaga Fokus, Jadi Produktif</Text>
        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => navigation.navigate("Login")}>Login</Button>
            <Text style={styles.or}>or</Text>
            <Button mode="outlined" onPress={() => navigation.navigate("Register")}>Create a new account</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 20
    },
    or: {
        alignSelf: "center"
    },
    title: {
        color: theme.colors.primary
    },
})
