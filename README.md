GeekPark mail generator
-------------

### 安装
`npm i`

### 运行
`npm start`

`http://localhost:8080/dist`

### 最终文件
`dist/*.html`

### 替换为 erb
~~因为 `gulp-css-inline` 插件会自动给 `< attrib` 加 `< attrib=""`， 所以这里的 erb 代码需要用 `<%` 来替代 erb 原生的 `<%` 最终放到 rails 项目时需要进行替换~~

这个功能已经集成到 `gulp` 中了，继续使用 erb 原生语法即可
