var app = getApp();
import config from '../../config.js';
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    condition: { storetype: '', pernum: '', price: "", method: '', ath: "", illness: [] },
    contemp:{},
    randomStore: {
      id: "1", name: "那间小店", pos_name: "桂庙新村", method: "0", tel: "123456", per_price: 50,
      menu_img: ["http://i1.bvimg.com/642660/20356d73d138635d.jpg", "http://i1.bvimg.com/642660/6d2fce1fabffbb2a.jpg", "http://i1.bvimg.com/642660/6393e5eaf208a31e.jpg"], image: "http://i1.bvimg.com/642660/aff69fa1e75e2331.jpg"
    },
    matchStoreList: []
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    // this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  editnew: function () {

    console.log("$$$$$$$$$$$$$$$$$$");
    console.log(this.data.condition);
    wx.navigateTo({
      url: '../conditionChocie/index?condition=' + JSON.stringify(this.data.condition),
    })
  },
  getrandomStore: function () {
    var that = this;
    wx.request({
      url: config.api + 'stores/0?random=true', 
      success: function (res) {
        console.log("随机店铺数据：")
        console.log(res.data)
        that.setData({
          randomStore: res.data
        })
        wx.navigateTo({
          url: '../storeDetail/index?store=' + JSON.stringify(that.data.randomStore),
        })
      }
    })

  },
  getrandomStoreMatched: function () {
    var that = this;
    if (that.data.matchStoreList.length == 0) {
      getrandomStoreMatched();
    }
    else {
      wx.navigateTo({
        url: '../storeDetail/index?store=' + JSON.stringify(that.data.matchStoreList[Math.round(Math.random() * (that.data.matchStoreList.length - 1))]),
      })
    }
  },
  onShow: function () {
    var that = this;
    this.setData({
      contemp:this.data.condition
    })

    var con = this.data.contemp;
    if (con.method == "实体店") {
      con.method = "0";
    } else if (con.method == "外卖") {
      con.method = "1";
    } else if (con.method == "无所谓") {
      con.method = "2";
    }

    if (con.ath == "减肥") {
      con.ath = "0";
    } else if (con.ath == "增肥") {
      con.ath = "1";
    } else if (con.ath == "无所谓") {
      con.ath = "2";
    }

    if (con.pernum == "一人食") {
      con.pernum = "0";
    } else if (con.pernum == "情侣") {
      con.pernum = "1";
    } else if (con.pernum == "小聚") {
      con.pernum = "2";
    } else if (con.pernum == "超多人") {
      con.pernum = "3";
    }

    if (con.storetype == "水吧") {
      con.storetype = "0";
    } else if (con.storetype == "甜品") {
      con.storetype = "1";
    } else if (con.storetype == "早餐") {
      con.storetype = "2";
    } else if (con.storetype == "夜宵") {
      con.storetype = "3";
    } else if (con.storetype == "正餐") {
      con.storetype = "4";
    }

    con.illness.splice(con.illness.indexOf("经期"), 1, "0");
    con.illness.splice(con.illness.indexOf("感冒"), 1, "1");
    con.illness.splice(con.illness.indexOf("牙疼"), 1, "2");
    con.illness.splice(con.illness.indexOf("有伤口"), 1, "3");
    con.illness.splice(con.illness.indexOf("熬夜"), 1, "4");
    con.illness.splice(con.illness.indexOf("肠胃不适"), 1, "5");

    console.log(config.api + 'stores?condition=matching&method="' + con.method + '"&per_price="' + con.price + '"&number="' + con.pernum + '"&fat="' + con.ath + '"&illness="' + con.illness + '"&type=4');
    //传condition调用api获得匹配度较高的店铺列表，赋值给matchStoreList
    wx.request({
      url: config.api + "stores?condition=matching&method=" + 1 + "&per_price=" + con.price + "&number=" + con.pernum + "&fat=" + con.ath + "&illness=[" + con.illness + "]&type=" + con.storetype,
      // url: config.api + 'stores?condition=matching&method=0&per_price=60&number=1&fat=1&illness=[0,1]&type=4', 
      success: function (res) {
        console.log("匹配度较高的店铺数据：")
        console.log(res.data)
        that.setData({
          matchStoreList: res.data
        })
      }
    })
    //伪数据赋值给matchStoreList
    // that.setData({
    //   matchStoreList: [{
    //     id: "1", name: "那间⼩店", pos_name: "桂庙", method: "0", tel: "123456", per_price: 50,
    //     menu_img: ["http://i1.bvimg.com/642660/20356d73d138635d.jpg", "http://i1.bvimg.com/642660/6d2fce1fabffbb2a.jpg", "http://i1.bvimg.com/642660/6393e5eaf208a31e.jpg"], number: [1, 2, 3],
    //     image: "http://i1.bvimg.com/642660/aff69fa1e75e2331.jpg", matchingDegree: 83
    //   }, {
    //     id: "2", name: "中华寿司", pos_name: "桂庙", method: "0", tel: "123456", per_price: 50,
    //     menu_img: [], number: [0, 1, 2],
    //     image: "http://i1.bvimg.com/642660/ecffda83d06197a0.jpg", matchingDegree: 79
    //   }, {
    //     id: "3", name: "来一煲", pos_name: "桂庙", method: "0", tel: "123456", per_price: 50,
    //     menu_img: [], number: [0, 1, 2],
    //     image: "http://i1.bvimg.com/642660/4a5de66105a4af79.jpg", matchingDegree: 70
    //   }, {
    //     id: "4", name: "那间⼩店", pos_name: "桂庙", method: "0", tel: "123456", per_price: 50,
    //     menu_img: [], number: [1, 2, 3],
    //     image: "http://i1.bvimg.com/642660/aff69fa1e75e2331.jpg", matchingDegree: 69
    //   }, {
    //     id: "5", name: "中华寿司", pos_name: "桂庙", method: "0", tel: "123456", per_price: 50,
    //     menu_img: [], number: [0, 1, 2],
    //     image: "http://i1.bvimg.com/642660/ecffda83d06197a0.jpg", matchingDegree: 68
    //   }, {
    //     id: "6", name: "来一煲", pos_name: "桂庙", method: "0", tel: "123456", per_price: 50,
    //     menu_img: [], number: [0, 1, 2],
    //     image: "http://i1.bvimg.com/642660/4a5de66105a4af79.jpg", matchingDegree: 76
    //   }]
    // })
  },
  toStoreDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../storeDetail/index?store=' + JSON.stringify(this.data.matchStoreList[e.currentTarget.id]),
    })
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})