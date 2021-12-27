import {stringify} from 'qs';

export default class RequestForm {
  params: any;

  constructor(params: any) {
    const values = params;
    Object.keys(params).forEach((key) => {
      if (Array.isArray(params[key])) {
        values[key] = params[key].join(',');
      }
    });
    this.params = values;
  }

  parse() {
    return stringify(this.params);
  }
}
