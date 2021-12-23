import IconFont from '@/assets/svgs';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import Touchable from '@/components/Touchable/Touchable';
import {selectDeptUser} from '@/service/user';
import {px2dp} from '@/utils/';
import {wp} from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Func from '@/utils/Func';
import {customStyles} from '@/utils/styles';
import WaterproofFunc from '@/utils/WaterproofFunc';
import {Toast} from '@ant-design/react-native';
import {useUpdate} from 'ahooks';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  PanResponder,
} from 'react-native';
import Picker from 'react-native-picker';
import axios from 'axios';
import {Controller, useForm} from 'react-hook-form';
import {
  Row,
  Rows,
  Table,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {Select} from 'teaset';

const AddProject = props => {
  const {navigation} = props;
  const [tableData, setTableData] = useState(() => {
    if (props.route.params) {
      if (
        !Func.isEmptyObject(
          props.route.params.ProjectManagementDetail.contractAreaList,
        )
      ) {
        return props.route.params.ProjectManagementDetail.contractAreaList.map(
          (item, index) => [item.parts, item.contractArea],
        );
      }
    }
    return [[null, '']];
  });
  const [newData, setNewData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [managerName, setManagerName] = useState(() =>
    props.route.params
      ? props.route.params.ProjectManagementDetail.projectManagerName
      : '',
  );
  const [managerId, setManagerId] = useState(() =>
    props.route.params
      ? props.route.params.ProjectManagementDetail.projectManagerId
      : '',
  );
  const {
    team: {
      TeamList: {list},
      teamInit: {partsInit},
    },
  } = useSelector(state => ({
    team: state.team,
  }));
  const [constructItem, setConstructItem] = useState({});
  const [iconStyle, setIconStyle] = useState({});
  const {control, handleSubmit, reset, getValues} = useForm();
  const viewRef = useRef(null);
  const dispatch = useDispatch();
  const optionsChange = useRef({
    tableHead: ['部位', '合同面积(m²)'],
    tableData: [],
  });
  const mapRef = useRef(null);
  const [location, setLocation] = useState('');
  const update = useUpdate();
  const wrapperPanResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: (e, g) => true,
    onPanResponderGrant: () => {
        console.log('wrapperPanResponder===GRANTED TO WRAPPER');
    },
    onPanResponderMove: (evt, gestureState) => {
        console.log('wrapperPanResponder===WRAPPER MOVED');
    }
}));

const viewPanResponder = useRef(PanResponder.create({
  onStartShouldSetPanResponder: (e, g) => true,
  onPanResponderGrant: () => {
      console.log('viewPanResponder====GRANTED TO SCROLLER');
  },
  onPanResponderMove: (evt, gestureState) => {
      console.log('viewPanResponder===SCROLLER MOVED');
  }
}));

  useEffect(() => {
    dispatch({
      type: 'team/list',
      payload: {},
    });
    dispatch({
      type: 'team/teamInit',
      payload: {},
    });
    const fetchData = async () => {
      const response = await selectDeptUser({roleName: '项目经理'});
      if (response.success) {
        let newData = transFormData(response.data);
        setNewData(newData);
        setFetchedData(response.data);
      }
    };
    fetchData();
  }, []);

  const transFormData = data => {
    return data.map((item, index) => {
      if (item.hasChildren) {
        let children = item.children.map((item, index) => item.title);
        return {[item.title]: children};
      }
    });
  };

  const addtableRow = () => {
    if (!WaterproofFunc.isTableEmpty(tableData)) {
      tableData.push([null, '']);
      update();
    } else {
      Toast.fail('请输入完整后再增加');
    }
  };

  const minustableRow = () => {
    if (tableData.length > 1) {
      tableData.pop();
      update();
    } else {
      Toast.fail('不能再减少了');
    }
  };

  const areaSelect = (data, index, rowIndex) => (
    <Select
        style={styles.selectUnitStyle}
        value={data}
        valueStyle={styles.valueStyle}
        items={partsInit}
        getItemValue={(item, index) => item.dictValue}
        getItemText={(item, index) => item.dictValue}
        iconTintColor="#333"
        placeholder="请选择部位"
        pickerTitle="请选择部位"
        placeholderTextColor={'#999'}
        onSelected={(item, i) => {
        tableData[rowIndex][index] = item.dictValue;
        update();
      }}
        icon={'none'}
    />
  );

  const inputSelect = (data, index, rowIndex) => (
    <TextInput
        keyboardType={'decimal-pad'}
        value={data}
        style={styles.tableInput}
        underlineColorAndroid={'transparent'}
        onChangeText={text => {
        tableData[rowIndex][index] = text;
        update();
      }}
    />
  );

  const selectSecondComponent = (data, index, rowIndex) => {
    switch (index) {
      case 0:
        return areaSelect(data, index, rowIndex);
      case 1:
        return inputSelect(data, index, rowIndex);
    }
  };

  const onSelected = (item, index) => {
    setConstructItem(item);
  };

  const addCaptain = () => {
    Picker.init({
      pickerData: newData,
      selectedValue: [],
      wheelFlex: [2],
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择项目经理',
      pickerCancelBtnColor: [123, 123, 123, 1],
      pickerConfirmBtnColor: [60, 133, 255, 1],
      pickerBg: [255, 255, 255, 1],
      pickerFontColor: [45, 45, 45, 1],
      onPickerConfirm: onPickerConfirm,
    });
    Picker.show();
  };

  const onPickerConfirm = data => {
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].hasChildren) {
        for (let j = 0; j < fetchedData[i].children.length; j++) {
          if (
            fetchedData[i].title === data[0] &&
            fetchedData[i].children[j].title === data[1]
          ) {
            setManagerId(fetchedData[i].children[j].id);
            setManagerName(fetchedData[i].children[j].title);
          }
        }
      }
    }
  };

  const _handleMessage = event => {
    console.log('handleMessage', event.nativeEvent.data);
    const data = JSON.parse(event.nativeEvent.data);
    if (data.centerInfo) {
      const str = `https://restapi.amap.com/v3/geocode/regeo?key=af4503155f02aceb076cff16d94ed6e6&location=${
        data.centerInfo.longitude + ',' + data.centerInfo.latitude
      }`;
      axios.get(str).then(r => {
        if (r.status === 200 && r.data.status === '1') {
          const regeocode = r.data.regeocode;
          if (regeocode) setLocation(regeocode);
        }
      });
    }
  };

  const _onLoad = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.log('nativeEvent', nativeEvent);
  };

  let source;
  if (Platform.OS === 'ios') {
    source = require('../../../html/bdMap.html');
  } else if (Platform.OS === 'android') {
    source = {uri: 'file:///android_asset/html/ProjectMap.html'};
  }

  const onFinish = () => {};

  function onError(errors) {
    if (Object.keys(errors).length > 0) {
      Toast.fail(errors[Object.keys(errors)[0]].message);
      return;
    }
  }

  return (
    <View style={styles.container} {...wrapperPanResponder.current.panHandlers}>
      <ScrollView style={{flex: 1, marginHorizontal: px2dp(16)}} >
        <View style={styles.item}>
          <Text style={styles.leftText}>项目名称</Text>
          <Controller
              control={control}
              name="projectName"
              defaultValue={''}
              rules={{
              required: '请输入项目名称',
            }}
              render={({field}) => (
              <TextInput
                  style={[customStyles.inputProjectStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入"
                  placeholderTextColor={'#CED4DA'}
              />
            )}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.leftText}>项目甲方</Text>
          <Controller
              control={control}
              name="party"
              defaultValue={''}
              rules={{
              required: '请输入项目甲方',
            }}
              render={({field}) => (
                <TextInput
                    style={[customStyles.inputProjectStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
            />
            )}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.leftText}>项目总包方</Text>
          <Controller
              control={control}
              name="generalContractor"
              defaultValue={''}
              rules={{
              required: '请输入项目总包方',
            }}
              render={({field}) => (
                <TextInput
                    style={[customStyles.inputProjectStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
            />
            )}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.leftText}>合同面积</Text>
          <Text onPress={addtableRow} style={{color: '#000'}}>
            ++++++++++++++
          </Text>
          <Text onPress={minustableRow} style={{color: '#000'}}>
            -----------=====
          </Text>
        </View>

        <Table
            borderStyle={{borderWidth: 1, borderColor: '#9E9E9E'}}
            style={styles.table}>
          <Row
              data={optionsChange.current.tableHead}
              style={styles.head}
              textStyle={[customStyles.text, {textAlign: 'center'}]}
              flexArr={[1, 1]}
          />
          {tableData.map((rowData, index) => (
            <TableWrapper
                key={index}
                style={{
                flexDirection: 'row',
                backgroundColor: '#f9f9f9',
              }}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                    key={cellIndex}
                    data={selectSecondComponent(cellData, cellIndex, index)}
                    textStyle={[customStyles.text, {textAlign: 'center'}]}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>

        <View style={styles.item}>
          <Text style={styles.leftText}>材料品牌</Text>
          <Controller
              control={control}
              name="materialBrand"
              defaultValue={''}
              rules={{
              required: '请输入材料品牌',
            }}
              render={({field}) => (
                <TextInput
                    style={[customStyles.inputProjectStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
            />
            )}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.leftText}>施工队伍</Text>
          <Select
              style={styles.containerinputx}
              value={constructItem.id}
              valueStyle={styles.valueStyle}
              items={list}
              getItemValue={(item, index) => item.id}
              getItemText={(item, index) => item.deptName}
              iconTintColor="#333"
              placeholder="请选择施工队伍"
              pickerTitle="请选择施工队伍"
              placeholderTextColor={'#999'}
              onSelected={onSelected}
              icon={'none'}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.leftText}>项目经理</Text>
          <Touchable onPress={addCaptain}>
            <Text
                style={[
                customStyles.text,
                {color: managerName ? '#333' : '#999', marginLeft: px2dp(8)},
              ]}>
              {managerName ? managerName : '请选择项目经理'}
            </Text>
          </Touchable>
        </View>

        <View style={[styles.item,{alignItems: 'flex-start'}]}>
          <Text style={styles.leftText}>项目位置</Text>
          <Touchable>
            <Text
                style={[
                customStyles.text,
                {color: location ? '#333' : '#999', marginLeft: px2dp(8),width:wp(74),},
              ]}>
              {location ? location.formatted_address : '正在获取位置'}
            </Text>
          </Touchable>
        </View>

        <View
            {...viewPanResponder.current.panHandlers}
            onLayout={e => {
            if (e.nativeEvent.layout) {
              setIconStyle({
                top: e.nativeEvent.layout.height / 2 - px2dp(8),
                left: e.nativeEvent.layout.width / 2,
              });
            }
          }}>
          <View style={[{position: 'absolute', zIndex: 20}, iconStyle]}>
            <IconFont name="weizhi" />
          </View>
          <WebView
              ref={mapRef}
              containerStyle={{height: px2dp(200), width: '100%', flex: 0}}
              source={source}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              geolocationEnabled={true}
              androiddomStorageEnabled={false}
              originWhitelist={['*']}
              onMessage={_handleMessage}
              onLoad={_onLoad}
            // injectedJavaScript={patchPostMessageJsCode}
          />
        </View>
      </ScrollView>

      <CancelAndConfirm
          onLeftClick={() => {
          navigation.goBack();
        }}
          onRightClick={handleSubmit(onFinish, onError)}
          style={{marginVertical:px2dp(16)}}
      />
    </View>
  );
};

export default AddProject;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  table: {
    width: wp(90),
    left: 12,
    marginTop: 10,
  },
  head: {
    height: 40,
  },
  tableInput: {
    padding: 0,
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  selectUnitStyle: {
    color: '#222',
    width: 161,
    backgroundColor: '#fff',
  },
  valueStyle: {
    flex: 1,
    color: '#333',
    textAlign: 'left',
    fontSize: 14,
  },
  containerinput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#222',
    borderRadius: 2,
    width: wp(70),
    backgroundColor: '#fff',
  },
  leftText: {
    fontSize: 14,
    color: '#6C757D',
  },
  containerinputx: {
    borderWidth: 0,
    width: wp(70),
    backgroundColor: '#fff',
  },
});
