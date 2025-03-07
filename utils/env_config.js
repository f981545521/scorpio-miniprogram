//环境配置 ：dev,prod

var active = 'dev';
var env_config = {
    dev: {
        networkUrl: 'http://192.168.1.8:8034'
    },
    prod: {
        networkUrl: 'http://gateway.mransoft.com'
    }
};


var config = {
    //网关地址
    gatewayUrl: env_config[`${active}`].networkUrl,
    cms: {
        home: 10000013,
        homeEle: {
            TOP_AD: 10000014
        }
    }
};

module.exports = config;
