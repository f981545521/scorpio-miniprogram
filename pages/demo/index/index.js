let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 选择地点
     */
    onChooseLocation: function () {
        var _this = this;
        wx.chooseLocation({
            success: (res) => {
                console.log(res);
            }
        });
    },
    inputCall: function (e) {
        /**
         * dataset 是写在标签上的值。data-no="110"
         * detail 是传输过来的对象
         *          //子组件向父组件传递数据，可以传递任意数据。
         *          var myEventDetail = {"detail": "xxx"}; // detail对象，提供给事件监听函数
         *          this.triggerEvent('inputCall', myEventDetail)
         */
        let t = e.currentTarget.dataset.no;
        let detail = e.detail;
        console.log("inputCall:" + t);
        console.log(detail)
    }
});