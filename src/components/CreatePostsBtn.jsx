import { TouchableOpacity } from "react-native";
import PlusIcon from "../icons/PlusIcon";
import { useNavigation } from '@react-navigation/native';

const CreatePostsBtn = ({ color }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("CreatePosts")}>
            <PlusIcon color={color} />
        </TouchableOpacity>
    );
};

export default CreatePostsBtn;