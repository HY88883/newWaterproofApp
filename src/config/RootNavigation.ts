import * as React from 'react';

export const navigationRef = React.createRef<any>();
import {CommonActions, StackActions} from '@react-navigation/native';

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}


