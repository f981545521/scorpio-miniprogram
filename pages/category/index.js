const App = getApp();

Page({
    data: {
        // 搜索框样式
        searchColor: "rgba(0,0,0,0.4)",
        searchSize: "15",
        searchName: "搜索商品",

        // 列表高度
        scrollHeight: 0,

        // 一级分类：指针
        curNav: true,
        curIndex: 0,

        // 分类列表
        list: [],

        // show
        notcont: false
    },

    onLoad: function () {
        let _this = this;
        // 设置分类列表高度
        _this.setListHeight();
        // 获取分类列表
        _this.getCategoryList();
    },

    /**
     * 设置分类列表高度
     */
    setListHeight: function () {
        let _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    scrollHeight: res.windowHeight - 47,
                });
            }
        });
    },

    /**
     * 获取分类列表
     */
    getCategoryList: function () {
        let _this = this;
        //TODO: 获取分类列表
    },

    /**
     * 一级分类：选中分类
     */
    selectNav: function (t) {
        let curNav = t.target.dataset.id,
            curIndex = parseInt(t.target.dataset.index);
        this.setData({
            curNav,
            curIndex,
            scrollTop: 0
        });
    },

    /**
     * 设置分享内容
     */
    onShareAppMessage: function () {
        return {
            title: "全部分类",
            path: "/pages/category/index"
        };
    }

});