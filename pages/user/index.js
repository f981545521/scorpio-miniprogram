let App = getApp();
var env = require('../../utils/env_config.js');
var util = require('../../utils/util.js');
var network = require('../../utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            user_id: 103738,

        },
        orderCount: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取当前用户信息
        this.getUserDetail();
    },

    /**
     * 获取当前用户信息
     */
    getUserDetail: function () {
        let _this = this;

    },
    loginOut: function () {
        wx.clearStorageSync();
        util.showToast("退出成功！");
        wx.navigateTo({
            url: '/pages/author/author',
        });
    },

    /**
     * 订单导航跳转
     */
    onTargetOrder(e) {
        // 记录formid
        // App.saveFormId(e.detail.formId);
        let urls = {
            all: '/pages/order/index?type=all',
            payment: '/pages/order/index?type=payment',
            received: '/pages/order/index?type=received'
        };
        // 转跳指定的页面
        wx.navigateTo({
            url: urls[e.currentTarget.dataset.type]
        })
    },

    /**
     * 菜单列表导航跳转
     */
    onTargetMenus(e) {
        // 记录formId
        // App.saveFormId(e.detail.formId);
        wx.navigateTo({
            url: '/' + e.currentTarget.dataset.url
        })
    },

})