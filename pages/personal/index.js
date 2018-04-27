

Page({

  data: {
    // stocon: [{ id: 0, storetype: '外卖', pernum: '一人食', price: "￥20", ath: "增肥", illness: ["熬夜", "牙疼"] }, { id: 1, storetype: '实体店', pernum: '超多人', price: "￥40", ath: "无所谓", illness: [] }],
    items: [],
    items2: [{ pic: "../../img/store/njxd2.jpg", name: '那间小店', add: '桂庙新村', pernum: "多人聚餐" }, { pic: "../../img/store/lyb.jpg ", name: '来一煲', add: '桂庙新村', pernum: "1-6人" }]
  },
  onLoad: function () {
  },
  onShow:function(){
    console.log("onshow")
    var that = this;
    wx.getStorage({
      key: 'stocon',
      success: function (res) {
        console.log("页面加载：")
        console.log(res.data)
        that.setData({
          items: res.data,
        })
      }
    })
  },
  edit: function (e) {
    // console.log(this.data.items);
    wx.navigateTo({
      url: '../conditionCardEdit/index?condition=' + JSON.stringify(this.data.items[e.target.id]),
    })
  },
  del: function (e) {
    var con = this.data.items;
    con.splice(e.target.id, 1);
    for (var i = e.target.id; i < con.length; i++) {
      con[i].id -= 1;
    }
    this.setData({
      items: con
    })
    console.log("删除操作后要写入缓存的数据:")
    console.log(this.data.items);
    wx.setStorage({
      key: 'stocon',
      data: this.data.items,
    })
  },
  add: function (e) {
    var newitem = { id: this.data.items.length, storetype: '', pernum: '', price: "",method:"", ath: "", illness: [] }
    wx.navigateTo({
      url: '../conditionCardEdit/index?condition=' + JSON.stringify(newitem),
    })
  }
})