import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  hp,
  px2dp,
  scaleSizeH,
  scaleSizeW,
  setSpText,
  viewportWidth,
  wp,
} from '@/utils/index';
import {customStyles} from '@/utils/styles';
import {RootState} from '@/models/index';
import {connect} from 'react-redux';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Func from '@/utils/Func';
import MyStyleSheet from '@/utils/CustomStyleSheet';

const mapStateToProps = ({team, loading}: RootState) => ({
  team,
  loading: loading.effects['team/getAttendanceTimeDetail'],
});

const connector = connect(mapStateToProps);

//出勤详情
class AttendanceRecordDetail extends React.Component<any> {
  state = {
    year: '',
    month: '',
    day: '',
  };

    count= 0
    dayFormatList= []

  componentDidMount(): void {
    const {id, item} = this.props.route.params;
    this.props.dispatch({
      type: 'team/getAttendanceRecordDetail',
      payload: {userId: id},
    });
    this.setOpts(item);
  }

  componentWillUnmount(): void {
    this.props.dispatch({
      type: 'team/clearAttendanceRecordDetail',
    });
  }

  setOpts = (item) => {
    console.log(item);
    this.props.navigation.setOptions({
      headerRight: () => (
        <Text style={[customStyles.text, {marginRight:px2dp(12)}]}>
          {item.userName} {item.days}天
        </Text>
      ),
    });
  };

  handleDayPress = (day) => {
    const {id, item} = this.props.route.params;
    const params = {
      date: day.dateString,
      userId: id,
    };
    this.props.dispatch({
      type: 'team/getAttendanceTimeDetail',
      payload: params,
    });
  };

  render() {
    const {year, month, day} = this.state;
    const {
      team: {attendanceRecordDetail, attendanceTimeDetail},
      loading,
    } = this.props;
    let markedDates = {};
    if (!Func.isEmptyObject(attendanceRecordDetail) && this.count&&!Func.isEmptyObject(this.dayFormatList)) {
      attendanceRecordDetail.map((i) => {
        markedDates[i] = {selected: true, selectedColor: '#3C85FF'};
      });
      for (let i = 0; i < this.count; i++) {
        if (!markedDates[this.dayFormatList[i]])
          markedDates[this.dayFormatList[i]] = {disableTouchEvent: true};
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>
          {year ? year : '-'}年{month ? month : '-'}月
        </Text>
        <Calendar
            markingType={'dot'}
            theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            // textSectionTitleColor: '#999999',
            // textSectionTitleDisabledColor: '#999999',
            // selectedDayBackgroundColor: '#EFEFEF',
            selectedDayTextColor: '#666',
            todayTextColor: '#666666',
            dayTextColor: '#666666',
            textDisabledColor: '#999999',
            // dotColor: 'red',
            // selectedDotColor: 'red',
            // indicatorColor: 'blue',
            textDayFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: setSpText(15),
            textMonthFontSize: setSpText(15),
            textDayHeaderFontSize: setSpText(15),
          }}
            markedDates={markedDates}
            hideArrows={true}
            hideExtraDays={false}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={true}
            showWeekNumbers={false}
            disableArrowLeft={true}
            disableArrowRight={true}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={(date) => {
            console.log(date);
            this.count = Func.GetMonthDayCount(
              date.getFullYear(),
              date.getMonth() + 1,
            );
            for (let i = 1; i <= this.count; i++) {
              let month =
                date.getMonth() + 1 < 10
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1;
              let day = i < 10 ? '0' + i : i;
              this.dayFormatList.push(date.getFullYear() + '-' + month + '-' + day);
            }
            if(!year&&!month&&!day){
 this.setState({
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
            });
            }
          }}
            enableSwipeMonths={false}
            onDayPress={this.handleDayPress}
        />
        <View style={{paddingLeft: px2dp(12)}}>
          <Text style={[customStyles.text, {lineHeight: scaleSizeH(25)}]}>
            {year}年{month}月{day}日
          </Text>
          {/*<Text style={[customStyles.text,{lineHeight:scaleSizeH(25)}]}>项目： 地铁3期项目</Text>*/}
        </View>
        <ScrollView style={{flex: 1, marginTop: scaleSizeH(40)}}>
          {loading ? (
            <View style={styles.oneloading}>
              <ActivityIndicator size={'large'} color={'#0066FF'} />
            </View>
          ) : (
            attendanceTimeDetail.length > 0 &&
            attendanceTimeDetail.map((i,_i) => (
              <View style={styles.dayStle} key={_i}>
                <Text style={styles.dayText}>{i.workingShift}</Text>
                <Text style={styles.dayText}>
                  {i.duration ? i.duration + '小时' : null}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = MyStyleSheet.create({
  calendar: {alignSelf: 'center'},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    paddingVertical: 8
  },
  dayStle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10
  },
  dayText: {
    color: '#333',
    fontSize: 18
  },
  oneloading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default connector(AttendanceRecordDetail);
