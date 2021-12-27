import PhotoBrowser from 'react-native-photo-browser';
import React, { Component } from 'react';

class PhotoBrowserScene extends Component {
    _goBack = () => {
       //2.点击返回关闭页面
        this.props.navigation.goBack();
    }
    render() {
        //3.获取传入的图片等信息
        const { params } = this.props.route;
        const media = params.media;
        const index = params.index;
        return (
            <PhotoBrowser
                onBack={this._goBack}
                mediaList={media}
                initialIndex={index}
                alwaysShowControls
                displayActionButton={false}
                displayNavArrows
                displayTopBar={true}
                enableGrid={false}
            />
        );
    }
}
export default PhotoBrowserScene;