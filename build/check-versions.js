
// 字体加样式模块
var chalk = require('chalk')
// 版本转换模块
var semver = require('semver')
// 获取packgae.json配置
var packageConfig = require('../package.json')

var shell = require('shelljs')

// 子线程执行命令
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

// 获取node的版本
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

// 获取npm的版本
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    // 判断当前版本是否为所需要的版本
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)){
      // 如果不是发出警告
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  // 如果存在警告
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)//返回0表示程序执行成功，返回非0表示程序执行失败，并返回这个非0数字
  }
}
