let App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync('userToken')) {
            // wx.redirectTo({
            //   url: '/pages/index/index',
            // })
            wx.switchTab({
                url: '/pages/home/home/home',
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    getPhoneNumber: function(e){
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var _this = this;
        wx.login({
            success: res => {
                console.log(res)
            }
        })
    },

    getuserAuthority: function (e) {
        if (e.detail.userInfo) {
            var _this = this
            let _info = e.detail;
            wx.showLoading({
                title: '登录中'
            });
            var param = {
                encryptedData: _info.encryptedData,
                iv: _info.iv
            }
            wx.setStorageSync("userInfo", e.detail.userInfo)
            this.getUserAuth(param)

            //授权成功后，返回到上一页
            // wx.navigateBack({
            //   delta: 2
            // })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }

    },

    // 获取用户权限
    getUserAuth: function (param) {
        var _this = this;
        wx.login({
            success: res => {
                console.log(res)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    let code = res.code;

                    var requestHandler = {
                        url: "/member/login/doLogin",
                        params: {
                            "loginType": 4,
                            "miniProgramReq": {
                                "code": code
                            },
                        },
                        header: {'source': 5},
                        success: function (resData) {
                            wx.hideLoading();
                            console.log(resData)
                            if (resData.success) {
                                try {
                                    console.log(resData.data);
                                    wx.setStorageSync('roleList', resData.data.roleList)
                                    wx.setStorageSync('userToken', resData.data.userToken)
                                    wx.setStorageSync('userBaseInfo', resData.data.userBaseInfo)
                                    wx.setStorageSync('menuList', resData.data.menuList)
                                    wx.setStorageSync('departList', resData.data.departList)
                                    wx.setStorageSync('storeType', resData.data.storeType)
                                    // wx.navigateTo({
                                    //   url: '/pages/index/index'
                                    // })
                                    // 跳转回原页面
                                    _this.navigateBack();
                                } catch (e) {
                                    console.log(e)
                                    console.log('登录设置缓存失败')
                                }
                            } else {
                                // 判断用户是否绑定账号
                                if (resData.code == "400019") {
                                    wx.setStorageSync('openid', resData.data.openid);
                                    wx.setStorageSync('unionid', resData.data.unionid);
                                    wx.redirectTo({
                                        url: '/pages/bindUser/bindUser'
                                    });
                                }

                            }
                        },
                        fail: function () {
                            // fail
                            wx.hideLoading();
                            console.log("调用失败")
                        },

                    };
                    App.network.POST(requestHandler)

                } else {
                    wx.hideLoading();
                    console.log('登录失败！' + res.errMsg)
                }

            }
        })

    },

    // 显示toast弹窗
    showToast: function (content = '登录失败，请稍后再试') {
        wx.showToast({
            title: content,
            icon: 'none'
        })
    },
    /**
     * 授权成功 跳转回原页面
     */
    navigateBack: function () {
        wx.navigateBack();
        // let currentPage = wx.getStorageSync('currentPage');
        // wx.redirectTo({
        //   url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
        // });
    },

})