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

module.exports = {
    formatTime: formatTime,
    getBeforeDate: getBeforeDate,
    getUserInfoBystorage: getUserInfoBystorage,
    getUserId: getUserId,
    showToast: showToast,
    showError: showError,
};