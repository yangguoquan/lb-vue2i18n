require('colors');
const path = require('path');
const fs = require('fs');
const LocoClient = require('loco-api-js');
const { getConfig } = require('./utils/getConfig');

const writeMessage = (json, filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(json, null, '\t'), 'utf8');
};

module.exports.exportFiles = async (rootPath, showInformationMessage) => {
  const { langPath, locoExportKey } = getConfig();

  let loco;
  if (locoExportKey) {
    loco = new LocoClient(locoExportKey);
  } else {
    showInformationMessage(
      '没有在 package.json 中，配置项目对应多语言平台 key'
    );
    return;
  }

  const locales = ['zh-CN', 'en', 'zh-HK'];
  for (const locale of locales) {
    const filePath = path.join(rootPath, langPath, `${locale}.json`);
    showInformationMessage(`${locale} 语言文件下载完成`);
    const json = await loco.exportLocale(locale);
    writeMessage(json, filePath);
  }
  showInformationMessage('全部语言文件下载完成');
};