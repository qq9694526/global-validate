'use strict';
import { judgeIsInTheRange } from "./core.js";
import FormValid from "../model/from-valid";

// 默认规则：输入长度超长、特殊字符限制输入；不允许输入null字符串
const defaultRules = [
  { name: "maxLength", message: "输入长度超长", max: 100, trigger: "blur" },
  {
    name: "specialChar",
    pattern: /^[A-Za-z0-9\u4e00-\u9fa5-_.]+$/,
    message: "只能是数字、字母、汉字和符号-_.",
    trigger: "blur",
  },
  { name: "limitNull", validator: validateLimitRull, trigger: "blur" },
];

// 自定义validator, 不允许输入null字符串
function validateLimitRull(rule, value = "", callback) {
  if (value.includes("null")) {
    callback(new Error("不允许输入null字符串"));
  } else {
    callback();
  }
}

// 根据defaultRules = [], customRules = [], ignoreRules 合并生成最终的 全局规则
function mergeRules(defaultRules = [], customRules = [], ignoreRules = []) {
  // 1.合并默认和自定义规则，如果name一样，覆盖
  // 2.根据ignoreRules过滤掉需要忽略的规则
  const result = [],
    tempObj = {},
    totalRules = [...defaultRules, ...customRules];
  for (const item of totalRules) {
    const name = item.name;
    // 如果没有名称
    if(!name){
      result.push(item);
    }
    // 如果有name，且该名称的rule不需要忽略
    if(name && !ignoreRules.includes(name)){
      tempObj[name] = item; 
    }
  }
  return result.concat(Object.values(tempObj));
}

// 获取当前表单项需要忽略的规则
function getCurrentItemIgnoreRule(currentFomItem = {}, ignoreRules = []) {
  let result = [];
  for (const item of ignoreRules) {
    if (typeof item === "object") {
      const { ruleName, includeForm=[], excludeForm=[] } = item;
      const includeFormModel = includeForm.map((item) => new FormValid(item));
      const excludeFormModel = excludeForm.map((item) => new FormValid(item));
      // 如果表单项在它配置的范围内，该条规则需要忽略
      if (judgeIsInTheRange(currentFomItem, includeFormModel, excludeFormModel)) {
        result.push(ruleName);
      }
    }
  }
  return result;
}

export { defaultRules, mergeRules, getCurrentItemIgnoreRule };
