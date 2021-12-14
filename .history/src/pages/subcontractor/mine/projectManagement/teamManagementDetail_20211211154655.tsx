import DataTable from '@/components/dataTable';
import React, {useEffect, useMemo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

let tableDatas = [
  {
    dachenglv: '114',
    fenqudao: '门店1',
    huodanjia: '332.635998',
    jiaoyicishu: '1549',
    jinewan: '70',
    shuliang: '60',
    liandailv: '1.5',
    yusuanwan: '80',
  },
  {
    dachenglv: '200',
    fenqudao: '门店2',
    huodanjia: '474.964759',
    jiaoyicishu: '11654',
    jinewan: '20',
    shuliang: '20',
    liandailv: '2',
    yusuanwan: '40',
  },
  {
    dachenglv: '50',
    fenqudao: '门店3',
    huodanjia: '434.252905',
    jiaoyicishu: '9728',
    jinewan: '10',
    shuliang: '8',
    liandailv: '0.5',
    yusuanwan: '5',
  },
];

const TeamManagementDetail = props => {
  const {
      route:{
    params: {id},
      }
  } = props;
  const dispatch = useDispatch();

  const {
    team: {
      ConstructionTeamDetail,
      getTeamMemberPage: {list, pagination},
    },
    equipment:{
        equipmentList: {list: eList},
    },
    materialStock: {
        materialStockList: {list: stockList},
      },
  } = useSelector(state => ({
    team: state.team,
    equipment: state.equipment,
    materialStock:state.materialStock
  }));

  useEffect(() => {
    sendRequest();
    return () => {
      dispatch({
        type: 'team/clearTeamManagementDetail',
      });
    };
  }, []);

  const sendRequest = () => {
    dispatch({
      type: 'team/detail',
      payload: {id},
    });
    dispatch({
      type: 'team/getTeamMemberPage',
      payload: {deptId: id, size: 999},
    });
    dispatch({
      type: 'equipment/page',
      payload: {rightToUseId: id, size: 999},
    });
    dispatch({
      type: 'materialStock/page',
      payload: {teamId: id, size: 999},
    });
  };

  const userList=useMemo(()=>{
        return list&&list.length>0&&list.map(item=>({
            userName:item.userName,
            age:item.age,
            phone:item.phone,
            status:item.status,
        }));
  },[list]);

  const cstockList=useMemo(()=>{
    return stockList&&stockList.length>0&&stockList.map(item=>({
        name:item.name,
        unit:item.unit,
        number:item.number===-1?0:Number(item.number).toFixed(0),
    }));
},[stockList]);

const equeList=useMemo(()=>{
    return eList&&eList.length>0&&eList.map(item=>({
        name:item.name,
        purchasingDate:item.purchasingDate,
        warrantyPeriod:item.warrantyPeriod
    }));
},[eList]);

  return (
    <View style={styles.container}>
        <View style={styles.headerw}> 
            <View>
                <Text style={styles.ji}>基本信息</Text>
            </View>
            <View style={styles.xxx}>
                <View style={styles.imges}/>
                <View style={{
                    marginLeft:8
                }}>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Text style={[styles.leftText]}>队长：</Text>
                  <Text style={[styles.leftText,{color:'#E6C229'}]}>xxxxx</Text>
                </View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Text style={[styles.leftText]}>队员：</Text>
                  <Text style={[styles.leftText,{color:'#E6C229'}]}>xxxxx</Text>
                </View>
                <View>
                    <Text style={styles.rtext}>1131231231</Text>
                </View>
                </View>
            </View>
        </View>
      <DataTable
          leftKey="userName" 
          head={[
          {name: '姓名'},
          {name: '年龄', sort: 'esc'},
          {name: '联系方式'},
          {name: '状态'},
        ]}
          list={userList} 
          dataKeys={[
          'age',
          'phone',
          'status',
        ]} 
          onClickItemCell={(item, row, column) => {
          console.log(item, row, column);
        }}
      />
      <DataTable
          leftKey="name" 
          head={[
          {name: '设备名称'},
          {name: '购买日期'},
          {name: '设备保修期', sort: 'esc'},
        ]}
          list={equeList} 
          dataKeys={[
          'purchasingDate',
          'warrantyPeriod',
        ]} 
          onClickItemCell={(item, row, column) => {
          console.log(item, row, column);
        }}
        //    customRowStyles={{header:'#39BAB5',jRow:'#68D8D6',oRow:'#BDECEF'}}
      />
       <DataTable
           leftKey="name" 
           head={[
          {name: '项目'},
          {name: '单位'},
          {name: '数量', sort: 'esc'},
        ]}
           list={cstockList} 
           dataKeys={[
          'unit',
          'number',
        ]} 
           onClickItemCell={(item, row, column) => {
          console.log(item, row, column);
        }}
           customRowStyles={{header:'#39BAB5',jRow:'#68D8D6',oRow:'#BDECEF'}}
      />
    </View>
  );
};

export default TeamManagementDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  leftText:{
    fontSize: 16,
    fontFamily: 'Adobe Heiti Std',
    color: '#575757'
  },
  ji:{
    fontSize: 18,
    fontFamily: 'SimHei',
    color: '#212529'
  },
  imges:{
    width: 64,
height: 64,
borderRadius: 4,
overflow: 'hidden',
backgroundColor: 'red'
  },
  xxx:{
      flexDirection:'row',
      marginTop:9
  },
  rtext:{
    fontSize: 15,
    fontFamily: 'SimHei',
    color: '#00A6FB'
  },
  headerw:{
    backgroundColor:'#fff',
    padding:15
  }
    
  
});
