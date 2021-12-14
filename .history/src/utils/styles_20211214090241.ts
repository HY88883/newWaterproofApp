import {scaleSizeW, setSpText} from '@/utils/index';
import MyStyleSheet from './CustomStyleSheet';

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
borderRadius: 4,
borderStyle:'solid',
color:'#333'
    },
    pageTitleStyle: {
        fontWeight: '500',
        fontSize:18,
        color: '#333',
      },
      inputMStyle:{
        width: '65%',
        height: 30,
        color:'#333',
        fontSize:19,
        padding:0,
        margin:0
      }
});
