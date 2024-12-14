import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from "react-native";

import { auth } from "../../config";
import { loginUser } from "../redux/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

import Background from "../components/Background";

export default LoginScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (email && password) {
            console.log("Submitted with values:", {
                email,
                password,
            });
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    Keyboard.dismiss();
                    navigation.navigate("Posts");
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-credential") {
                        Alert.alert("Invalid email or password");
                    }
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("LoginError", error);
                });
            setEmail('');
            setPassword('');
        } else {
            Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
        }
    };

    return (
        <Background>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerLogin}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <Text style={styles.title}>Увійти</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Адреса електронної пошти"
                                placeholderTextColor="#BDBDBD"
                                value={email}
                                maxLength={40}
                                onChangeText={setEmail}
                                onFocus={() => setIsFocusedEmail(true)}
                                onBlur={() => setIsFocusedEmail(false)}
                                style={[styles.input, {borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8"}]}
                            />
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Пароль"
                                    placeholderTextColor="#BDBDBD"
                                    secureTextEntry={!passwordVisible}
                                    value={password}
                                    maxLength={40}
                                    onChangeText={setPassword}
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                    style={[styles.input, {borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8"}]}
                                />
                                <TouchableOpacity
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                    style={styles.toggleVisible}
                                >
                                    <Text style={styles.microText}>
                                        {passwordVisible ? "Сховати" : "Показати"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Pressable onPress={handleSubmit} style={styles.btn}>
                            <Text style={styles.btnText}>Увійти</Text>
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Registration")}
                        >
                            <Text style={styles.microText}>Немає акаунту? Зареєструватися</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Background>
    );
};

const styles = StyleSheet.create({
    containerLogin: {
        position: 'relative',
        width: "100%",
        height: 455,
        paddingTop: 32,
        paddingRight: 16,
        paddingBottom: 111,
        paddingLeft: 16,
        marginTop: "auto",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFFFFF",
        textAlign: "center",
    },
    title: {
        marginBottom: 32,
        textAlign: "center",
        fontSize: 30,
    },
    inputContainer: {
        gap: 16,
        marginBottom: 43,
    },
    input: {
        width: "100%",
        height: 50,
        paddingTop: 16,
        paddingBottom: 15,
        paddingLeft: 16,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#F6F6F6",

        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleVisible: {
        position: 'absolute',
        right: 16,
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 51,
        marginBottom: 16,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
    },
    btnText: {
        textAlign: "center",
        fontSize: 16,
        color: "#FFFFFF",
    },
    microText: {
        textAlign: "center",
        fontSize: 16,
        color: "#1B4371",
    },
});