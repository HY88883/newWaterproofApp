import login from './login';

import {DvaLoadingState} from 'dva-loading-ts';
import team from '@/models/team';
import projectManage from '@/models/projectManage';
import constructionRecord from '@/models/constructionRecord';
import equipment from '@/models/equipment';
import materialApplication from '@/models/materialApplication';
import materialStock from '@/models/materialStock';
import expenseClaim from '@/models/expenseClaim';

const models = [
  login,
    team,
  projectManage,
  constructionRecord,
  equipment,
  materialApplication,
  materialStock,
  expenseClaim,
];

export type RootState = {
  login: typeof login.state;
  team: typeof team.state;
  projectManage: typeof projectManage.state;
  constructionRecord:typeof constructionRecord.state;
  equipment:typeof equipment.state;
  materialApplication:typeof materialApplication.state;
  materialStock:typeof materialStock.state;
  expenseClaim:typeof expenseClaim.state;
  loading: DvaLoadingState;
};

export default models;
