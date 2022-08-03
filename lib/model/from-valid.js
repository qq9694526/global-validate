'use strict';
import FObject from 'f-object';

/**
 * 表单信息，使用这三个值 匹配到项目中指定的表单项
 * */
export default class FromValid extends FObject {
  constructor () {
    const fields = {
      routeName: '',
      formRef: '',
      formItemProps: []
    };

    super(fields);
    if (arguments.length > 0) {
      const value = arguments[0];
      if (!value || Object.getPrototypeOf(value) === FromValid.prototype) {

      } else if (Object.getPrototypeOf(value) === Object.prototype) {
        this.fromJSON(value, arguments[1] || {});
      }
    }
  }

  get routeName () {
    return this._routeName;
  }

  set routeName (value) {
    this._routeName = value;
  }

  get formRef () {
    return this._formRef;
  }

  set formRef (value) {
    this._formRef = value;
  }

  get formItemProp () {
    return this._formItemProp;
  }

  set formItemProp (value) {
    this._formItemProp = value;
  }
}
