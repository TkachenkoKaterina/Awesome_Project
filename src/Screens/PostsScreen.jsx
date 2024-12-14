import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import { db } from "../../config";
import { selectPosts } from "../redux/selectors";
import { setPosts } from "../redux/postsSlice";

import PostCard from "../components/PostCard";

import IMAGE from "../../assets/avatar.jpg";

// import { posts } from "../data/data";

export default PostsScreen = () => {
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        onSnapshot(collection(db, "posts"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                preview: IMAGE,
                name: doc.data().name || "Noname",
                comments: doc.data().comments || [],
                place: doc.data().place || "no where",
                likes: doc.data().likes || 0,
                location: doc.data().location || null,
            }));
    
            dispatch(setPosts(data));
        });
    }, []);

    return (
        <View style={styles.postsContainer}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={IMAGE}
                        style={[styles.avatarContainer,
                            mageStyle={
                                width: 60,
                                height: 60,
                            }
                        ]}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameContainer}>Natali Romanova</Text>
                    <Text style={styles.emailContainer}>email@example.com</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <PostCard card={item} />}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 32 }}></View>}
                    contentContainerStyle={styles.postsList}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postsContainer: {
        flex: 1,

        paddingTop: 32,
        paddingRight: 16,
        paddingLeft: 16,

        backgroundColor: "#FFFFFF",
    },
    profileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
    },
    avatarContainer: {
        width: 60,
        height: 60,
    },
    textContainer: {
        marginLeft: 8,
    },
    nameContainer: {
        fontSize: 13,
        fontWeight: "bold",
    },
    emailContainer: {
        fontSize: 11,
    },
    postsList: {
        paddingBottom: 110,
    },
});