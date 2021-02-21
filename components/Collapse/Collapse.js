// components/Collapse/Collapse.js
Component({
  relations: {
    '../CollapseContent/CollapseContent': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function (target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        // console.log(target)
      },
      linkChanged: function (target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
        console.log(target)
      },
      unlinked: function (target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
        console.log(target)
      }
    }
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    simple: {
      type: Boolean
    },

    accordion: {
      type: Boolean
    },

    value: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showNumber: null,
    showNumberList:[]
  },

  observers: {
    'showNumber': function(showNumber) {
      this.showPanel();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getAllLi: function () {
      // 使用getRelationNodes可以获得nodes数组，包含所有已关联的custom-li，且是有序的
      var nodes = this.getRelationNodes('../CollapseContent/CollapseContent');
      let accordion = this.properties.accordion || false;
      let value = this.properties.value || [];
      // 给子组件赋值 序号
      for (var j in nodes) {
        nodes[j].setData({
          no: Number(j)
        })
      };
      if (accordion == true) {
        // 开启手风琴模式（默认是关闭的）
        // 仅能激活一个，传多个值时默认激活第一个值指定的面板
        if (value.length !== 0) {
          let index = value[0];
          this.setData({
            showNumber: index
          });
          // 判断正整数
          if ((/(^[0-9]\d*$)/.test(index))) {
            // 防止值过大报错 
            if (index < nodes.length) {
              nodes[index].setData({
                collapseShow: true
              })
            }
          }
        }
      } else {
        // 不开启时可以默认激活多个面板
        if (value.length !== 0) {
          for (var i in value) {
            let index = value[i];
            // 判断正整数
            if ((/(^[0-9]\d*$)/.test(index))) {
              // 防止值过大报错 
              if (index < nodes.length) {
                nodes[index].setData({
                  collapseShow: true
                })
              }
            }
          }
        }
      }
    },


    // 手风琴模式下
    showPanel() {
      var nodes = this.getRelationNodes('../CollapseContent/CollapseContent');
      console.log(this.properties.accordion)
      if(this.properties.accordion!==false&&this.properties.accordion!==true){
        var accordion = false;
      }else{
        var accordion = this.properties.accordion
      }
      let index = this.data.showNumber;
      if(index!==null){
        if (accordion == true) {
          // 单个
          for (var i in nodes) {
            if (i !== index) {
              nodes[i].setData({
                collapseShow: false
              }) 
            } else {
              nodes[i].setData({
                collapseShow: true
              })
            }
          }
          this.triggerEvent('change',this.data.showNumber);
        }else{
          this.triggerEvent('change',this.data.showNumberList);
        }
      }else{
        if (accordion == true) {
          this.triggerEvent('change',this.data.showNumber);
        }else{
          this.triggerEvent('change',this.data.showNumberList);
        }
      }
    }
  },

  ready() {
    this._getAllLi();
    this.setData({
      showNumberList:this.properties.value||[]
    })
  }
})