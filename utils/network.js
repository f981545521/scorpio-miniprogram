let env = require('env_config.js');
let util = require('./util.js');

//GET请求
function GET(requestHandler) {
    request('GET', requestHandler)
}

//POST请求
function POST(requestHandler) {
    request('POST', requestHandler)
}

function DELETE(requestHandler) {
    request('DELETE', requestHandler)
}

function request(method, requestHandler) {
    //注意：可以对params加密等处理
    var params = requestHandler.params;
    var header = requestHandler.header;
    var API_URL = env.gatewayUrl + requestHandler.url;
    // var API_URL = "http://gateway.myttfitness.com" + requestHandler.url;
    wx.request({
        url: API_URL,
        data: params,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {...header, "user_token": wx.getStorageSync('userToken'), "source": 5}, // 设置请求的 header
        success: function (res) {
            var resData = res.data;
            if (resData.success) {
                //注意：可以对参数解密等处理
                requestHandler.success(resData)
            } else {
                util.showError(resData.message);
                requestHandler.success(resData)
            }

        },
        fail: function () {
            util.showError("网络请求出错！");
        },
        complete: function () {
            // complete
        }
    })
}

/**
 * 选择并上传文件
 * example:
 *       var uploadHandler = {
 *         path: "/test/temp/",
 *            success: function (resData) {
 *               console.log(resData)
 *           }
 *       };
 *       network.selectUploadFile(uploadHandler);

 */
function selectUploadFile(uploadHandler) {
    wx.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            /*            wx.compressImage({
                            src: tempFilePaths[0], // 图片路径
                            quality: 50, // 压缩质量
                            success(res) {
                                console.log("压缩成功！")
                                console.log(res)
                            },
                            fail(res) {
                                //{errMsg: "compressImage:fail 开发者工具暂时不支持此 API 调试，请使用真机进行开发"}
                                console.log(res)
                            }

                        });*/
            wx.uploadFile({
                url: env.gatewayUrl + '/tool/upload/commonUpload',
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                    'bucketName': env.qiniuBucket,
                    'path': uploadHandler.path,
                },
                success(res) {
                    var resData = JSON.parse(res.data);
                    uploadHandler.success(resData)
                }
            });
        }
    });
}

module.exports = {
    GET: GET,
    POST: POST,
    DELETE: DELETE
};
