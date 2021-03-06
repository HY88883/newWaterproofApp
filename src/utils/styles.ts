import {scaleSizeW, setSpText} from '@/utils/index';
import MyStyleSheet from './CustomStyleSheet';

export const customStyles = MyStyleSheet.create({
    text:{
        color:'#333',
        fontSize:14
    },
    textShow:{
        color:'#000',
        fontSize:18
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
        width: '50%',
        height: 30,
        color:'#333',
        fontSize:19,
        padding:0,
        margin:0
      },
      inputProjectStyle:{
        width: '60%',
        // height: 30,
        color:'#333',
        fontSize:14,
        padding:0,
        margin:0,
        marginLeft:28
      },
      inputDStyle:{
        width: 200,
        height: 30,
        color:'#333',
        fontSize:19,
        padding:0,
        margin:0,
        textAlign: 'right'
      },
      inputSStyle:{
        width: '80%',
        // height: 30,
        color:'#333',
        fontSize:16,
        padding:0,
        margin:0
      },
      detailLeftText:{
        fontSize: 16,
        color: '#495057'
      },
      detailRightText:{
        fontSize: 14,
        color: '#FF9F1C'
      }
});
