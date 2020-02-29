var fs = require('fs')
function mkdir(path) {
try {
    fs.mkdirSync(path, {recursive: true})
} catch (err) {
    console.log(`创建文件夹${path}失败：` + err)
    return false
}
console.log(`创建文件夹${path}成功！`)
return true
}
function copyDir (src, dist) {
if(!fs.existsSync(dist))  mkdir(dist)
copy(null, src, dist, function (err) {
    console.log('错误：' + err)
})
console.log(`文件${dist}复制成功！`)
}
function  copy (err, src, dist, callback) {
const _self = this
if (err) {
    callback(err)
} else {
    const paths = fs.readdirSync(src)
    paths.forEach(function (path) {
    var _src = src + '/' + path
    var _dist = dist + '/' + path
    const stat = fs.statSync(_src)
    // 判断是文件还是目录
    if (stat.isFile()) {
        fs.writeFileSync(_dist, fs.readFileSync(_src))
    } else if (stat.isDirectory()) {
        // 当是目录是，递归复制
        copyDir(_src, _dist, callback)
    }
    })
}
}
module.exports = function(dist) {
    copyDir('./scaffold', dist)
}