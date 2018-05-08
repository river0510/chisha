
Page({
  data: {
    store: [{ id: '0', img: "../../img/store/njxd2.jpg", name: "那间小店", storetype: "实体店", phone: "581355482", address: "桂庙新村118号", price: "36", food: ["../../img/store/njxd2.jpg", "../../img/store/njxd3.jpg", "../../img/store/njxd4.jpg", "../../img/store/njxd5.jpg"] },
    { id: '1',img: "../../img/store/lyb.jpg", name: "来一煲", storetype: "外卖/实体店", phone: "293355482", address: "桂庙新村", price: "20", food: [] },
    { id: '2',img: "../../img/store/zhss.jpg", name: "中华寿司", storetype: "外卖/实体店", phone: "545685482", address: "桂庙新村小清新街", price: "28", food: [] }],
    storetemp: { id: "", image: "", pos_name: "", method: "", tel: "", per_price: "", menu_img: "", picktimes: "" },
    pickstorelist: [],
    picktimes: 0,
    heartpic:"https://i.loli.net/2018/05/07/5af074711463e.png"
  },
  pick: function () {

    var psl = this.data.pickstorelist, pt = this.data.picktimes;
    var sendstorage = [{ id: this.data.storetemp.id, picktimes: pt + 1 }];
    this.setData({
      heartpic: "https://i.loli.net/2018/05/07/5af01a2e3e1f3.png"
    })
    if (pt == 0) {//如果原次数为0，说明History数据表中还没有这个id的对象
      wx.setStorage({
        key: 'pickStoreList',
        data: psl.concat(sendstorage),
      })
    } else {
      for (var j = psl.length - 1; j >= 0; j--) {//否则存在，从数组最后一个元素开始遍历

        console.log("psl[j].id:" + psl[j].id + " sendstorage[0].id:" + sendstorage[0].id)
        if (psl[j].id.indexOf(sendstorage[0].id)!=-1) {//当id相同，找到这个店铺的对象
          for (var i = j; i >= 0; i-- , j--) {//继续向前遍历，因为增加次数后这个店铺排位可能前移
            console.log("sendstroge")
            console.log(sendstorage)
            console.log(i);
            console.log(psl[i])
            if (i == 0) {//走到尽头，说明这个店铺的被喜欢次数是最大的
              psl[i] = sendstorage[0];//坐上第一的位置，跳出循环
              break;
            }
            if (psl[i - 1].picktimes) {//如果前一个对象还存在
              if (psl[i].picktimes >= pt + 1) {//当这个店铺的被喜爱次数并没有大于他的前一位
                psl[i] = sendstorage[0];//说明不能再前移了，坐上当前的位置，跳出循环
                break;
              }
              psl[i] = psl[i - 1];//比前一位的被喜欢次数大，换位
            }
          }
        }
      }
      wx.setStorage({
        key: 'pickStoreList',
        data: psl,
      })
    }
    wx.getStorage({
      key: 'pickStoreList',
      success: function (res) {
        console.log("pick表改后")
        console.log(res.data)
      },
    })
  },
  onLoad: function (options) {
    var that = this;
    var store = JSON.parse(options.store);
    console.log(store)
    if (store.method == "[0]") {
      store.method = "实体店";
    } else if (store.method == "[1]") {
      store.method = "外卖";
    } else if (store.method == "[0,1]") {
      store.method = "实体店/外卖";
    }
    store.menu_img = store.menu_img.substr(1,store.menu_img.length-2);
    console.log(store.menu_img);
    store.menu_img = store.menu_img.split(/[,"]/);
    console.log(store.menu_img);
    this.setData({
      storetemp: store
    })
    wx.getStorage({
      key: 'pickStoreList',
      success: function (res) {
        that.setData({
          pickstorelist: res.data
        })

        console.log("加载到的数据(改前)：")
        console.log(res.data)
        var psltemp = that.data.pickstorelist;
        for (var i = 0; i < psltemp.length; i++) {
          if (psltemp[i].id.indexOf(store.id) !== -1) {
            // console.log(psl[i].id+" "+store.id+" "+psl[i].picktimes)
            if (psltemp[i].picktimes != '') {
              that.setData({ picktimes: psltemp[i].picktimes })
            }
          }
        }
      },
    })

  }
})
