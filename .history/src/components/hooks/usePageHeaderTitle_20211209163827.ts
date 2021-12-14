import {useEffect, useLayoutEffect} from 'react';
import {customStyles} from '@/utils/styles';

export default function usePageHeaderTitle(navigation,title,headerLeft=null,headerRight=null){
    useLayoutEffect(
        ()=>{
            navigation.setOptions({
                headerTitle: title,
                headerTitleStyle:customStyles.pageTitleStyle,
            });
            !!headerLeft&&navigation.setOptions({
                headerLeft
            });
            !!headerRight&&navigation.setOptions({
                headerRight
            });
        },[navigation,title,headerLeft,headerRight]
    );
}
