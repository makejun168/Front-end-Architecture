
## CSS 预处理器

* Sass（SCSS）
* LESS
* Stylus
* Turbine
* Swithch CSS
* CSS Cacheer
* DT CSS

### 目录
| 编号 | 目录 | 
| --- | --- |
| 1 | scss基础语法 |
| 2 | sass 与 scss 区别 |
| 3 | scss 编译方法 |
| 4 | scss 不同样式风格的输出方法 |
| 5 | 声明变量 |
| 6 | 混合宏 继承 占位符 |
| 7 | scss 运算 颜色运算 | 

### 1. scss 语法
```scss
$side : left;
.rounded {
    border-#{$side}-radius: 5px;
}
```

* * *

### 2. Sass 与 Scss 区别
1. 文件拓展名称不一样
2. 语法书写方式不同


##### 2.1 Sass 语法
```sass
$font-stack: Helvetica, sans-serif  //定义变量
$primary-color: #333 //定义变量

body
  font: 100% $font-stack
  color: $primary-color
```

##### 2.2 SCSS 语法
```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

##### 2.3 写法上的差异
Sass 和 CSS 写法的确存在一定的差异，由于 Sass 是基于 Ruby 写出来，所以其延续了 Ruby 的书写规范。在书写 Sass 时不带有大括号和分号，其主要是依靠严格的缩进方式来控制的

* * *

“.sass”只能使用 Sass 老语法规则（缩进规则），“.scss”使用的是 Sass 的新语法规则，也就是 SCSS 语法规则（类似 CSS 语法格式）。

* * *

### 3. scss 编译方法
* 命令编译
* GUI工具编译
* 自动化编译

##### 3.1 命令编译
```shell
sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
```
监听持续编译 单文件
```shell
sass --watch sass/bootstrap.scss:css/bootstrap.css
```

##### 3.2 GUI 工具编译
* Koala (http://www.w3cplus.com/preprocessor/sass-gui-tool-koala.html)
* CodeKit (http://www.w3cplus.com/preprocessor/sass-gui-tool-codekit.html)

##### 3.3 自动化编译
**3.31 gulp**
```javascript
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'style/style.css' : 'sass/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}
```

```javascript
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['sass','watch']);
```

**3.32 webpack 最佳实践**
```javascript
module: {
    rules: [       
        {
          test: /\.(scss)$/,
          include: /src/,
          exclude: /node_modules/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                      importLoaders: 2
                  }
              },
              'sass-loader',
              'postcss-loader'
          ]
      }
    ]
}
```

***

### 4.不同样式风格的输出方法

* 嵌套输出方式 nested
* 展开输出方式 expanded  
* 紧凑输出方式 compact 
* 压缩输出方式 compressed

##### 4.1 nested 风格
```shell
sass --watch test.scss:test.css --style nested
```
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none; }
nav li {
  display: inline-block; }
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none; }
```

##### 4.2 展开输出方式 expanded  
```shell
sass --watch test.scss:test.css --style expanded
```

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

##### 4.3 紧凑输出方式 compact
```shell
sass --watch test.scss:test.css --style compact
```

```css
nav ul { margin: 0; padding: 0; list-style: none; }
nav li { display: inline-block; }
nav a { display: block; padding: 6px 12px; text-decoration: none; }
```

##### 4.4 压缩的输出方式
```shell
sass --watch test.scss:test.css --style compressed
```

```css
nav ul{margin:0;padding:0;list-style:none}nav li{display:inline-block}nav a{display:block;padding:6px 12px;text-decoration:none}
```

***

### 5 声明变量

* 声明变量的符号“$”
* 变量名称
* 赋予变量的值

```scss
$brand-primary : darken(#428bca, 6.5%) !default; // #337ab7
$btn-primary-color : #fff !default;
$btn-primary-bg : $brand-primary !default;
$btn-primary-border : darken($btn-primary-bg, 5%) !default;
```

如果值后面加上!default则表示默认值。

##### 5.1 变量声明默认值
```scss
$baseLineHeight:1.5 !default; // 设置 默认值 为 1.5
body{
    line-height: $baseLineHeight; 
}
```

##### 5.2 全局变量与局部变量
```scss
//SCSS
$color: orange !default;//定义全局变量(在选择器、函数、混合宏...的外面定义的变量为全局变量)
.block {
  color: $color;//调用全局变量
}
em {
  $color: red;//定义局部变量
  a {
    color: $color;//调用局部变量
  }
}
span {
  color: $color;//调用全局变量
}
```

##### 5.3 创建变量原则

只有满足所有下述标准时方可创建新变量：
* 至少重复出现了两次；
* 至少可能会被更新一次；
* 所有的表现都与变量有关（非巧合）。
基本上，没有理由声明一个永远不需要更新或者只在单一地方使用变量。

##### 5.4 伪类嵌套
```scss
.clearfix{
    &:before,
    &:after {
        content:"";
        display: table;
    }
    &:after {
        clear:both;
        overflow: hidden;
    }
}
```
编译后的代码
```css
clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}
```

### 6. 混合宏 继承 占位符

|  | 混合宏 | 继承 | 占位符 |
| --- | --- | --- | --- |
| 声明方式 | @mixin | .class | %placeholder | 
| 调用方式 | @include | @extend | @extend |
| 使用环境 | 如果相同代码块需在不同的环境中传递时，可以通过混合宏来定义重复使用的代码块。编译的时候会多次编译混合宏的代码，代码量大  | 如果相同的代码不需要传递不同的值，并且此代码已在sass中定义，可以通过sass的继承来调用基类，使用继承将会调用相同基类的代码合并到一起 | 占位和继承类似，唯一不同的地方是，相同的代码块并没有在基类中存在，而是额外去声明。如果不跳用已声明的占位符，将不会产生任何样式的代码，如果在不同的选择器调用占位符，那么编译出来的CSS代码将会把相同的代码合在一起  |


#### 6.1 混合宏
```scss
@mixin border-radius{
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
```

不传入默认参数
```scss
@mixin border-radius($radius){
  -webkit-border-radius: $radius;
  border-radius: $radius;
}
.btn {
  @include border-radius(3px);
}
```

传入默认参数
```scss
@mixin border-radius($radius: 5px){
    -webkit-border-radius: $radius;
    border-radius: $radius;
}
```

```scss
@mixin box-shadow($shadow...) {
  @if length($shadow) >= 1 {
    @include prefixer(box-shadow, $shadow);
  } @else{
    $shadow:0 0 4px rgba(0,0,0,.3);
    @include prefixer(box-shadow, $shadow);
  }
}
```

传入多个参数的宏
```scss
@mixin center($width,$height){
  width: $width;
  height: $height;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -($height) / 2;
  margin-left: -($width) / 2;
}
```

宏使用方法
```scss
@mixin border-radius{
    -webkit-border-radius: 3px;
    border-radius: 3px;
}
button {
    @include border-radius;
}
```

> sass 混合宏不能缩减代码量

#### 6.2 Sass扩展 extend
```scss
//SCSS
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}
```
编译后的代码
```css
//CSS
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}
```


#### 6.3 placeholder 占位符
**最佳实践**
他可以取代以前 CSS 中的基类造成的代码冗余的情形。因为 %placeholder 声明的代码，如果不被 @extend 调用的话，不会产生任何代码。

```scss
//SCSS
%mt5 {
  margin-top: 5px;
}
%pt5{
  padding-top: 5px;
}

.btn {
  @extend %mt5;
  @extend %pt5;
}

.block {
  @extend %mt5;

  span {
    @extend %pt5;
  }
}
```

```css
//CSS
.btn, .block {
  margin-top: 5px;
}

.btn, .block span {
  padding-top: 5px;
}
```

#### 6.4 Sass插值

```scss
$properties: (margin, padding);
@mixin set-value($side, $value) {
    @each $prop in $properties {
        #{$prop}-#{$side}: $value;
    }
}
.login-box {
    @include set-value(top, 14px);
}
```

```css
.login-box {
    margin-top: 14px;
    padding-top: 14px;
}
```

```scss
@mixin firefox-message($selector) {
  #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
```

***

#### 7. Sass运算
##### 7.1 Sass颜色运算
```scss
p {
  color: #010203 + #040506;
}
```
计算公式为 01 + 04 = 05、02 + 05 = 07 和 03 + 06 = 09， 并且被合成为：
```scss
p {
  color: #050709;
}
```

