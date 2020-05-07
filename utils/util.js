let formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('-')
};

let formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
};

let s;
const getBeforeDate = (n) => {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
        if (mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
};

//获取storage中的用户信息
function getUserInfoBystorage() {
    //检查用户是否登录
    const userToken = wx.getStorageSync('userToken');
    console.log(wx.getStorageSync('roleList'));
    console.log(wx.getStorageSync('userToken'));
    console.log(wx.getStorageSync('menuList'));
    console.log(wx.getStorageSync('departList'));
    if (!userToken) {
        wx.redirectTo({
            url: '/pages/author/author',
        })
        //wx.navigateTo({
        //  url: '/pages/author/author',
        //})
    }
}

function getUserId() {
    var baseInfo = wx.getStorageSync("userBaseInfo");
    if (baseInfo) {
        return baseInfo.userId;
    }
    return "";
}

/**
 * 提示信息
 * @param title
 */
function showToast(title) {
    wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
    })
}

/**
 * 显示失败提示框
 */
function showError(msg, callback) {
    wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
        success() {
            callback && callback();
        }
    });
}

function showLoading(){
    wx.showLoading();
}
function hideLoading(){
    wx.hideLoading();
}

function checkGetLocationAddress(){
    let locationAddress = wx.getStorageSync("locationAddress");
    //有缓存并且不是重新定位请求直接返回
    if (locationAddress){
        return locationAddress;
    } else {
        showToast("获取位置中，请稍后...");
        reLocationAddress(function (result) {
            showToast("获取位置成功！");
        });
        throw new Error("获取位置中");
    }
}
function reLocationAddress(reLocationCall){
    //获取当前位置
    wx.getLocation({
        type: 'gcj02',
        success: function (res) {
            //逆地址编码
            getApp().qqmapsdk.reverseGeocoder({
                location: {
                    latitude: res.latitude,
                    longitude: res.longitude
                },
                success: function (addressRes) {
                    if (addressRes.status == 0) {
                        wx.setStorageSync('locationAddress', addressRes.result);
                        var address = addressRes.result.formatted_addresses.recommend;
                        reLocationCall(addressRes.result);
                    }
                }
            })
        },
    })
}

function getAddress(){
    throw new Error("获取位置失败")
}

/**
 * 显示成功提示框
 */
function showSuccess(msg, callback) {
    wx.showToast({
        title: msg,
        icon: 'success',
        success() {
            callback && (setTimeout(() => {
                callback();
            }, 1500));
        }
    });
}

module.exports = {
    formatTime: formatTime,
    getBeforeDate: getBeforeDate,
    getUserId: getUserId,
    showToast: showToast,
    showSuccess: showSuccess,
    showError: showError,
    showLoading: showLoading,
    hideLoading: hideLoading,
    checkGetLocationAddress: checkGetLocationAddress,
    reLocationAddress: reLocationAddress
};