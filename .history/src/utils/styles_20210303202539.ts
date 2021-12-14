import {StyleSheet} from "react-native";
import {scaleSizeW, setSpText} from "@/utils/index";

export const customStyles = StyleSheet.create({
    text:{
        color:'#333',
        fontSize:setSpText(14),
    },
    fileText:{
        color:'#3c85ff',
        fontSize:setSpText(14),
    },
    headerRightText:{
        color:'#3c85ff',
        fontSize:setSpText(14),
        paddingRight:scaleSizeW(12)
    },
    error:{
        fontSize:setSpText(12),
        color:'red',
        position:'absolute',
    }
})
