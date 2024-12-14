import { TouchableOpacity } from "react-native";
import GreedIcon from "../icons/GreedIcon";
import { useNavigation } from '@react-navigation/native';

const PostsBtn = ({ color, fill }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <GreedIcon color={color} fill={fill} />
        </TouchableOpacity>
    );
};

export default PostsBtn;