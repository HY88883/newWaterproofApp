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
            phone:item.age,
            status:item.status,
        }));
  },[list]);

  return (
    <View style={styles.container}>
      <DataTable
          leftKey="userName" //表格最左侧的行头字段属性key [String]  [必传]
          head={[
          {name: '姓名'},
          {name: '年龄', sort: 'esc'},
          {name: '联系方式'},
          {name: '状态'},
        ]}
          list={userList} 
          dataKeys={[
          'userName',
          'age',
          'phone',
          'status',
        ]} //表格中需要展示的列属性key，依次按照先后顺序展示  [必传，不传默认显示全部]
          onClickItemCell={(item, row, column) => {
          //点击右侧单元格的事件，事件回调返回行row，列column，以及点击内容 [function] [可选]
          //事件处理
          console.log(item, row, column);
        }}
          onClickHeadItemCell={(item, row, column) => {
          //点击表头头部单元格的事件，事件回调返回行row，列column，以及点击内容 [function] [可选]
          //事件处理
          console.log(item, row, column);
        }}
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
});
