module.exports = Behavior({
    behaviors: [],
    properties: {
        myBehaviorProperty: {
            type: String
        }
    },
    data: {
        myBehaviorData: {}
    },
    attached: function(){

    },
    methods: {
        myBehaviorMethod: function(){
            console.log("执行了myBehaviorMethod！！")
        }
    }
});