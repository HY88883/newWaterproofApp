import React from 'react';
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {hp, px2dp, scaleSizeH, scaleSizeW, setSpText, wp} from '@/utils/index';
import {customStyles} from '@/utils/styles';
import {RootState} from '@/models/index';
import {connect} from 'react-redux';
import {ActionPopover} from 'teaset';
import {Toast} from 'teaset';
import RNFS, {stat} from 'react-native-fs';
import Func from '@/utils/Func';
import {auditTeamMember} from '@/service/team';
import Config from 'react-native-config';
import Touchable from '@/components/Touchable/Touchable';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import * as DocumentOpener from 'react-native-document-opener';
import Overlay from '@/components/OverlayLoading';
import MyStyleSheet from '@/utils/CustomStyleSheet';

const mapStateToProps = ({team, loading}: RootState) => ({
    team,
    // loading: loading.effects['affairs/fetchAffairsDetail'],
});

const connector = connect(mapStateToProps);

//待审核队员详情
class PeopleDetail extends React.Component<any> {
    state={
        index:0,
        isSubmitting:false,
        leftIsSubmitting:false,
        progress:0,
        downloading:false,
    }

    componentDidMount(): void {
        const {
            dispatch,
            route: {
                params: {id: userId},
            },
        } = this.props;
        dispatch({
            type: 'team/teamMemberDetail',
            payload: {userId},
        });
    }

    handleStatusOperation = async (status) => {
        const {
            dispatch,
            route: {
                params: {id: userId},
            },
            navigation
        } = this.props;
        if(status===2) this.setState({isSubmitting:true});
        else this.setState({leftIsSubmitting:true});
        const res= await auditTeamMember({userId,pass:status===2});
        if (res.success) {
            this.setState({isSubmitting: false,leftIsSubmitting:false});
            Toast.success('操作成功');
            navigation.goBack();
        }
    };

    handleViewPhoto=(media,i) =>{
        this.props.navigation.navigate('PhotoBrowserScene', {media: media, index: i});
      }

      handleDownload=(item)=> {
          const {downloading,progress} = this.state;
        let savePath =
          Platform.OS === 'ios'
            ? RNFS.DocumentDirectoryPath
            : RNFS.ExternalDirectoryPath;
        let toFilePath = savePath + `/${item.originalName}`; // 文件路径
        let url = `${Config.FILE_URL}${item.name}`; // 文件下载地址
        // let fileType = 'application/pdf';
    
        RNFS.exists(toFilePath).then(exists => {
          if (exists) {
            try {
              DocumentOpener.openAsync(toFilePath);
            } catch (e) {
              Alert.alert('提示', '打开文件失败，请先安装对应软件');
            }
          } else {
            const downRet = RNFS.downloadFile({
              fromUrl: url,
              toFile: toFilePath,
              progress: data => {
                var text = JSON.stringify(data);
                if (progress < 100) {
                  if (text.contentLength > 0) {
                    var num = this.state.progress + 1;
                    this.setState({ progress:num});
                  } else {
                    var num = Math.round(data.bytesWritten / 10000);
                    if (num < 100) {
                    this.setState({ progress:num});
                    }
                  }
                }
              },
              begin: res => {
                  this.setState({downloading:true});
                Overlay.displayLoading('文件下载中...');
              },
            });
    
            downRet.promise
              .then(res => {
                this.setState({downloading:false});
                Overlay.removeLoading();
                try {
                  DocumentOpener.openAsync(toFilePath);
                } catch (e) {
                  Alert.alert('提示', '打开文件失败，请先安装对应软件');
                }
              })
              .catch(err => {
                  this.setState({
                      downloading:false,
                      progress:0
                  });
                Overlay.removeLoading();
                Alert.alert('提示', '下载文件失败,错误原因:' + err);
              });
          }
        });
      }

    render() {
        const {
            team: {teamMemberDetail},
        } = this.props;
        const {index,isSubmitting,leftIsSubmitting}=this.state;
        let images=[{photo:`${Config.FILE_URL}${teamMemberDetail.avatar}`},{photo:`${Config.FILE_URL}${teamMemberDetail.idCardPositivePhotosAttach.name}`},
           {photo: `${Config.FILE_URL}${teamMemberDetail.idCardBackPhotosAttach.name}`},
    {photo:`${Config.FILE_URL}${teamMemberDetail.bankCardPositivePhotosAttach.name}`},
            {photo:`${Config.FILE_URL}${teamMemberDetail.bankCardBackPhotosAttach.name}`}
        ];

        return (
            <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.peopleInfoView}>
                    {teamMemberDetail.avatar ? (
                        <Touchable onPress={()=>this.handleViewPhoto(images,0)}>
                            <Image
                                source={{uri: `${Config.FILE_URL}${teamMemberDetail.avatar}`}}
                                style={styles.avatorStyle}
                            />
                        </Touchable>
                    ) : (
                        <View style={styles.avatorStyle}/>
                    )}
                    <View style={styles.infoView}>
                        <Text style={styles.imInfotext}>姓名：{teamMemberDetail.userName}</Text>
                        <Text style={styles.imInfotext}>联系方式：{teamMemberDetail.phone}</Text>
                    </View>
                </View>
                <Text style={[styles.imInfotext,{paddingVertical:px2dp(2)}]}>身份证照片：</Text>
                <View style={styles.photoView}>
                    <Touchable onPress={()=>this.handleViewPhoto(images,1)}>
                        <Image
                            source={{uri: `${Config.FILE_URL}${teamMemberDetail.idCardPositivePhotosAttach.name}`}}
                            style={styles.images}
                        />
                    </Touchable>
                    <Touchable onPress={()=>this.handleViewPhoto(images,2)}>
                        <Image
                            source={{uri: `${Config.FILE_URL}${teamMemberDetail.idCardBackPhotosAttach.name}`}}
                            style={styles.images}
                        />
                    </Touchable>

                </View>
                <Text style={[styles.imInfotext,{marginVertical:px2dp(20)}]}>
                    身份证号码：{teamMemberDetail.idCardNumber}
                </Text>
                <Text style={[styles.imInfotext,{paddingVertical:px2dp(2)}]}>银行卡照片：</Text>
                <View style={styles.photoView}>
                    <Touchable onPress={()=>this.handleViewPhoto(images,3)}>
                        <Image
                            source={{uri: `${Config.FILE_URL}${teamMemberDetail.bankCardPositivePhotosAttach.name}`}}
                            style={styles.images}
                        />
                    </Touchable>
                    <Touchable onPress={()=>this.handleViewPhoto(images,4)}>
                        <Image
                            source={{uri: `${Config.FILE_URL}${teamMemberDetail.bankCardBackPhotosAttach.name}`}}
                            style={styles.images}
                        />
                    </Touchable>

                </View>
                <Text style={[styles.imInfotext,{marginVertical:px2dp(10)}]}>
                    开户行：{teamMemberDetail.openingBack}
                </Text>
                <Text style={[styles.imInfotext,{marginVertical:px2dp(10)}]}>
                    银行卡号：{teamMemberDetail.bankCardNumber}
                </Text>
                {
                    Func.ifubcontractor &&  <Text style={[styles.imInfotext,{marginVertical:px2dp(10)}]}>
                        人员所属队：{teamMemberDetail.teamName}
                    </Text>
                }
                {
                    teamMemberDetail.insuranceCertificateAttachList.length > 0 &&
                    <View style={styles.certificate}>
                        <Text style={styles.imInfotext}>保险凭证：</Text>
                        <View >
                            {teamMemberDetail.insuranceCertificateAttachList.map((r) => (
                                <Touchable
                                    style={{marginBottom:px2dp(4)}}
                                    key={r.id}
                                    onPress={() => this.handleDownload(r)}
                                    >
                                    <Text style={[customStyles.fileText,{width:wp(70)}]} >{r.originalName}</Text></Touchable>
                            ))}
                        </View>
                    </View>
                }

            </ScrollView>
              <CancelAndConfirm
                  onLeftClick={()=>this.handleStatusOperation(3)}
                  onRightClick={()=>this.handleStatusOperation(2)}
                  disabled={isSubmitting}
                  rightText={'通过'}
                  leftText={'驳回'}
                  style={{marginVertical:px2dp(12)}}
                    />

            </View>
        );
    }
}

const styles = MyStyleSheet.create({
    container:{ flex: 1,
        backgroundColor: '#fff',},
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingTop:8
    },
    peopleInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:6
    },
    info: {
        ...customStyles.text,
        lineHeight: 25
    },
    infoView: {
        marginLeft: 10,
        justifyContent: 'space-between',
        height: 60,
        flexDirection: 'column',
    },
    imInfotext: {
        fontSize:16,
        color:'#495057'
    },
    photoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editText: {
        color: '#3c85ff',
        fontSize: 14,
        paddingRight: 12
    },
    images: {
        width: wp(41),
        height: wp(20),
        borderRadius:4,
        overflow: 'hidden',
        overlayColor: '#fff',
    },
    avatorStyle: {
        width: wp(24),
        height: wp(24),
        borderRadius: wp(12),
        overflow: 'hidden',
        overlayColor: '#fff',
    },
    certificate:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 8
    },
   
});

export default connector(PeopleDetail);
