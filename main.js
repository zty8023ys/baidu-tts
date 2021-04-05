var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "23930947";
var API_KEY = "QQKodnQrGF9b6vGal62bAoQe";
var SECRET_KEY = "Z6tVjqgL3Hms1PA2OraBhDabEz0Xw8iK";


// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

// 语音合成
const fs = require('fs');
const readline = require('readline');

async function processLineByLine(path) {
    const arr = [];
    const fileStream = fs.createReadStream(path);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

    for await (const line of rl) {
        // input.txt 中的每一行在这里将会被连续地用作 `line`。
        arr.push(line);
    }
    return arr;
}
const parallelDo = require("./parallel");
const errarr = [];
processLineByLine(process.argv[2]).then((arr) => {
    return parallelDo(arr, (text, index) => {
        return new Promise((resolve) => {
            client.text2audio(text).then(function (result) {
                if (result.data) {
                    fs.writeFileSync(`./audio/${index}.mp3`, result.data);
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                } else {
                    // 服务发生错误
                    console.log(result);
                    errarr.push(index);
                    resolve();
                }
            }, function (e) {
                // 发生网络错误
                console.log(e);
                errarr.push(index);
                resolve();
            });
        })
    }, 5);
}).then(() => {
    errarr.length ? console.log("转换失败:" + JSON.stringify(errarr)) : console.log("转换完成，前往audio目录查看");
});

