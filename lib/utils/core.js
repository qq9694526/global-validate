'use strict';
// 获取当前表单项的ref
function getFormRefByUid (uid, refsObj = {}) {
  let result = '';
  for (const key in refsObj) {
    if (refsObj[key]._uid === uid) {
      result = key;
      break;
    }
  }
  return result;
}

// 获取hzwq-ui表单组件的ref
function getJsonFormRef(form){
  // 翻两层找 是否为hzwq-search-panel
  const upupNode = form.$parent.$parent
  if(['hzwq-submit-panel','hzwq-search-panel'].includes(upupNode.$el._prevClass)){
    return getFormRefByUid(upupNode._uid,upupNode.$parent.$refs)
  }else{
    // 翻一层找 是否为hzwq-json-form
    const upNode = form.$parent
    return getFormRefByUid(upNode._uid,upNode.$parent.$refs)
  }
}

// 判断是否在生效范围
function judgeIsInTheRange (currentFomItem, includeForm = [], excludeForm = []) {
  const hasInclude = includeForm.length > 0,
    hasExclude = excludeForm.length > 0;
  // 如果都没配置, 全项目生效。可提前至初始化阶段
  if (!hasInclude && !hasExclude) {
    return true;
  }
  // 如果仅配置include，include内的表单生效
  const isInculde = matchForm(currentFomItem, includeForm);
  if (hasInclude && !hasExclude) {
    return isInculde;
  }
  // 如果仅配置exclude，除exclude以外的表单生效
  const isExculde = matchForm(currentFomItem, excludeForm);
  if (hasExclude && !hasInclude) {
    return !isExculde;
  }
  // 如果都配置，include内且不在exclude的表单生效
  return isInculde && !isExculde;
}

// 匹配表单项
function matchForm (currentFomItem = {}, formValidArr=[]) {
  const { routeName, formRef, formItemProp } = currentFomItem;
  // 匹配到routeName  || routeName.formRef || routeName.formRef.formItemProp 都应返回true
  const formValid = formValidArr.find(item=>{
    return matchName(item.routeName,routeName)
  })
  if(!formValid){
    return false
  }
  // 匹配到routeName
  if(formValid && !formValid.formRef){
    return true;
  }
  // 匹配到routeName.formRef
  if(matchName(formValid.formRef,formRef)&&formValid.formItemProps.length===0){
    return true;
  }
  // 匹配到routeName.formRef.formItemProp
  if(formValid.formItemProps.includes(formItemProp)){
    return true
  }
  // 都没匹配到就是false
  return false
}

// 匹配name或正则
function matchName(condition='',value){
  if(condition.constructor === RegExp){
    return condition.test(value)
  }else{
    return condition===value
  }
}

export {
  getFormRefByUid,
  getJsonFormRef,
  judgeIsInTheRange,
};

