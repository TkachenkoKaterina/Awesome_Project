import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

import LogoutIcon from "../icons/LogoutIcon";

import { auth } from "../../config";
import { logoutUser } from "../redux/authSlice";

const LogoutBtn = ({ profileScreen }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onLogout = () => {
        signOut(auth)
            .then(() => {
              dispatch(logoutUser());
              navigation.navigate("Login");
            })
            .catch((error) => {
                console.log("LogOut error", error);
            }
        );
    };

  return (
      <TouchableOpacity
          onPress={onLogout}
          style={profileScreen && {
              position: 'absolute',
              right: 16,
              top: 22,
          }}
      >
          <LogoutIcon />
      </TouchableOpacity>
    );
};

export default LogoutBtn;