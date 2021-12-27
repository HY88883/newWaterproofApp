export default {
  title: '防水项目',
  name: 'WaterproofApp',
  clientId: 'waterproof', // 客户端id
  clientSecret: 'waterproof_secret', // 客户端密钥
  tenantMode: false, // 开启租户模式
  captchaMode: false, // 开启验证码模式
  pwa: true,
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: true, // sticky siderbar
  collapse: true,
  menu: {
    disableLocal: false,
  },
  // your iconfont Symbol Scrip Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
  iconfontUrl: '',
  // 第三方登陆授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 流程设计器地址
  flowDesignUrl: 'http://localhost:9999',
  resourceURL: {
    uploadURL: '/blade-resource/fileUpload',
    showImgURL: '/blade-resource/show',
    downFileURL: '/blade-resource/fileDownload',
    getAvatarURL(avatar: any, token: any) {
      if (avatar == null || avatar === '') {
        return '/BiazfanxmamNRoxxVxka.png';
      }
      return `/blade-resource/show?fileId=${avatar}&Blade-Auth=${token}`;
    },
  },
  // 在线预览地址
  onlinePreviewUrl: 'http://localhost:8889/onlinePreview',
};
