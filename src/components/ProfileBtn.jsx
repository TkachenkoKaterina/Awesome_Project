import { TouchableOpacity } from "react-native";
import UserIcon from "../icons/UserIcon";
import { useNavigation } from '@react-navigation/native';

const ProfileBtn = ({ color }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <UserIcon color={color} />
        </TouchableOpacity>
    );
};

export default ProfileBtn;