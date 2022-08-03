'use strict';
import { FormItem } from 'element-ui';
import { getFormRefByUid, getJsonFormRef, judgeIsInTheRange } from './utils/core';
import {
  defaultRules,
  mergeRules,
  getCurrentItemIgnoreRule
} from './utils/rule';
import FormValid from './model/from-valid';

export default {
  install: function (Vue, { customRules = [], ignoreRules = [], includeForm = [], excludeForm = [] } = {}) {
    const originGetRules = FormItem.methods.getRules,
      // 1. 生成全局规则
      includeFormModel = includeForm.map(item => new FormValid(item)),
      excludeFormModel = excludeForm.map(item => new FormValid(item));
    let globalRules = mergeRules(defaultRules, customRules, ignoreRules);
    console.log('全局规则:', globalRules);
    FormItem.methods.getRules = function () {
      const rules = originGetRules.call(this),
        form = this.form;
      let formRef = getFormRefByUid(form._uid, form.$parent.$refs);
      if (formRef === 'jsonForm') {
        // 兼容hzwq-ui的form组件
        formRef = getJsonFormRef(form);
      }
      // 性能优化，无效的触发，尽早return。比如FormItem实例化时isRequired计算属性的触发
      if (!formRef) {
        return rules;
      }
      // 2.性能优化，非text和textarea表单类型，不校验
      const hasTypeItem =
        this.$children.find((item) => {
          return item.type;
        }) || {},
        inputType = hasTypeItem.type;
      if (inputType !== 'text' && inputType !== 'textArea') {
        return rules;
      }
      // 3. 获取当前表单项信息
      const currentItem = {
          routeName: form.$route.name,
          formRef,
          formItemProp: this.prop // 用户未配置prop时是undifined
        },
        isInTheRange = judgeIsInTheRange(
          currentItem,
          includeFormModel,
          excludeFormModel
        );
      // console.log(currentItem,"是否生效",isInTheRange)
      // 4. 判断当前表单项是否在生效范围
      if (!isInTheRange) {
        return rules;
      }
      // 5. 获取当前表单项需要忽略的规则
      const needIgnorRuelNames = getCurrentItemIgnoreRule(currentItem, ignoreRules),
        addRules = globalRules.filter((item) => {
          return !needIgnorRuelNames.includes(item.name);
        });
      // 6. 合并并返回新规则
      console.log('表单', currentItem, '的全局规则:', addRules);
      return rules.concat(addRules);
    };
  }
};
