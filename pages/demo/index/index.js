let App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
       itemPage: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        wx.getSystemInfo({
            success: e => {
                console.log("getSystemInfo");
                console.log(e);
            }
        });
        _this.getItemList(1);
    },
    getItemList: function(pageNum){
        let totalPage = 10;
        let _this = this;
        var params = {pageNum:pageNum, pageSize:5};
        let hasNextPage = true;
        if (pageNum == totalPage){
            hasNextPage = false;
        }
        App.setPageData(_this, "itemPage", {
            data: {
                pageNum: params.pageNum,
                pageSize: params.pageSize,
                total: totalPage * params.pageSize,
                list: [1, 2, 3, 4, 5],
                hasNextPage: hasNextPage
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        /**
         * 父组件还可以通过 this.selectComponent 方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法。
         */
        let searchBar = this.selectComponent("#searchBar");
        let opt = searchBar.data.opt;
        console.log("OPT:" + opt)
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
        console.log("到底了，加载更多...");
        var _this = this;
        App.reachBottomLoadMore(_this, "itemPage", _this.getItemList);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: "小程序标题",
            imageUrl: "http://qiniu.acyou.cn/product/TB2bi0Ub_SPY1J.jpg",
            path: "/pages/category/index"
        };
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
    cookieTest: function (){
        var _this = this;
        var requestHandler = {
            url: "/student/cookieTest",
            params: {},
            success: function (resData) {
                console.log(resData)
            },
            fail: function () {
                console.log("调用失败")
            }
        };
        App.network.POST(requestHandler)
    },
    optionsTest: function (){
        var _this = this;
        var requestHandler = {
            url: "/student/cookieTest",
            params: {},
            success: function (resData) {
                console.log(resData)
            },
            fail: function () {
                console.log("调用失败")
            }
        };
        App.network.POST(requestHandler)
    },
    loginInTest: function (){

        var requestHandler = {
            url: "/user/login",
            params: {
                "identityCodeReq": {
                    "identityCode": "1112"
                },
                "loginType": 2
            },
            success: function (resData) {
                console.log(resData)
            },
            fail: function () {
                console.log("调用失败")
            },

        };
        App.network.POST(requestHandler)

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
