var app = getApp();
import config from '../../config.js';
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    priceStoreList:[]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
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
  toStoreDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../storeDetail/index?store=' + JSON.stringify(this.data.priceStoreList[e.currentTarget.id]),
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
    //调用api获取按价格排序的店铺
    wx.request({
      url: config.api + "stores?condition=price",
      success: function (res) {
        console.log("按价格排序的全部店铺数据：")
        console.log(res.data)
        that.setData({
          priceStoreList: res.data
        })
      }
    })
  },
  footerTap: app.footerTap
  
})