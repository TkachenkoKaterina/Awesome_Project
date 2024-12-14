import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { useSelector } from "react-redux";

import { selectPosts } from "../redux/selectors";
import useAuth from "../hooks/useAuth";

import Background from "../components/Background";
import LogoutBtn from "../components/LogoutBtn";
import PostCard from "../components/PostCard";

import PlusIcon from "../icons/PlusIcon";
import CloseIcon from "../icons/CloseIcon";

import IMAGE from "../../assets/avatar.jpg";

// import { posts } from "../data/data";

const ProfileScreen = () => {
    const [addedAvatar, setAddedAvatar] = useState(true);
    const posts = useSelector(selectPosts);
    const { user } = useAuth();

    return (
        <Background>
            <View style={styles.containerProfile}>
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
                <LogoutBtn profileScreen={true} />
                <Text style={styles.title}>
                    {user?.displayName || "Noname"}
                </Text>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <PostCard card={item} />}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 32 }}></View>}
                    contentContainerStyle={styles.postsList}
                />
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    containerProfile: {
        position: 'relative',

        width: '100%',
        height: 515,
        paddingTop: 92,
        paddingRight: 16,
        paddingLeft: 16,
        marginTop: 'auto',

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFFFFF',

        textAlign: 'center',
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
    postsList: {
        paddingBottom: 16,
    },
});

export default ProfileScreen;