// 站点信息
let env = require('./utils/env_config.js');
let QQMapWX = require('./utils/lib/map/qqmap-wx-jssdk.js');

/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
const tabBarLinks = [
    'pages/index/index',
    'pages/category/index',
    'pages/flow/index',
    'pages/user/index'
];

App({

    /**
     * 全局变量
     */
    globalData: {
        user_id: null,
    },

    api_root: '', // api地址

    /**
     * 生命周期函数--监听小程序初始化
     */
    onLaunch() {
        let App = this;
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    App.globalData.Custom = capsule;
                    App.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    App.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        });

        // 实例化API核心类
        App.qqmapsdk = new QQMapWX({
            key: 'RQIBZ-PP4RR-FT5W6-W3UG7-6NB5Z-P3BXB'
        });
        //获取当前位置
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                //逆地址编码
                App.qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (addressRes) {
                        console.log(addressRes);
                    }
                })
            },
        })
    },

    /**     生命周期回调——监听小程序启动或切前台。*/
    onShow(options) {},
    /*      生命周期回调——监听小程序切后台。     */
    onHide: function(){
        console.log("小程序切后台")
    },
    /*      错误监听函数。	*/
    onError: function(){

    },
    onPageNotFound: function(res){
        
    },


    /**
     * 获取小程序基础信息
     */
    getWxappBase(callback) {
        let App = this;

    },

    /**
     * 执行用户登录
     */
    doLogin() {
        // 保存当前页面
        let pages = getCurrentPages();
        if (pages.length) {
            let currentPage = pages[pages.length - 1];
            "pages/login/login" != currentPage.route &&
            wx.setStorageSync("currentPage", currentPage);
        }
        // 跳转授权页面
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },

    /**
     * 当前用户id
     */
    getUserId() {
        return wx.getStorageSync('user_id') || 0;
    },

    /**
     * 显示成功提示框
     */
    showSuccess(msg, callback) {
        wx.showToast({
            title: msg,
            icon: 'success',
            success() {
                callback && (setTimeout(() => {
                    callback();
                }, 1500));
            }
        });
    },

    /**
     * 显示失败提示框
     */
    showError(msg, callback) {
        wx.showModal({
            title: '提示',
            content: msg,
            showCancel: false,
            success(res) {
                callback && callback();
            }
        });
    },

    /**
     * get请求
     */
    _get(url, data, success, fail, complete, check_login) {
        let App = this;
        wx.showNavigationBarLoading();

        // 构造请求参数
        data = Object.assign({
            wxapp_id: 10001,
            token: wx.getStorageSync('token')
        }, data);

        // if (typeof check_login === 'undefined')
        //   check_login = true;

        // 构造get请求
        let request = () => {
            data.token = wx.getStorageSync('token');
            wx.request({
                url: App.api_root + url,
                header: {
                    'content-type': 'application/json'
                },
                data,
                success(res) {
                    if (res.statusCode !== 200 || typeof res.data !== 'object') {
                        console.log(res);
                        App.showError('网络请求出错');
                        return false;
                    }
                    if (res.data.code === -1) {
                        // 登录态失效, 重新登录
                        wx.hideNavigationBarLoading();
                        App.doLogin();
                    } else if (res.data.code === 0) {
                        App.showError(res.data.msg);
                        return false;
                    } else {
                        success && success(res.data);
                    }
                },
                fail(res) {
                    // console.log(res);
                    App.showError(res.errMsg, () => {
                        fail && fail(res);
                    });
                },
                complete(res) {
                    wx.hideNavigationBarLoading();
                    complete && complete(res);
                },
            });
        };
        // 判断是否需要验证登录
        check_login ? App.doLogin(request) : request();
    },

    /**
     * post提交
     */
    _post_form(url, data, success, fail, complete) {
        wx.showNavigationBarLoading();
        let App = this;
        // 构造请求参数
        data = Object.assign({
            wxapp_id: 10001,
            token: wx.getStorageSync('token')
        }, data);
        wx.request({
            url: App.api_root + url,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            data,
            success(res) {
                if (res.statusCode !== 200 || typeof res.data !== 'object') {
                    App.showError('网络请求出错');
                    return false;
                }
                if (res.data.code === -1) {
                    // 登录态失效, 重新登录
                    App.doLogin(() => {
                        App._post_form(url, data, success, fail);
                    });
                    return false;
                } else if (res.data.code === 0) {
                    App.showError(res.data.msg, () => {
                        fail && fail(res);
                    });
                    return false;
                }
                success && success(res.data);
            },
            fail(res) {
                // console.log(res);
                App.showError(res.errMsg, () => {
                    fail && fail(res);
                });
            },
            complete(res) {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                complete && complete(res);
            }
        });
    },

    /**
     * 验证是否存在user_info
     */
    validateUserInfo() {
        let user_info = wx.getStorageSync('user_info');
        return !!wx.getStorageSync('user_info');
    },

    /**
     * 对象转URL
     */
    urlEncode(data) {
        var _result = [];
        for (var key in data) {
            var value = data[key];
            if (value.constructor == Array) {
                value.forEach(_value => {
                    _result.push(key + "=" + _value);
                });
            } else {
                _result.push(key + '=' + value);
            }
        }
        return _result.join('&');
    },

    /**
     * 设置当前页面标题
     */
    setTitle() {
        let App = this,
            wxapp;
        if (wxapp = wx.getStorageSync('wxapp')) {
            wx.setNavigationBarTitle({
                title: wxapp.navbar.wxapp_title
            });
        } else {
            App.getWxappBase(() => {
                App.setTitle();
            });
        }
    },

    /**
     * 设置navbar标题、颜色
     */
    setNavigationBar() {
        let App = this;
        // 获取小程序基础信息
        App.getWxappBase(wxapp => {
            // 设置navbar标题、颜色
            wx.setNavigationBarColor({
                frontColor: wxapp.navbar.top_text_color.text,
                backgroundColor: wxapp.navbar.top_background_color
            })
        });
    },

    /**
     * 获取tabBar页面路径列表
     */
    getTabBarLinks() {
        return tabBarLinks;
    },

    /**
     * 设置分页数据
     * @param _this
     * @param page
     * @param result
     */
    setPageData(_this, page, result){
        if (_this.data[page].pageNum){
            _this.setData({
                [page]: {
                    pageNum: result.data.pageNum,
                    pageSize: result.data.pageSize,
                    total: result.data.total,
                    list: _this.data[page].list.concat(result.data.list),
                    hasNextPage: result.data.hasNextPage,
                    extData: result.data.extData
                }
            })
        } else {
            _this.setData({
                [page]: result.data
            })
        }
    },
    /**
     * 分页加载更多
     * @param _this
     * @param page
     * @param result
     */
    reachBottomLoadMore: function (_this, page, callback) {
        if (_this.data[page] && _this.data[page].hasNextPage) {
            callback(_this.data[page].pageNum + 1);
        }
    }

});