
var myBehavior = require('../behaviors/behavior.js');

Component({
    behaviors: [myBehavior],
    /**
     * 组件样式隔离
     */
    options: {
        /**
         * isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；
         * apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
         * shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）
         */
        styleIsolation: "apply-shared"
        //addGlobalClass: true,
    },
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: {
            type: String,
            value: "ok"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        searchName : "",
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindSearchInput: function(e){
            console.log(e.detail.value);
            //子组件向父组件传递数据，可以传递任意数据。
            var myEventDetail = {"detail": "xxx"}; // detail对象，提供给事件监听函数
            this.triggerEvent('inputCall', myEventDetail)
        },
        searchItem: function () {
            let _this = this;
            console.log(_this.data.searchName)
        }
    }
});
