import { StyleSheet, TouchableOpacity } from "react-native"

import ArrowTopIcon from "../icons/ArrowTopIcon";

const SendMessageBtn = () => {
    return (
        <TouchableOpacity style={styles.btn}>
            <ArrowTopIcon />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        borderRadius: 18,
        backgroundColor: "#FF6C00",
    },
});

export default SendMessageBtn;