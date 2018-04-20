import chartWrap from '../canvas/chartWrap'
import getConfig from './getConfig'
var app = getApp();

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    condition: { storetype: '', pernum: "", price: "", ath: "", illness: [] },
    illness: [
      { name: "经期", value: "经期", checked: false },
      { name: "感冒", value: "感冒", checked: false },
      { name: "牙疼", value: "牙疼", checked: false },
      { name: '熬夜', value: '熬夜', checked: false },
      { name: '腹泻', value: '腹泻', checked: false },
      { name: '有伤口', value: '有伤口', checked: false }],
    ath: [
      { name: "减肥", value: "减肥", checked: false },
      { name: "增肥", value: "增肥", checked: false },
      { name: "无所谓", value: "无所谓", checked: false }],
    storetype: [
      { name: "外卖", value: "外卖", checked: false },
      { name: "实体店", value: "实体店", checked: false },
      { name: "无所谓", value: "无所谓", checked: false }],
    pernum: [
      { name: "一人食", value: "一人食", checked: false },
      { name: "情侣", value: "情侣", checked: false },
      { name: "小聚", value: "小聚", checked: false },
      { name: "超多人", value: "超多人", checked: false },
    ]
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
  radioChange: function (e) {
    //删除同字段的标签

    var arr;
    if (e.target.id == "ath") {
      arr = this.data.ath
    }
    else if (e.target.id == "pernum") {
      arr = this.data.pernum
    }
    else if (e.target.id == "storetype") {
      arr = this.data.storetype
    }
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < arr.length; i++) {
      if (checked.indexOf(arr[i].name) !== -1) {
        changed['arr[' + i + '].checked'] = true;
        var con = this.data.condition;
        if (e.target.id == "ath") {
          con.ath = checked;
        }
        else if (e.target.id == "pernum") {
          con.pernum = checked;
        }
        else if (e.target.id == "storetype") {
          con.storetype = checked;
        }

        console.log(con);
        this.setData({
          condition: con
        })
        console.log(this.data.condition);
      } else {
        changed['athlete[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}

    console.log(checked);
    for (var i = 0; i < this.data.illness.length; i++) {
      if (checked.indexOf(this.data.illness[i].name) !== -1) {
        changed['illness[' + i + '].checked'] = true
      } else {
        changed['illness[' + i + '].checked'] = false
      }
    }
    for (var i = 0; i < checked.length; i++) {
      var con = this.data.condition;
      con.illness = checked;
      console.log(con);
      this.setData({
        condition: con
      })
      console.log(this.data.condition);
    }
    this.setData(changed)
  },

  retopre: function () {
    var pages = getCurrentPages();
    var changed = {};
    changed['items[' + this.data.condition.id + ']'] = this.data.condition
    var prevPage = pages[pages.length - 2];
    prevPage.setData(changed)
    wx.navigateBack({
      delta: 1
    })
  },
  onShow: function () {
    let pageThis = this
    app.deviceInfo.then(function (deviceInfo) {
      console.log('设备信息', deviceInfo)
      let labels = ["11-01", "11-02", "11-03", "11-04", "11-05", "11-06", "十二月"]
      let data = [4055, 2545, 9644, 3659, 1640, 3589, 425]
      let width = 300;
      // let width = Math.floor(deviceInfo.windowWidth - (deviceInfo.windowWidth / 750) * 10 * 2)//canvas宽度
      let height = Math.floor(width / 1.6)//这个项目canvas的width/height为1.6
      let canvasId = 'myCanvas'
      let canvasConfig = {
        width: width,
        height: height,
        id: canvasId
      }
      let config = getConfig(canvasConfig, labels, data)
      chartWrap.bind(pageThis)(config)

    })
  },
  onLoad: function (options) {
    var con = JSON.parse(options.condition);
    var changed = {};
    this.setData({
      condition: con
    })
    var athtemp = this.data.ath, sttemp = this.data.storetype, pntemp = this.data.pernum;
    for (var i = 0; i < athtemp.length; i++) {
      console.log(con.ath + " " + athtemp[i].name)
      if (con.ath.indexOf(athtemp[i].name) !== -1) {
        // console.log(con.ath + " " + athtemp[i].name)
        changed['ath[' + i + '].checked'] = true
        // console.log(changed);
      }
      if (con.storetype.indexOf(sttemp[i].name) != -1) {
        changed['storetype[' + i + '].checked'] = true
      }
    }
    for (var i = 0; i < pntemp.length; i++) {
      if (con.pernum.indexOf(pntemp[i].name) != -1) {
        changed['pernum[' + i + '].checked'] = true
      }
    }
    for (var j = 0; j < con.illness.length; j++) {
      for (var i = 0; i < this.data.illness.length; i++) {
        if (con.illness[j].indexOf(this.data.illness[i].name) !== -1) {
          changed['illness[' + i + '].checked'] = true
        }
      }
    }
    this.setData(changed)
    console.log(this.data.ath);

    var that = this;

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 140;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    console.log(this.data.winHeight);

  },

  footerTap: app.footerTap
})