let env = require('./utils/env_config.js');
let util = require('./utils/util.js');
let network = require('./utils/network.js');
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

    /**
     * 生命周期函数--监听小程序初始化
     */
    onLaunch() {
        let App = this;
        App.network = network;
        App.util = util;
        // 实例化API核心类
        App.qqmapsdk = new QQMapWX({
            key: 'RQIBZ-PP4RR-FT5W6-W3UG7-6NB5Z-P3BXB'
        });

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


        //获取当前位置
        this.loadAddress();
        App.getLocationInfoPromise().then(addressRes => {
            console.log("程序初始化完成", addressRes)
        });
    },

    loadAddress(){
        let a = util.checkGetLocationAddress();
        //此方法中发生异常，会影响此方法继续执行，不会影响调用方法执行
        console.log("ok啦！")
    },

    getLocationInfoPromise(){
        let App = this;
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'gcj02',
                success: function (res) {
                    console.log("获取当前位置", res);
                    //逆地址编码
                    App.qqmapsdk.reverseGeocoder({
                        location: {
                            latitude: res.latitude,
                            longitude: res.longitude
                        },
                        success: function (addressRes) {
                            console.log("逆地址编码完成", res);
                            resolve(addressRes);
                        }
                    })
                },
                fail(res) {
                    if (res.errMsg === "getLocation:fail auth deny"){
                        wx.showModal({
                            title: '提示',
                            content: '您拒绝了获取位置请求，请重新授权！',
                            success (res) {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success (res) {
                                            console.log(res)
                                        }
                                    })
                                } else if (res.cancel) {
                                    console.log('您拒绝了授权。')
                                }
                            }
                        })
                    }
                }
            });
        });
    },
    //重写分享方法
    overShare: function () {
        //监听路由切换
        //间接实现全局设置分享内容
        wx.onAppRoute(function (res) {
            //获取加载的页面
            let pages = getCurrentPages(),
                //获取当前页面的对象
                view = pages[pages.length - 1],
                data;
            if (view) {
                data = view.data;
                console.log('是否重写分享方法', data.isOverShare);
                if (!data.isOverShare) {
                    data.isOverShare = true;
                    view.onShareAppMessage = function () {
                        //你的分享配置
                        return {
                            title: '标题',
                            path: '/pages/nearby/index'
                        };
                    }
                }
            }
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
     * 设置navbar标题、颜色
     */
    setNavigationBar() {
        let App = this;
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