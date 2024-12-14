import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    Alert,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../config";

import Background from "../components/Background";

import PlusIcon from "../icons/PlusIcon";
import CloseIcon from "../icons/CloseIcon";

import IMAGE from "../../assets/avatar.jpg";

export default RegistrationScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isFocusedLogin, setIsFocusedLogin] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [addedAvatar, setAddedAvatar] = useState(false);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (login && email && password) {
                console.log("Submitted with values:", {
                    login,
                    email,
                    password,
                });
                try {
                    const userCredential = await createUserWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                    const user = userCredential.user;
                    await updateProfile(user, { displayName: login });
                    navigation.navigate("Posts");
                    Keyboard.dismiss();
                } catch (error) {
                    if (error.code === "auth/email-already-in-use") {
                        alert("Email in use");
                    }
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error, error.code);
                }
                setLogin('');
                setEmail('');
                setPassword('');
        } else {
            Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
        }
    };

    return (
        <Background>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerRegistration}>
                    <View style={styles.containerAvatar}>
                        {addedAvatar &&
                            <Image
                                source={IMAGE}
                                style={styles.imageAvatar}
                            />
                        }
                        <Pressable
                            onPress={() => setAddedAvatar(!addedAvatar)}
                            style={[styles.btnAddAvatar, {borderColor: !addedAvatar ? "#FF6C00" : "#DBDBDB"}]}
                        >
                            {!addedAvatar ? <PlusIcon /> : <CloseIcon />}
                        </Pressable>
                    </View>
                    <Text style={styles.title}>Реєстрація</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Логін"
                            placeholderTextColor="#BDBDBD"
                            value={login}
                            maxLength={40}
                            onChangeText={setLogin}
                            onFocus={() => setIsFocusedLogin(true)}
                            onBlur={() => setIsFocusedLogin(false)}
                            style={[styles.input, {borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8"}]}
                        />
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
                        <Text style={styles.btnText}>Зареєстуватися</Text>
                    </Pressable>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.microText}>Вже є акаунт? Увійти</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </Background>
    );
};

const styles = StyleSheet.create({
    containerRegistration: {
        position: 'relative',

        width: "100%",
        height: 515,
        
        paddingTop: 92,
        paddingRight: 16,
        paddingBottom: 45,
        paddingLeft: 16,

        marginTop: "auto",

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFFFFF",

        textAlign: "center",
    },
    containerAvatar: {
        position: 'absolute',
        left: "50%",
        transform: [
            { translateX: -40 },
            { translateY: -60 },
        ],

        width: 120,
        height: 120,

        borderRadius: 16,
        backgroundColor: "#F6F6F6",
    },
    imageAvatar: {
        borderRadius: 16,
    },
    btnAddAvatar: {
        position: 'absolute',
        top: "100%",
        left: "100%",
        transform: [
            { translateX: -12 },
            { translateY: -39 },
        ],

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        width: 25,
        height: 25,

        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#FF6C00",
        backgroundColor: "#FFFFFF",
    },
    title: {
        marginBottom: 32,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "500",
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