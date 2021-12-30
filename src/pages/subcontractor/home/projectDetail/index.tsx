import IconFont from '@/assets/svgs';
import ModalDialog from '@/components/ModalDialog';
import MyModalDropdown from '@/components/MyModalDropdown';
import Touchable from '@/components/Touchable/Touchable';
import { RootState } from '@/models/index';
import { setProjectLeader } from '@/service/projectManage';
import { viewportWidth } from '@/utils/';
import { px2dp, wp } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Func from '@/utils/Func';
import { customStyles } from '@/utils/styles';
import { Toast } from '@ant-design/react-native';
import React from 'react';
import {
  Button, Image, PanResponder, Platform, ScrollView, StyleSheet, Text,
  View
} from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

const mapStateToProps = ({
  projectManage,
  constructionRecord,
  team,
  loading,
}: RootState) => ({
  projectManage,
  constructionRecord,
  team,
});

const connector = connect(mapStateToProps);

//项目详情
class ProjectDetail extends React.Component<any> {
  state = {
    isDialogVisible: false,
    option: {},
  iconStyle:{}
  };

  webviewRef=React.createRef(null);
  isSelected = false;
  listener=null

  componentDidMount(): void {
    this.sendRequest();
    this.listener=this.props.navigation.addListener('focus',()=>{
    this.sendRequest();
    });
  }

  sendRequest = () => {
    const {
      dispatch,
      route: {
        params: {item},
      },
    } = this.props;
    this.props.navigation.setOptions({
      headerRight: () =>
        Func.ifubcontractor ? (
          <Touchable onPress={this.handleEdit} style={{marginRight:px2dp(12)}}>
            <IconFont name="piliangbianji"/>
          </Touchable>
        ) : (
          <Touchable onPress={this.handleTouch}>
            <Text style={customStyles.headerRightText}>授权</Text>
          </Touchable>
        ),
    });
    dispatch({
      type: 'projectManage/detail',
      payload: {id: item.id},
    });
    // dispatch({
    //   type: 'constructionRecord/page',
    //   payload: {projectId:item.id},
    // });
    dispatch({
      type: 'team/getTeamMemberPage',
      payload: {deptId: item.teamId, size: 999},
    });

  };

  handleEdit = () => {
    const {
      projectManage: {ProjectManagementDetail},
    } = this.props;
    this.props.navigation.navigate('AddProject', {ProjectManagementDetail});
  };

  handleTouch = () => {
    this.showDialog();
  };

  showDialog = () => {
    this.setState({isDialogVisible: true});
  };

  showDialogLeft = () => {
    this.setState({isDialogVisible: false});
  };

  hideDialog = async () => {
    const {
      projectManage: {ProjectManagementDetail},
    } = this.props;
    const {option} = this.state;
    if (Func.isEmptyObject(option)) {
      return;
    }
    this.isSelected = true;
    this.setState({isDialogVisible: false}, async () => {
      const res = await setProjectLeader({
        id: ProjectManagementDetail.id,
        projectLeader: option.userId,
      });
      if (res.success) {
        Toast.success('操作成功');
      }
    });
  };

  componentWillUnmount(): void {
    this.props.dispatch({
      type: 'projectManage/clearDetail',
    });
    this.listener&&this.listener();
  }

  handleMap = (item, index) => {
    return (
      <View key={index}>
        <View style={[styles.itemStyle, {alignItems: 'flex-start'}]}>
        <Image
            resizeMode={'contain'}
            source={require('@/assets/images/arrow.png')}
            style={styles.imgarrow}
        />
          <Text style={customStyles.detailLeftText}>{item.name}：</Text>
          <Text style={[customStyles.detailRightText, {width: '68%'}]}>{item.field}</Text>
        </View>
        {item.name === '项目面积' && (
          <Table
              borderStyle={{borderWidth: 1, borderColor: '#666'}}
              style={styles.table}>
            <Row
                flexArr={[1, 1]}
                data={this.optionsChange.tableHead}
                style={styles.head}
                textStyle={[customStyles.text, {textAlign: 'center'}]}
            />
            <Rows
                flexArr={[1, 1]}
                data={this.optionsChange.tableData}
                style={styles.rowsStyle}
                textStyle={[customStyles.text, {textAlign: 'center'}]}
            />
          </Table>
        )}
      </View>
    );
  };

  goToConstructionLog = id => {
    this.props.navigation.navigate('ConstructionLog', {id});
  };

  renderItem = ({item, index}) => {
    return (
      <Touchable
          onPress={() => this.goToConstructionLog(item.id)}
          style={styles.renderItem}>
        <View style={styles.leftItem}>
          <Text style={customStyles.text}>{item.location}</Text>
          <Text style={customStyles.text}>{item.partsName}</Text>
          <Text style={customStyles.text}>
            {item.constructionTechnologyName}
          </Text>
        </View>
        <View style={styles.rightItem}>
          <View style={styles.dateRightStyle}>
            <Text style={customStyles.text}>{item.recordingTime}</Text>
            <Text style={customStyles.text}>完成面积：{item.area}m²</Text>
          </View>
          {/* <IconFont name={'gengduo1'} color={'#999'} /> */}
        </View>
      </Touchable>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={{height: px2dp(12)}} />;
  };

  optionsChange = {
    tableHead: ['部位', '合同面积(m²)'],
    tableData: [],
  };

  flag = false;

  handleGoto = (order, ProjectManagementDetail) => {
    const {navigation} = this.props;
    switch (order) {
      case 1:
        navigation.navigate('ConstructionRecordList', {
          id: ProjectManagementDetail.id,
        });
        break;
      case 2:
        navigation.navigate('MaterialView', {id: ProjectManagementDetail.id});
        break;
      case 3:
        navigation.navigate('MaterialStockList', {
          id: ProjectManagementDetail.id,
        });
        break;
    }
  };

  viewPanResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: (e, g) => false,
  })

  _onLoad=()=>{
    const {
      projectManage: {ProjectManagementDetail},
    } = this.props;
    if(ProjectManagementDetail.position){
        const [a,b]=ProjectManagementDetail.position.split(',');
        const obj={a,b};
        this.webviewRef.current.injectJavaScript(`listenMapPan(${JSON.stringify(obj)});true;`);
    }
  }

  render() {
    let source;
    if (Platform.OS === 'ios') {
      source = require('../../../html/bdMap.html');
    } else if (Platform.OS === 'android') {
      source = {uri: 'file:///android_asset/html/bdMap.html'};
    }
    const {
      projectManage: {ProjectManagementDetail},
      // constructionRecord: {constructionRecordList},
      team: {
        getTeamMemberPage: {list, pagination},
      },
    } = this.props;
    const {isDialogVisible, option} = this.state;
    if (
      !Func.isEmptyObject(ProjectManagementDetail.contractAreaList) &&
      !this.flag
    ) {
      ProjectManagementDetail.contractAreaList.map(i => {
        this.optionsChange.tableData.push([
          <Text style={styles.tableText}>{i.parts}</Text>,
          <Text style={styles.tableText}>{i.contractArea}m²</Text>,
        ]);
      });
      this.flag = true;
    }
    const projectDetail = [
      {name: '项目名称', field: ProjectManagementDetail.projectName},
      {name: '项目甲方', field: ProjectManagementDetail.party},
      {name: '项目总包方', field: ProjectManagementDetail.generalContractor},
      {name: '项目面积', field: `${ProjectManagementDetail.contractArea}m²`},
      {name: '材料品牌', field: ProjectManagementDetail.materialBrand},
      {
        name: '分包商项目经理',
        field: ProjectManagementDetail.projectManagerName,
      },
      {name: '施工队伍', field: ProjectManagementDetail.teamName},
      {name: '负责人', field: ProjectManagementDetail.projectLeaderName},
      {name: '项目位置', field: ProjectManagementDetail.location},
    ];
    if (this.isSelected) {
      projectDetail.splice(-2, 1, {name: '负责人', field: option.userName});
      this.isSelected = false;
    }
    let [longitude = '0', latitude = '0'] =
      ProjectManagementDetail.position.split(',');
    longitude = Number(longitude);
    latitude = Number(latitude);
    return (
      <ScrollView style={styles.container}>
            <Image
                resizeMode={'contain'}
                source={require('@/assets/images/titlebj.png')}
                style={styles.imgsxff}
        />
        <Text style={styles.jiben}>施工项目基本信息</Text>
        <View style={[styles.detailView,styles.infoViews]}>
          {projectDetail.map(this.handleMap)}
        </View>
        <ModalDialog
            _dialogTitle={'请选择被授权人'}
            _dialogVisible={isDialogVisible}
            _dialogContent={
            <MyModalDropdown
                options={list}
                renderRow={(option, index, isSelected) => {
                return (
                  <View
                      style={{
                      height: 40,
                      width:120,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={{textAlign: 'center',color:'#333'}}>{option.userName}</Text>
                  </View>
                );
              }}
                onSelect={(index, value) => {
                this.setState({option: value});
                console.log('_dialogContent' + index, value);
              }}>
              <Text style={styles.peopleStyle}>
                {!Func.isEmptyObject(option) ? option.userName : '请选择'}
              </Text>
            </MyModalDropdown>
          }
            _dialogLeftBtnAction={this.showDialogLeft}
            _dialogRightBtnAction={this.hideDialog}
        />
        {/*<View style={[styles.dot]} >
            <IconFont name={'dingweiweizhimudedi'} size={30}/>
          </View>*/}
<View
    pointerEvents = 'none'
    onLayout={e => {
      if (e.nativeEvent.layout) {
        this.setState({iconStyle:{
          top: e.nativeEvent.layout.height / 2 - px2dp(14),
          left: e.nativeEvent.layout.width / 2-px2dp(9),
        }});
      }
    }}
>
<View style={[{position: 'absolute', zIndex: 20},this.state.iconStyle]}>
            <IconFont name="weizhi" />
          </View>
<WebView
    ref={this.webviewRef}
    style={{width:viewportWidth-px2dp(24),marginVertical:px2dp(12),alignSelf:'center'}}
    containerStyle={{height: px2dp(200), width: '100%', flex: 0}}
    source={source}
    domStorageEnabled={true}
    javaScriptEnabled={true}
    geolocationEnabled={true}
    androiddomStorageEnabled={false}
    originWhitelist={['*']}
    // onMessage={_handleMessage}
    onLoad={this._onLoad}
          />
</View>

        <View style={styles.btnView}>
          <Button
              title="施工日志"
              onPress={() => this.handleGoto(1, ProjectManagementDetail)}
          />
        </View>
        <View style={styles.btnView}>
          <Button
              title="使用材料"
              onPress={() => this.handleGoto(2, ProjectManagementDetail)}
          />
        </View>
        <View style={styles.btnView}>
          <Button
              title="材料库存"
              onPress={() => this.handleGoto(3, ProjectManagementDetail)}
          />
        </View>
        {/*<Text style={styles.jiben}>施工日志</Text>*/}
        {/*<SpliteLine contentStyle={{paddingHorizontal: scaleSizeW(12)}} />*/}
        {/*<FlatList*/}
        {/*    contentContainerStyle={styles.flatList}*/}
        {/*    data={constructionRecordList.list}*/}
        {/*    renderItem={this.renderItem}*/}
        {/*    ItemSeparatorComponent={this.ItemSeparatorComponent}*/}
        {/*/>*/}
      </ScrollView>
    );
  }
}
const styles = MyStyleSheet.create({
  flatList: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    paddingVertical: 12
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailView: {
    // paddingLeft: 20,
    padding: 14,
  
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:2
  },
  jiben: {
    fontSize: 17,
    fontWeight: '600',
    color:'#333',
    position: 'absolute',
    top:12,left:34,
  },
  mapStyle: {
    height: wp(80),
    width: wp(80),
    alignSelf: 'center',
    marginTop:10,
    marginBottom: 20
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#FFF',
    // height:scaleSizeH(70)
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height:70
  },
  dateRightStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
    marginRight: 5
  },
  dot: {
    position: 'absolute',
    zIndex: 1000,
    left: wp(44.6),
    bottom: wp(43.5),
  },
  tableText: {
    fontSize: 13,
    textAlign: 'center',
    padding: 0,
    color: '#222',
  },
  rowsStyle: {
    height: 40
  },
  table: {
    width: wp(84),
  },
  head: {
    height: 40
  },
  peopleStyle: {
    fontSize: 16,
    fontWeight: '500',
    color:'#333'
  },
  btnView: {
    width: wp(30),
    borderRadius: 6,
    overflow: 'hidden',
    marginLeft: 12,
    marginVertical: 8
  },
  infoViews:{
    alignSelf:'center',
    width: viewportWidth-24,
    borderWidth:StyleSheet.hairlineWidth,
    borderRadius:4,
    overflow:'hidden',
    borderColor:'#BCBBBA',
    ...Platform.select({
      android:{
          elevation: 5
      },
      ios:{
          shadowColor: '#333',
          shadowRadius: 3,
          shadowOpacity: 0.14,
          shadowOffset: { width:1, height: 5 }
      }
  })
  },
  imgsxff:{
    width:205,
    height:32,
    marginVertical:8
  },
  imgarrow:{
    width:14,
    height:14,
    top:4,
    marginRight:8
  }
});

export default connector(ProjectDetail);
