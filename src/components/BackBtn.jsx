import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";

import ArrowLeftIcon from "../icons/ArrowLeftIcon";

const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ArrowLeftIcon />
    </TouchableOpacity>
  );
};

export default BackBtn;