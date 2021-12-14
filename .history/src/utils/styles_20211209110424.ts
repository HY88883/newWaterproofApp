import {scaleSizeW, setSpText} from "@/utils/index";
import MyStyleSheet from "./CustomStyleSheet";

export const customStyles = MyStyleSheet.create({
    text:{
        color:'#333',
        fontSize:14
    },
    fileText:{
        color:'#3c85ff',
        fontSize:14
    },
    headerRightText:{
        color:'#3c85ff',
        fontSize:14,
        paddingRight:12
    },
    error:{
        fontSize:12,
        color:'red',
        position:'absolute',
    },
    inputContainerStyle:{
        width: 295,
height: 46,
borderWidth:1,
borderColor:'#ADB5BD',
opacity: 0.6,
border-radius: 4px
    }
})
