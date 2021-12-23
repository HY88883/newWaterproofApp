import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {customStyles} from '@/utils/styles';
import {px2dp, scaleSizeH, scaleSizeW, setSpText, wp} from '@/utils/index';
import {Row, Rows, Table} from 'react-native-table-component';
import {submit} from '@/service/materialApplication';
import {Toast, Select} from 'teaset';
import {RootState} from '@/models/index';
import {connect} from 'react-redux';
import {getCurrentUser} from '@/config/authority';
import {goBackRefresh} from '@/config/RootNavigation';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Func from '@/utils/Func';

const mapStateToProps = ({materialApplication, loading}: RootState) => ({
  materialApplication,
  // loading: loading.effects['affairs/fetchAffairsDetail'],
});

const connector = connect(mapStateToProps);

//物料审批详情
class MaterialApprovalDetail extends React.Component<any> {
  state = {
    isSubmitting: false,
    projectItem: {},
      leftIsSubmitting:false
  };

  optionsChange = {
    tableHead: ['物料名称', '单位', '数量'],
    tableData: [],
  };

  async componentDidMount(): void {
    this.user = await getCurrentUser();
    const {dispatch} = this.props;
    const {id} = this.props.route.params;
    dispatch({
      type: 'materialApplication/detail',
      payload: {id},
    });
  }

  componentWillUnmount(): void {
    this.props.dispatch({
      type: 'materialApplication/clearDetail'
    });
  }

  handleOperation = async (status) => {
      const {
          materialApplication: {materialApplicationDetail},
      } = this.props;
     if(status===2) this.setState({isSubmitting:true});
      else this.setState({leftIsSubmitting:true});
     const res= await submit({id:materialApplicationDetail.id,status});
    if (res.success) {
      this.setState({isSubmitting: false,leftIsSubmitting:false});
      Toast.success('操作成功');
      this.props.navigation.goBack();
    }
  };

  flag=false

  render() {
    const {isSubmitting, projectItem,leftIsSubmitting} = this.state;
    const {
      materialApplication: {materialApplicationDetail},
    } = this.props;
    const {materialApplicationDetailList} = materialApplicationDetail;
      if(!Func.isEmptyObject(materialApplicationDetailList)&&!this.flag){
          materialApplicationDetailList.map((i) =>{
                  this.optionsChange.tableData.push([
                      <Text style={styles.tableText}>{i.name}</Text>,
                      <Text style={styles.tableText}>{i.unit}</Text>,
                      <Text style={styles.tableText}>{Number(i.number).toFixed(0)}</Text>,
                  ]);
              }
          );
          this.flag=true;
      }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
        <View style={styles.back}>
        <View style={styles.itemStyle}>
            <Text style={customStyles.text}>施工队名称：</Text>
            <Text style={styles.rtext}>{materialApplicationDetail.teamName}</Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={customStyles.text}>项目名称：</Text>
            <Text style={styles.rtext}>{materialApplicationDetail.projectName}</Text>
          </View>
        </View>
          <View>
          </View>
         <View style={{alignSelf:'center',marginTop:px2dp(24)}}>
         <Text style={styles.xxtext}>物料详情</Text>
         <Table
             borderStyle={{borderWidth: 1, borderColor: '#DFE2E5'}}
             style={styles.table}>
            <Row
                data={this.optionsChange.tableHead}
                style={styles.head}
                textStyle={[customStyles.text, {textAlign: 'center',color:'#F71735',backgroundColor: '#fff'}]}
                flexArr={[2, 1, 1]}
            />
            <Rows
                data={this.optionsChange.tableData}
                style={styles.rowsStyle}
                textStyle={[customStyles.text, {textAlign: 'center'}]}
                flexArr={[2, 1, 1]}
            />
          </Table>
         </View>
        </ScrollView>
        {
          materialApplicationDetail.status===1&&<CancelAndConfirm
              onLeftClick={()=>this.handleOperation(3)}
              onRightClick={()=>this.handleOperation(2)}
              disabled={isSubmitting}
              rightText={'通过'}
              leftText={'驳回'}
              style={{marginVertical:px2dp(12)}}
          />
        }

      </View>
    );
  }
}
const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowsStyle: {
    height: 40,
  },
  table: {
    width: wp(100)-24
  },
  head: {
    height: 40,
    backgroundColor: '#fff',
  },
  tableText: {
    fontSize: 13,
    textAlign: 'center',
    padding: 0,
    color: '#222',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 12
  },
  selectStyle: {color: '#222', width: wp(48), backgroundColor: '#fff'},
  valueStyle: {
    flex: 1,
    color: '#222',
    textAlign: 'left',
    fontSize: 14
  },
  back:{
    width: wp(100)-24,
height: 84,
backgroundColor: '#CAE9FF',
borderRadius: 10,
overflow: 'hidden',
alignSelf:'center',
  },
  rtext:{
    fontSize: 14,
color: '#FF9F1C',
  },
  xxtext:{
fontSize: 15,
color: '#212529',
  }
});

export default connector(MaterialApprovalDetail);
