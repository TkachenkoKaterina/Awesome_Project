import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../config";

import CameraFrame from "../components/CameraFrame";

import MapPinIcon from "../icons/MapPinIcon";
import TrashIcon from "../icons/TrashIcon.jsx";

const CreatePosts = () => {
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const onPublishHandler = async () => {
        try {
            const docRef = await addDoc(
              collection(db, "posts"),
              {
                preview,
                name,
                place,
                location: JSON.stringify(location),
              },
              { merge: true }
            );
          } catch (e) {
            console.error("Error adding document: ", e);
          }
      
          navigation.navigate("Posts");
    };

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);

    const isAllowed = !!preview && !!name && !!place && !!location;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.containerCreatePosts}>
                <CameraFrame preview={preview} setPreview={setPreview} />
                <Text style={styles.descriptionDownloadPhoto}>Завантажте фото</Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "height" : "padding"}
                >
                    <TextInput
                        placeholder="Назва..."
                        placeholderTextColor="#BDBDBD"
                        maxLength={40}
                        value={name}
                        onChangeText={(name) => setName(name)}
                        style={styles.input}
                    />
                    <View style={styles.inputLocationContainer}>
                        <Text>
                            <MapPinIcon />
                        </Text>
                        <TextInput
                            placeholder="Місцевість..."
                            placeholderTextColor="#BDBDBD"
                            maxLength={40}
                            value={place}
                            onChangeText={(place) => setPlace(place)}
                            style={styles.inputLocation}
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={onPublishHandler}
                    style={[styles.btn, { backgroundColor: isAllowed ? '#FF6C00' : "#F6F6F6" }]}
                >
                    <Text style={[styles.btnText, { color: isAllowed ? '#FFFFFF' : "#BDBDBD" }]}>Опублікувати</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.trashBtn}>
                    <TrashIcon />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    containerCreatePosts: {
        flex: 1,
        paddingTop: 32,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: "#FFFFFF",
    },
    downloadPhotoBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 240,
        marginBottom: 8,
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
    },
    containerCameraIcon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
    },
    descriptionDownloadPhoto: {
        marginBottom: 32,
        fontSize: 16,
        fontWeight: "normal",
        color: "#BDBDBD",
    },
    input: {
        width: "100%",
        height: 50,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    inputLocationContainer: {
        display: "flex",
        gap: 4,
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        height: 50,
        marginBottom: 32,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 51,
        borderRadius: 100,
    },
    btnText: {
        textAlign: "center",
        fontSize: 16,
    },
    trashBtn: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        borderRadius: 20,
        backgroundColor: "#F6F6F6",
    },
});

export default CreatePosts;