// components/Collapse/Collapse.js
Component({
  relations: {
    '../Collapse/Collapse': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
        // console.log('child linked to ', target)
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
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
    hideArrow:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collapseShow:false,
    collapseHeight:null,
    no:null,
    height:'auto',
    hideArrow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {

    getContentHeight(){
      const query = this.createSelectorQuery()
      query.select('#content').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res)=>{
        const query2 = this.createSelectorQuery()
        query2.select('#label').boundingClientRect()
        query2.selectViewport().scrollOffset()
        query2.exec((rest)=>{
          this.setData({
            collapseHeight: res[0].height + rest[0].height
          })
        })
      })
    },

    collapseChange(){
      var nodes = this.getRelationNodes('../Collapse/Collapse');
      let list = nodes[0].data.showNumberList;
      console.log(nodes);
      if(this.data.collapseShow==true){
        this.setData({
          collapseShow:false
        })
        nodes[0].setData({
          showNumber:null
        })
        console.log(this.data.no);
        for(var j in list){
          if(list[j]==this.data.no){
            list.splice(j,1);
            console.log(list)
            nodes[0].setData({
              showNumberList: list
            })
          }
        }
      }else{
        this.setData({
          height: this.data.collapseHeight + 'px'
        })
        this.setData({
          collapseShow:true
        })
        setTimeout(() => {
          this.setData({
            height: 'auto'
          })
        }, 300);
        nodes[0].setData({
          showNumber:this.data.no
        })
        console.log(this.data.no)
        list.push(this.data.no);
        console.log(list)
        nodes[0].setData({
          showNumberList: list
        })
      }
    },
  },

  attached(){
    this.getContentHeight();
  }
})
