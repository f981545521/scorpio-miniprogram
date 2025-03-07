let App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods_list: [], // 商品列表
        order_total_num: 0,
        order_total_price: 0,
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
        this.getCartList();
    },

    /**
     * 获取购物车列表
     */
    getCartList: function () {
        let _this = this;
        //TODO: 获取购物车列表

        /*    App._get('cart/lists', {}, function(result) {
              _this.setData(result.data);
            });*/
    },

    /**
     * 递增指定的商品数量
     */
    addCount: function (e) {
        let _this = this,
            index = e.currentTarget.dataset.index,
            goodsSkuId = e.currentTarget.dataset.skuId,
            goods = _this.data.goods_list[index],
            order_total_price = _this.data.order_total_price;
        // 后端同步更新
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        App._post_form('cart/add', {
            goods_id: goods.goods_id,
            goods_num: 1,
            goods_sku_id: goodsSkuId
        }, function () {
            goods.total_num++;
            _this.setData({
                ['goods_list[' + index + ']']: goods,
                order_total_price: _this.mathadd(order_total_price, goods.goods_price)
            });
        });
    },

    /**
     * 递减指定的商品数量
     */
    minusCount: function (e) {
        let _this = this,
            index = e.currentTarget.dataset.index,
            goodsSkuId = e.currentTarget.dataset.skuId,
            goods = _this.data.goods_list[index],
            order_total_price = _this.data.order_total_price;

        if (goods.total_num > 1) {
            // 后端同步更新
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            App._post_form('cart/sub', {
                goods_id: goods.goods_id,
                goods_sku_id: goodsSkuId
            }, function () {
                goods.total_num--;
                goods.total_num > 0 &&
                _this.setData({
                    ['goods_list[' + index + ']']: goods,
                    order_total_price: _this.mathsub(order_total_price, goods.goods_price)
                });
            });

        }
    },

    /**
     * 删除商品
     */
    del: function (e) {
        let _this = this,
            goods_id = e.currentTarget.dataset.goodsId,
            goodsSkuId = e.currentTarget.dataset.skuId;
        wx.showModal({
            title: "提示",
            content: "您确定要移除当前商品吗?",
            success: function (e) {
                e.confirm && App._post_form('cart/delete', {
                    goods_id,
                    goods_sku_id: goodsSkuId
                }, function (result) {
                    _this.getCartList();
                });
            }
        });
    },

    /**
     * 购物车结算
     */
    submit: function (t) {
        wx.navigateTo({
            url: '../flow/checkout?order_type=cart'
        });
    },

    /**
     * 加法
     */
    mathadd: function (arg1, arg2) {
        return (Number(arg1) + Number(arg2)).toFixed(2);
    },

    /**
     * 减法
     */
    mathsub: function (arg1, arg2) {
        return (Number(arg1) - Number(arg2)).toFixed(2);
    },

    /**
     * 去购物
     */
    goShopping: function () {
        wx.switchTab({
            url: '../index/index',
        });
    },

})