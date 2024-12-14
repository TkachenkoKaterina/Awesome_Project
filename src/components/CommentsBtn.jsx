import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";

import MessageIcon from "../icons/MessageIcon";

const CommentsBtn = ({ id }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Comments", { postId: id })}>
            <MessageIcon />
        </TouchableOpacity>
    );
};

export default CommentsBtn;