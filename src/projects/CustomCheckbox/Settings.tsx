import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "./src/Checkbox";
import { COLOR_SET } from "./data/Data";
import { useState } from "react";

    export default function Settings() {   
        const [checked, setChecked] = useState(false);
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings</Text>
            <TouchableOpacity
            onPress={() => setChecked(!checked)}
            >
            <Checkbox
                width={24}
                height={24}
                checked={checked}
                checkmarkColor={"white"}
                checkedBackgroundColor={COLOR_SET[0].color3}
                uncheckedBackgroundColor={COLOR_SET[0].color4}
                checkedBorderColor={COLOR_SET[0].color1}
                uncheckedBorderColor={COLOR_SET[0].color2}
            />
            </TouchableOpacity>
        </View>
    )
}