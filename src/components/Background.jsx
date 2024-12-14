import { StyleSheet, ImageBackground, } from "react-native";

import IMAGE_BG from "../../assets/photo_BG.jpg"

export default Background = ({ children }) => {
    return (
        <ImageBackground
            source={IMAGE_BG}
            resizeMode="cover"
            style={styles.container}
        >
            { children }
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });