## shop-miniprogram

### 演示小程序
#### 项目演示
- 源码地址：[yoshop_wechat](https://gitee.com/xany/yoshop_wechat)

![输入图片说明](https://images.gitee.com/uploads/images/2018/0727/210807_271acafd_597459.jpeg "gh_a376934c7da8_344.jpg")

- 项目中集成了UI框架：[ColorUI](https://github.com/weilanwl/ColorUI)

![输入图片说明](https://www.color-ui.com/index.png)

### 开发工具
#### 微信开发者工具
1. 设置->编辑设置->勾选用空格代替Tab，设置Tab大小：4


### 开发指南
1. 微信官方文档-小程序。[点击这里](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/)

### 运行环境
1. 打开微信开发者工具运行


### JS
1. Promise.all() 批量执行

> resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
>
> reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
>
> promise有三个状态：
>
> 1、pending[待定]初始状态
> 2、fulfilled[实现]操作成功
> 3、rejected[被否决]操作失败
>
> 当promise状态发生改变，就会触发then()里的响应函数处理后续步骤；
>
> promise状态一经改变，不会再变。
```
        Promise.all([this.getMessage(), this.getMessage2()]).then((results) => {
            console.log('准备工作完毕');
            console.log(results);//results: (2) ["getMessage_ok", "getMessage2_ok"]
        })

        getMessage: function(){
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log("getMessage");
                    resolve("getMessage_ok");
                }, 3000)
            });
    
        },
        getMessage2: function(){
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log("getMessage2");
                    resolve("getMessage2_ok");
                }, 5000)
            });
        },
```