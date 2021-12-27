import CancelAndConfirm from '@/components/cancelAndConfirm';
import Touchable from '@/components/Touchable/Touchable';
import { getCurrentUser } from '@/config/authority';
import { RootState } from '@/models/index';
import { submit } from '@/service/expenseClaim';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Func from '@/utils/Func';
import { customStyles } from '@/utils/styles';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { Row, Rows, Table } from 'react-native-table-component';
import { connect } from 'react-redux';
import { Toast } from 'teaset';
import {px2dp, scaleSizeH, scaleSizeW, setSpText, wp} from '@/utils/index';


const mapStateToProps = ({ expenseClaim, loading }: RootState) => ({
  expenseClaim,
  // loading: loading.effects['affairs/fetchAffairsDetail'],
});

const connector = connect(mapStateToProps);

//费用审批详情
class ExpenseApprovalDetail extends React.Component<any> {
  state = {
    projectItem: {},
    leftIsSubmitting: false,
    isSubmitting: false,
    isViewPhoto:false,
    index:0
  };

  user = {};

  async componentDidMount(): void {
    this.user = await getCurrentUser();
    const {
      dispatch,
      route: {
        params: { id },
      },
    } = this.props;
    dispatch({
      type: 'expenseClaim/detail',
      payload: { id },
    });
  }

  componentWillUnmount(): void {
    this.props.dispatch({
      type: 'expenseClaim/clearDetail'
    });
  }

  optionsChange = {
    tableHead: ['项目', '金额'],
    tableData: [],
  };

  handleSubmitOperation = async (status) => {
    const {
      expenseClaim: { expenseClaimDetail },
    } = this.props;
    const params = {
      id: expenseClaimDetail.id,
      status
    };
    if (status === 2) this.setState({ isSubmitting: true });
    else this.setState({ leftIsSubmitting: true });
    const res = await submit(params);
    if (res.success) {
      Toast.success('操作成功');
      this.setState({ isSubmitting: false, leftIsSubmitting: false });
      this.props.navigation.goBack();
    }
  };

  flag = false

  handViewPhoto=(index:number=0)=>{
    this.setState({isViewPhoto:!this.state.isViewPhoto,index});
  }

  render() {
    const { fileList, projectItem, isSubmitting, leftIsSubmitting ,isViewPhoto,index} = this.state;
    const {
      expenseClaim: { expenseClaimDetail },
    } = this.props;
    
    const { expenseClaimDetailList, invoiceAttachList } = expenseClaimDetail;
    // expenseClaimDetailList
    if (!Func.isEmptyObject(expenseClaimDetailList) && !this.flag) {
      expenseClaimDetailList.map((i) => {
        this.optionsChange.tableData.push([
          <Text style={styles.tableText}>{i.category}</Text>,
          <Text style={styles.tableText}>{i.amount}元</Text>,
        ]);
      }
      );
      this.flag = true;
    }
    let images=[];
    invoiceAttachList.forEach((item)=>{
      images.push(`${Config.FILE_URL}${item.name}`);
    });
// if(isViewPhoto){
//   return <LookPhotoModal curentImage={index} imaeDataUrl={images} cancel={this.handViewPhoto}/>;
// }
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.container]}>
         <View style={[styles.xxxx]}>
         <View style={styles.itemStyle}>
            <Text style={customStyles.text}>项目：</Text>
            <Text style={styles.rText}>{expenseClaimDetail.projectName}</Text>
          </View>
          <View style={styles.itemStyle}>
            <Text style={customStyles.text}>事由：</Text>
            <Text style={styles.xxText}>{expenseClaimDetail.reason}</Text>

          </View>
          <View style={styles.itemStyle}>
            <Text style={customStyles.text}>费用总额：</Text>
            <Text style={styles.rText}>{expenseClaimDetail.totalAmount}元</Text>

          </View>
         </View>
          <View
              style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: scaleSizeH(4),
            }}>
            <Text style={customStyles.text}>费用明细：</Text>
          </View>
          <Table
              borderStyle={{ borderWidth: 1, borderColor: '#DFE2E5' }}
              style={styles.table}>
            <Row
                flexArr={[4, 1]}
                data={this.optionsChange.tableHead}
                style={styles.head}
                textStyle={[customStyles.text, { textAlign: 'center',color:'#F71735' }]}
            />
            <Rows
                flexArr={[4, 1]}
                data={this.optionsChange.tableData}
                style={styles.rowsStyle}
                textStyle={[customStyles.text, { textAlign: 'center' }]}
            />
          </Table>
          <View style={styles.uploadFile}>
            <Text style={customStyles.text}>发票附件：</Text>
            <View style={styles.imageViewStyle}>
              {invoiceAttachList && invoiceAttachList.length !== 0
                ? invoiceAttachList.map((item, index) => (
                  <Touchable
                      key={item.id}
                      onPress={()=>this.handViewPhoto(index)}
                  >
                   <Image source={{uri:`${Config.FILE_URL}${item.name}`}} style={styles.uploadedImageStyle}/>
                  </Touchable>
                ))
                : null}
            </View>
          </View>
        </ScrollView>
        {
          expenseClaimDetail.status === 1 && <CancelAndConfirm
              onLeftClick={() => this.handleSubmitOperation(3)}
              disabled={isSubmitting}
              onRightClick={() => this.handleSubmitOperation(2)}
              leftText={'驳回'}
              rightText={'通过'}
              style={{marginVertical:px2dp(12)}}
          />
        }

      </View>
    );
  }
}

const styles = MyStyleSheet.create({
  tableText: {
    fontSize: 13,
    textAlign: 'center',
    padding: 0,
    color: '#222',
  },
  uploadFile: {
    marginTop: 8,
    paddingBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  containerinput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#222',
    borderRadius: 2,
    width: wp(60),
    backgroundColor: '#fff',
  },
  inputStyle: {
    padding: 0,
    fontSize: 14,
    color: '#333',
    height:30,
    width: wp(50),
  },
  rowsStyle: {
    height: 40
  },
  table: {
    width: wp(90),
    left: 12
  },
  head: {
    height:40
  },
  tableInput: {
    padding: 0,
    fontSize:13,
    color: '#222',
    textAlign: 'center',
  },
  selectStyle: { color: '#222', width: wp(48), backgroundColor: '#fff' },
  valueStyle: {
    flex: 1,
    color: '#222',
    textAlign: 'left',
    fontSize: 14
  },
  uploadedImageStyle: {
    width: 100,
    height: 100,
    margin:4,
    borderRadius:4,
    overflow: 'hidden'
  },
  imageViewStyle: {
    flexDirection: 'row',
    alignItems:'flex-start',
    flexWrap:'wrap'
  },
  xxxx:{
    width: wp(100)-24,
    height: 84,
    backgroundColor: '#CAE9FF',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf:'center',
  },
  rText:{
    fontSize:14,
    color: '#FF9F1C',
    textAlign: 'center',
  },
  xxText:{
    fontSize:14,
    color: '#F71735',
    textAlign: 'center',
  }
});

export default connector(ExpenseApprovalDetail);
