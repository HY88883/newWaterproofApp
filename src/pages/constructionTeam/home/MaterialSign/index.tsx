import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {customStyles} from '@/utils/styles';
import {px2dp, scaleSizeH, scaleSizeW, setSpText, wp} from '@/utils/index';
import {Row, Rows, Table,TableWrapper,Cell} from 'react-native-table-component';
import Func from '@/utils/Func';
import {submit} from '@/service/materialStock';
import {Select,Wheel} from 'teaset';
import {RootState} from '@/models/index';
import {connect} from 'react-redux';
import {getCurrentUser} from '@/config/authority';
import WaterproofFunc from '@/utils/WaterproofFunc';
import { Toast } from '@ant-design/react-native';
import Touchable from '@/components/Touchable/Touchable';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import IconFont from '@/assets/svgs';

const mapStateToProps = ({projectManage, constructionRecord,loading}: RootState) => ({
    projectManage,
    constructionRecord,
    // loading: loading.effects['affairs/fetchAffairsDetail'],
});

const connector = connect(mapStateToProps);

//物料签收
class MaterialSign extends React.Component<any> {
    state={
        isSubmitting:false,
        projectItem:{},
        tableData:[[null,null,'']],
        wastedMaterialData:[[null,null,'']]
    }

    materialList:any[]=[]

    user={}

    optionsChange = {
        tableHead: ['材料名称', '单位','数量'],
        tableData: [
        ],
    };

    async componentDidMount(): void {
        this.user=await getCurrentUser();
        this.setOptions();
        const {dispatch}=this.props;
        dispatch({
            type:'projectManage/page',
            payload:{
                size:999,
                current:1
            }
        });
        dispatch({
            type: 'constructionRecord/constructionRecordInit',
        });
    }

    setOptions = () => {
        /*this.props.navigation.setOptions({
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>

            </View>
          ),
        });*/
    };

    handleSubmit=async ()=>{
        const {projectItem,tableData,wastedMaterialData}=this.state;
        if(Func.isEmptyObject(projectItem)){
            Toast.fail('请选择项目');
            return;
        }
        if(WaterproofFunc.isTableEmpty(tableData)&&WaterproofFunc.isTableEmpty(wastedMaterialData)){
            Toast.fail('数据不能为空');
            return;
        }
        this.transformDetailList(tableData,wastedMaterialData);
        this.setState({isSubmitting:true});
        const res=await submit(this.materialList);
        // projectId
        if(res.success){
            Toast.success('操作成功');
            this.setState({isSubmitting:false});
            this.props.navigation.goBack();
        }
    }

    transformDetailList=(tableData,wastedMaterialData)=>{
            for(let i=0;i<tableData.length;i++){
                let obj={},tableDataItem=tableData[i];
                if(!WaterproofFunc.isRowEmpty(tableDataItem)) {
                    obj.category='防水主材';
                    obj.teamId=this.user.deptId;
                    obj.projectId=this.state.projectItem.id;
                    for(let j = 0; j < tableDataItem.length; j++){
                        if(j==0)        obj['name']=tableDataItem[j];
                        else if(j==1)         obj['unit']=tableDataItem[j];
                        else obj['number']=tableDataItem[j];
                    }
                    this.materialList.push(obj);
                }
            }
            for(let i=0;i<wastedMaterialData.length;i++){
                let obj={},wastedMaterialDataItem=wastedMaterialData[i];
                if(!WaterproofFunc.isRowEmpty(wastedMaterialDataItem)) {
                    obj.category='易耗品';
                    obj.teamId=this.user.deptId;
                    obj.projectId=this.state.projectItem.id;
                    for(let j = 0; j < wastedMaterialDataItem.length; j++){
                        if(j==0)        obj['name']=wastedMaterialDataItem[j];
                        else if(j==1)         obj['unit']=wastedMaterialDataItem[j];
                        else obj['number']=wastedMaterialDataItem[j];
                    }
                    this.materialList.push(obj);
                }
            }
    }

    addtableRow=()=>{
        if(!WaterproofFunc.isTableEmpty(this.state.tableData)) {
            this.state.tableData.push([null, null, '']);
            this.forceUpdate();
        }else {
            Toast.fail('请输入完整后再增加');
        }
    }

    minustableRow=()=>{
        if(this.state.tableData.length>1){
            this.state.tableData.pop();
            this.forceUpdate();
        }else {
            Toast.fail('不能再减少了');
        }

    }

    addtableRowSecond=()=>{
        if(!WaterproofFunc.isTableEmpty(this.state.wastedMaterialData)) {
            this.state.wastedMaterialData.push([null,null,'']);
            this.forceUpdate();
        }else{
            Toast.fail('请输入完整后再增加');
        }
    }

    minustableRowSecond=()=>{
        if(this.state.wastedMaterialData.length>1) {
            this.state.wastedMaterialData.pop();
            this.forceUpdate();
        }else {
            Toast.fail('不能再减少了');
        }
    }

    render() {
        const {isSubmitting,projectItem,tableData,wastedMaterialData}=this.state;
        const {projectManage:{ProjectManagement:{list}},constructionRecord: {
            constructionRecordInit: {shigongbuwei, fangshuizhucai, technology,wastedMaterialRequisitionList},
        },}=this.props;
        const materialSelect=(data,index,rowIndex)=>(
            <Select
                style={styles.selectUnitStyle}
                value={data}
                valueStyle={styles.valueStyle}
                items={fangshuizhucai}
                getItemValue={(item, index) => item.dictValue}
                getItemText={(item, index) => item.dictValue}
                iconTintColor="#333"
                placeholder="请选择材料名称"
                pickerTitle="请选择材料名称"
                placeholderTextColor={'#999'}
                onSelected={(item, i) =>{
                    this.state.tableData[rowIndex][index]=item.dictValue;
                    this.forceUpdate();
                }
                }
                icon={'none'}
            />
        );
        const unitSelect=(data,index,rowIndex)=>(
            <Select
                style={styles.selectUnitStyle}
                value={data}
                valueStyle={styles.valueStyle}
                items={[{unitValue:'千克'},{unitValue:'平方米'}]}
                getItemValue={(item, index) => item.unitValue}
                getItemText={(item, index) => item.unitValue}
                iconTintColor="#333"
                placeholder="请选择单位"
                pickerTitle="请选择单位"
                placeholderTextColor={'#999'}
                onSelected={(item, i) =>
                {
                    this.state.tableData[rowIndex][index]=item.unitValue;
                    this.forceUpdate();
                }
                }
                icon={'none'}
            />
        );
        const nubmerSelect=(data,index,rowIndex)=>(
            <TextInput
                keyboardType={'decimal-pad'}
                value={data}
                style={styles.tableInput}
                underlineColorAndroid={'transparent'}
                onChangeText={text=>{
                    this.state.tableData[rowIndex][index]=text;
                    this.forceUpdate();
                }}
            />
        );
        const  selectComponent=(data,index,rowIndex)=>{
            switch (index) {
                case 0:return materialSelect(data,index,rowIndex);
                case 1:return unitSelect(data,index,rowIndex);
                case 2:return nubmerSelect(data,index,rowIndex);
            }
        };
        const wastedMaterialSelect=(data,index,rowIndex)=>(
            <Select
                style={styles.selectUnitStyle}
                value={data}
                valueStyle={styles.valueStyle}
                items={wastedMaterialRequisitionList}
                getItemValue={(item, index) => item.dictValue}
                getItemText={(item, index) => item.dictValue}
                iconTintColor="#333"
                placeholder="请选择材料名称"
                pickerTitle="请选择材料名称"
                placeholderTextColor={'#999'}
                onSelected={(item, i) =>{
                    this.state.wastedMaterialData[rowIndex][index]=item.dictValue;
                    this.forceUpdate();
                }
                }
                icon={'none'}
            />
        );
        const inputSelect=(data,index,rowIndex)=>(
            <TextInput
                value={data}
                style={styles.tableInput}
                underlineColorAndroid={'transparent'}
                onChangeText={text=>{
                    this.state.wastedMaterialData[rowIndex][index]=text;
                    this.forceUpdate();
                }}
            />
        );
        const  selectSecondComponent=(data,index,rowIndex)=>{
            switch (index) {
                case 0:return wastedMaterialSelect(data,index,rowIndex);
                case 1:return inputSelect(data,index,rowIndex);
                case 2:return inputSelect(data,index,rowIndex);
            }
        };
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={styles.itemStyle}>
                        <Text style={customStyles.text}>项目</Text>
                        <Select
                            style={[styles.selectStyle,{marginLeft: px2dp(8)}]}
                            value={projectItem.id}
                            valueStyle={styles.valueStyle}
                            items={list}
                            getItemValue={(item, index) => item.id}
                            getItemText={(item, index) => item.projectName}
                            iconTintColor="#333"
                            placeholder="请选择项目"
                            pickerTitle="请选择项目"
                            placeholderTextColor={'#999'}
                            onSelected={(item, index) =>
                                this.setState({projectItem: item})
                            }
                            icon={'none'}
                        />
                    </View>
                    <View style={styles.fangshui}>
                        <Text style={[customStyles.text,]}>防水主材</Text>
                        <Touchable onPress={this.addtableRow}>
                        <IconFont name={'jia'} style={{marginHorizontal: px2dp(8)}} />
                        </Touchable>
                        <Touchable onPress={this.minustableRow}>
                        <IconFont
                            name={'jianshao'}
              />
                        </Touchable>
                    </View>
                    <Table
                        borderStyle={{borderWidth: 1, borderColor: '#333'}}
                        style={styles.table}>
                        <Row
                            data={this.optionsChange.tableHead}
                            style={styles.head}
                            textStyle={[customStyles.text, {textAlign: 'center'}]}
                            flexArr={[1,1,1]}
                        />
                        {
                            tableData.map((rowData,index)=>(
                                <TableWrapper key={index} style={ { flexDirection: 'row', backgroundColor: '#fff' }}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={selectComponent(cellData, cellIndex,index)} textStyle={[customStyles.text, {textAlign: 'center'}] }/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                    <View style={styles.fangshui}>
                        <Text style={[customStyles.text,{}]}>易耗品</Text>
                        <Touchable onPress={this.addtableRowSecond}>
                        <IconFont name={'jia'} style={{marginHorizontal: px2dp(8)}} />
                        </Touchable>
                        <Touchable onPress={this.minustableRowSecond}>
                        <IconFont
                            name={'jianshao'}
              />
                        </Touchable>
                    </View>
                    <Table
                        borderStyle={{borderWidth: 1, borderColor: '#333'}}
                        style={styles.table}>
                        <Row
                            data={this.optionsChange.tableHead}
                            style={styles.head}
                            textStyle={[customStyles.text, {textAlign: 'center'}]}
                            flexArr={[1,1,1]}
                        />
                        {
                            wastedMaterialData.map((rowData,index)=>(
                                <TableWrapper key={index} style={ { flexDirection: 'row', backgroundColor: '#fff' }}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={selectSecondComponent(cellData, cellIndex,index)} textStyle={[customStyles.text, {textAlign: 'center'}] }/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </ScrollView>
                <CancelAndConfirm
                    onLeftClick={() => {
                        this.props.navigation.goBack();
                    }}
                    onRightClick={this.handleSubmit}
                    disabled={isSubmitting}
                    style={{marginVertical:px2dp(12)}}
                />
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
        height:40,
    },
    table: {
        width: wp(90),
        left: 12,
        marginVertical :10
    },
    head: {
        height: 40
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
        paddingVertical: 12,
        paddingLeft:12
    },
    selectStyle: {color: '#222', width: wp(48), backgroundColor: '#fff',borderColor: '#222'},
    valueStyle: {
        flex: 1,
        color: '#222',
        textAlign: 'left',
        fontSize:14
    },
    selectUnitStyle: {color: '#222', width: 108, backgroundColor: '#fff'},
    tableInput: {
        padding: 0,
        fontSize:13,
        color: '#222',
        textAlign: 'center',
    },
    fangshui:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:4,marginLeft:12
    }
});

export default connector(MaterialSign);
