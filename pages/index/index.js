let App = getApp();

Page({
    data: {
        // banner轮播组件属性
        indicatorDots: true, // 是否显示面板指示点
        autoplay: true, // 是否自动切换
        interval: 3000, // 自动切换时间间隔
        duration: 800, // 滑动动画时长
        imgHeights: {}, // 图片的高度
        imgCurrent: {}, // 当前banne所在滑块指针

        // 页面元素
        items: [
            {
                type: "search",
                params: {
                    placeholder: "搜索商品"
                }
            }, {
                type: "banner",
                data: [
                    {
                        linkUrl: "",
                        imgUrl: "http://q8nvap5f2.bkt.clouddn.com/TB1MDHfBhD10.jpg"
                    },
                    {
                        linkUrl: "",
                        imgUrl: "http://q8nvap5f2.bkt.clouddn.com/TB1MDHfBhD10.jpg"
                    },
                    {
                        linkUrl: "",
                        imgUrl: "http://q8nvap5f2.bkt.clouddn.com/TB1MDHfBhD10.jpg"
                    }
                ]
            }],
        newest: [{
            goods_id: 1,
            image: [{file_path: "http://q8nvap5f2.bkt.clouddn.com/product/TB2SfeAkwKTBuNkSne1XXaJo.jpg"}],
            goods_name: "休息休息",
            spec: [{goods_price: 233}]
        }],
        best: [
            {
                goods_id: 1,
                image: [{file_path: "http://q8nvap5f2.bkt.clouddn.com/product/TB2bi0Ub_SPY1J.jpg"}],
                goods_name: "休息休息",
                spec: [{goods_price: 233}]
            },
            {
                goods_id: 1,
                image: [{file_path: "http://q8nvap5f2.bkt.clouddn.com/product/TB2bi0Ub_SPY1J.jpg"}],
                goods_name: "休息休息",
                spec: [{goods_price: 233}]
            },
            {
                goods_id: 1,
                image: [{file_path: "http://q8nvap5f2.bkt.clouddn.com/product/TB2SfeAkwKTBuNkSne1XXaJo.jpg"}],
                goods_name: "休息休息",
                spec: [{goods_price: 233}]
            }
        ],

        scrollTop: 0,
    },

    onLoad: function () {
        // 设置navbar标题、颜色
        App.setNavigationBar();
        // 获取首页数据
        this.getIndexData();
    },

    /**
     * 获取首页数据
     */
    getIndexData: function () {
        let _this = this;


    },

    /**
     * 计算图片高度
     */
    imagesHeight: function (e) {
        let imgId = e.target.dataset.id,
            itemKey = e.target.dataset.itemKey,
            ratio = e.detail.width / e.detail.height, // 宽高比
            viewHeight = 750 / ratio, // 计算的高度值
            imgHeights = this.data.imgHeights;

        // 把每一张图片的对应的高度记录到数组里
        if (typeof imgHeights[itemKey] === 'undefined') {
            imgHeights[itemKey] = {};
        }
        imgHeights[itemKey][imgId] = viewHeight;
        // 第一种方式
        let imgCurrent = this.data.imgCurrent;
        if (typeof imgCurrent[itemKey] === 'undefined') {
            imgCurrent[itemKey] = Object.keys(this.data.items[itemKey].data)[0];
        }
        this.setData({
            imgHeights,
            imgCurrent
        });
    },

    bindChange: function (e) {
        let itemKey = e.target.dataset.itemKey,
            imgCurrent = this.data.imgCurrent;
        // imgCurrent[itemKey] = e.detail.current;
        imgCurrent[itemKey] = e.detail.currentItemId;
        this.setData({
            imgCurrent
        });
    },

    goTop: function (t) {
        this.setData({
            scrollTop: 0
        });
    },

    scroll: function (t) {
        this.setData({
            indexSearch: t.detail.scrollTop
        }), t.detail.scrollTop > 300 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },

    onShareAppMessage: function () {
        return {
            title: "首页",
            desc: "",
            path: "/pages/index/index"
        };
    }
});