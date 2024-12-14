import React from "react";
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../config";
import { selectComments } from "../redux/selectors";
import { setComments } from "../redux/commentsSlice";

import CommentCard from "../components/CommentCard";
import SendMessageBtn  from "../components/SendMessageBtn";

import SUNSET from "../../assets/sunset.jpg";

// import { comments } from "../data/comments";

const CommentsScreen = () => {
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);

    const { params: { postId }, } = useRoute();

    useEffect(() => {
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            if (snapshot.exists) {
                dispatch(setComments(snapshot.data().comments || []));
            }
        });
    }, []);

    const onSendMessage = async () => {
        try {
            await updateDoc(doc(db, "posts", postId), {
                comments: arrayUnion({
                id: nanoid(),
                message,
                datetime: new Intl.DateTimeFormat("uk-UA", {
                    dateStyle: "full",
                    timeStyle: "medium",
                    timeZone: "Australia/Sydney",
                }).format(new Date()),
                }),
            });
        
            setMessage("");
        } catch (error) {
            console.log("onSendMessage", error);
        }
    };

    return (
        <View style={styles.containerComments}>
            <Image
                source={SUNSET}
                style={styles.commentImg}
            />
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <CommentCard item={item} index={index} />
                    // <View style={styles.commentItem}>
                    //     <View style={styles.commentText}>
                    //         <Text style={styles.commentTextMessage}>{item.message}</Text>
                    //         <Text style={styles.commentTextDatetime}>{item.datetime}</Text>
                    //     </View>
                    //     <Image source={item.avatar} style={styles.commentAvatar} />
                    // </View>
                )}
                contentContainerStyle={styles.commentsList}
            />
            <KeyboardAvoidingView>
                <View style={styles.commentInputContainer}>
                    <TextInput
                        onChangeText={setMessage}
                        placeholder="Коментувати..."
                        placeholderTextColor="#BDBDBD"
                        value={message}
                        style={styles.commentInput}
                    />
                    <SendMessageBtn onPress={onSendMessage} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerComments: {
        flex: 1,
        paddingTop: 32,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: "#FFFFFF",
    },
    commentImg: {
        width: "100%",
        marginBottom: 32,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    commentsList: {
        gap: 24,
    },
    commentItem: {
        flexDirection: 'row',
        gap: 16,
    },
    commentAvatar: {
        width: 28,
        height: 28,
        marginLeft: 16,
        borderRadius: 14,
    },
    commentText: {
        flex: 1,
        padding: 16,
        borderRadius: 6,
        borderTopRightRadius: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    commentTextMessage: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 18,
        color: "#212121",
    },
    commentTextDatetime: {
        fontSize: 10,
        fontWeight: "normal",
        textAlign: 'right',
        color: "#BDBDBD",
    },
    commentInputContainer: {
        position: 'relative',
        marginTop: 16,
        marginBottom: 16,
    },
    commentInput: {
        width: "100%",
        height: 50,
        padding: 16,
        backgroundColor: "#F6F6F6",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        fontSize: 16,
        fontWeight: "normal",
    },
});

export default CommentsScreen;