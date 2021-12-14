import {create} from 'dva-core-ts';
import models from '@/models/index';
import createLoading from 'dva-loading-ts';
import {Toast} from '@ant-design/react-native'

//1.创建实例
const app = create({
  onError(e) {
    Toast.fail('网络异常！')
    console.error('出错了:' + e.message);
  },
});
//2 加载model对象
models.forEach((model) => {
  app.model(model);
});

app.use(createLoading());
//3 启动dva
app.start();
//4 导出数据
export default app._store;
