// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 多个连续变量只能有一个变量声明
    'one-var': ["error", "consecutive"],
    // 每个变量，区块后面都必须跟分号
    'semi': ['error', 'always'],
    // 不允许有空的语句块，catch块允许为空
    'no-empty': ["warn", {"allowEmptyCatch": true}],
    // 禁止与 -0 进行比较
    'no-compare-neg-zero': 'error',
    // 禁止在条件语句中出现赋值操作符
    'no-cond-assign': 'error',
    // 禁用console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止在正则表达式中出现空字符集
    // /^abc[]/.test("abcdefg"); // false 错误
    // "abcdefg".match(/^abc[]/); // null 错误
    //
    // /^abc/.test("abcdefg"); // true 正确
    // "abcdefg".match(/^abc/); // ["abc"]
    // /^abc[a-z]/.test("abcdefg"); // true 正确
    // "abcdefg".match(/^abc[a-z]/); // ["abcd"]
    'no-empty-character-class': "error",
    // 禁止在正则表达式中使用控制字符
    // 在 ASCII 中，0-31 范围内的控制字符是特殊的、不可见的字符。
    // 这些字符很少被用在 JavaScript 字符串中，所以一个正则表达式如果包含这些字符的，很有可能一个错误。
    'no-control-regex': "error",
    // 强制在 getter 属性中出现一个 return 语句
    'getter-return': 'error',
    // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
    'for-direction': 'error',
    // 禁止在循环中 出现 await
    'no-await-in-loop': 'error',
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 'error',
    // 禁止在对象字面量中出现重复的键
    'no-dupe-keys': 'error',
    // 禁止重复 case 标签
    'no-duplicate-case': 'error',
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 'error',
    // 禁止不必要的分号
    'no-extra-semi': 'error',
    // 禁止function中出现重复的参数
    'no-dupe-args': 'error',
    // 禁止对 function 声明重新赋值 (no-func-assign)
    'no-func-assign': 'error',
    // 禁止在嵌套的语句块中出现变量或 function 声明 (no-inner-declarations)
    'no-inner-declarations': 'error',
    // 禁止不规则的空白 (no-irregular-whitespace)
    // 无效的或不规则的空白会导致 ECMAScript 5 解析问题，也会使代码难以调试（类似于混合 tab 和空格的情况）
    'no-irregular-whitespace': 'error',
    // 禁止将全局对象当作函数进行调用 (no-obj-calls)
    'no-obj-calls': 'error',
    // 禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'error',
    // 禁止正则表达式字面量中出现多个空格 (no-regex-spaces)
    'no-regex-spaces': 'error',
    // 禁用稀疏数组
    'no-sparse-arrays': 'error',
    // 禁止在常规字符串中出现模板字面量占位符语法
    'no-template-curly-in-string': 'error',
    // 禁止 case 语句落空 (no-fallthrough)
    'no-fallthrough': 'error',
    // 禁止对原生对象或只读的全局对象进行赋值 (no-global-assign)
    'no-global-assign': 'error',
    // 禁用八进制字面量 (no-octal)
    'no-octal': 'error',
    // 禁用未使用过的标签 (no-unused-labels)
    'no-unused-labels': 'error',
    // 禁止使用令人困惑的多行表达式
    'no-unexpected-multiline': 'error',
    // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    'no-unreachable': 'error',
    // 禁止在 finally 语句块中出现控制流语句 (no-unsafe-finally)
    'no-unsafe-finally': 'error',
    // 禁止对关系运算符的左操作数使用否定操作符 (no-unsafe-negation)
    'no-unsafe-negation': 'error',
    // 要求调用 isNaN()检查 NaN (use-isnan)
    'use-isnan': 'error',
    // 强制 typeof 表达式与有效的字符串进行比较 (valid-typeof)
    'valid-typeof': 'error',
    // 强制所有控制语句使用一致的括号风格 (curly),
    // all:所有的都需要 {}
    'curly': ['error', 'all'],
    // 要求使用 === 和 !== (eqeqeq)
    'eqeqeq': ['error', 'smart'],
    // 禁止出现空函数 (no-empty-function)
    'no-empty-function': 'warn',
    // 禁用隐式的eval() (no-implied-eval)
    'no-implied-eval': 'error',
    // 禁止重新声明变量
    'no-redeclare': 'error',
    // 禁止在返回语句中赋值 (no-return-assign) reutrn a = 1 + 2,允许使用return (a = 1 + 2)
    'no-return-assign': 'error',
    // 禁止自身赋值 (no-self-assign)
    'no-self-assign': 'error',
    // 禁止自身比较（no-self-compare）
    'no-self-compare': 'error',
    // 限制可以被抛出的异常 (no-throw-literal)，抛出的异常必须是Error对象
    'no-throw-literal': 'error',
    // 禁用一成不变的循环条件 (no-unmodified-loop-condition)
    'no-unmodified-loop-condition': 'error',
    // 禁止没有必要的字符拼接 (no-useless-concat)
    'no-useless-concat': 'error',
    // 禁用不必要的转义 (no-useless-escape)
    'no-useless-escape': 'error',
    // 禁止删除变量 (no-delete-var)
    'no-delete-var': 'error',
    // 禁用未声明的变量 (no-undef)
    'no-undef': 'error',
    // 禁止未使用过的变量 (no-unused-vars)
    'no-unused-vars': 'warn',
    // 要求使用驼峰原则 (camelcase)
    'camelcase': 'error',
    // 要求或禁止使用拖尾逗号 (comma-dangle)
    'comma-dangle': 'error',
    // 强制在逗号周围使用空格 (comma-spacing)
    'comma-spacing': 'error',
    // 逗号风格 (comma-style)
    'comma-style': 'error',
    // 禁止或强制在计算属性中使用空格 (computed-property-spacing)
    'computed-property-spacing': 'error',
    // 要求或禁止在函数标识符和其调用之间有空格 (func-call-spacing)
    'func-call-spacing': 'error',
    // 强制隐式返回的箭头函数体的位置 (implicit-arrow-linebreak)
    'implicit-arrow-linebreak': 'error',
    // 强制使用一致的缩进 (indent)
    'indent': 'error',
    // 强制在对象字面量的键和值之间使用一致的空格 (key-spacing)
    'key-spacing': 'error',
    // 强制关键字周围空格的一致性 (keyword-spacing)
    'keyword-spacing': 'error',
    // 禁止使用 空格 和 tab 混合缩进 (no-mixed-spaces-and-tabs)
    'no-mixed-spaces-and-tabs': 'error',
    // 不允许多个空行 (no-multiple-empty-lines)
    // "max" (默认为 2) 强制最大连续空行数。
    // "maxEOF" 强制文件末尾的最大连续空行数。
    // "maxBOF" 强制文件开始的最大连续空行数。
    'no-multiple-empty-lines': ['error', {'max': 1, 'maxBOF': 0, 'maxEOF': 1}],
    // 禁用 tab (no-tabs)
    'no-tabs': 'error',
    // 禁用行尾空白 (no-trailing-spaces)
    'no-trailing-spaces': 'error',
    // 禁止属性前有空白 (no-whitespace-before-property)
    'no-whitespace-before-property': 'error',
    // 要求或禁止块内填充 (padded-blocks)
    'padded-blocks': 'error',
    // 强制使用一致的反勾号、双引号或单引号 (quotes)
    'quotes': 'error',
    // 强制分号前后有空格 (semi-spacing),分号前没有空格
    'semi-spacing': 'error',
    // 强制分号的位置(semi-style)
    'semi-style': 'error',
    // 要求或禁止语句块之前的空格 (space-before-blocks)
    'space-before-blocks': 'error',
    // 要求或禁止函数圆括号之前有一个空格 (space-before-function-paren)
    'space-before-function-paren': 'error',
    // 禁止或强制圆括号内的空格 (space-in-parens)，默认禁止有空格
    'space-in-parens': 'error',
    // 要求中缀操作符周围有空格 (space-infix-ops)
    'space-infix-ops': 'error',
    // 要求或禁止在一元操作符之前或之后存在空格 (space-unary-ops)
    'space-unary-ops': 'error',
    // 要求或禁止在注释前有空白 (space 或 tab) (spaced-comment),注释符后需跟一个空格
    'spaced-comment': 'error',
    // 禁止重复导入 (no-duplicate-imports)
    'no-duplicate-imports': 'error',
    // 禁止使用空解构模式 (no-empty-pattern)
    'no-empty-pattern': 'error',
    // 不允许修改类声明的变量 (no-class-assign)
    'no-class-assign': 'error',
    // 验证构造函数中 super() 的调用 (constructor-super)
    'constructor-super': 'error',
    // 不允许改变用const声明的变量 (no-const-assign)
    'no-const-assign': 'error',
    // 在构造函数中禁止在调用super()之前使用this或super。 (no-this-before-super)
    'no-this-before-super': 'error',
    // 禁用函数内没有yield的 generator 函数
    'require-yield': 'error'
  }
}
