import chartWrap from '../canvas/chartWrap'
import getConfig from './getConfig'
var app = getApp();

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    ifcanvas: "block",
    stocon: "",
    condition: { storetype: '', pernum: '', price: "", method: '', ath: "", illness: [] },
    illness: [
      { name: "经期", value: "经期" },
      { name: "感冒", value: "感冒" },
      { name: '肠胃不适', value: '肠胃不适' },
      { name: "牙疼", value: "牙疼" },
      { name: '熬夜', value: '熬夜' },
      { name: '有伤口', value: '有伤口' }],
    ath: [
      { name: "减肥", value: "减肥" },
      { name: "增肥", value: "增肥" },
      { name: "无所谓", value: "无所谓" }],
    method: [
      { name: "外卖", value: "外卖" },
      { name: "实体店", value: "实体店" },
      { name: "无所谓", value: "无所谓" }],
    pernum: [
      { name: "一人食", value: "一人食" },
      { name: "情侣", value: "情侣" },
      { name: "小聚", value: "小聚" },
      { name: "超多人", value: "超多人" },],
    storetype: [
      { name: "水吧", value: "水吧" },
      { name: "甜品", value: "甜品" },
      { name: "早餐", value: "早餐" },
      { name: "夜宵", value: "夜宵" },
      { name: "正餐", value: "正餐" }],
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    if (e.detail.current != 0) {
      this.setData({
        ifcanvas: "none"
      })
    } else {
      this.setData({
        ifcanvas: "block"
      })
    }
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
    else if (e.target.id == "method") {
      arr = this.data.method
    }
    else if (e.target.id == "storetype") {
      arr = this.data.storetype
    }
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < arr.length; i++) {
      // console.log(e)
      if (checked.indexOf(arr[i].name) !== -1) {
        changed['arr[' + i + '].checked'] = true;
        var con = this.data.condition;
        if (e.target.id == "ath") {
          con.ath = checked;
        }
        else if (e.target.id == "pernum") {
          con.pernum = checked;
        }
        else if (e.target.id == "method") {
          con.method = checked;
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
        changed['arr[' + i + '].checked'] = false
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
    // var pages = getCurrentPages();
    // var changed = {};
    // changed['items[' + this.data.condition.id + ']'] = this.data.condition
    // var prevPage = pages[pages.length - 2];
    // prevPage.setData(changed)
    var that=this;
    // wx.getStorage({
    //   key: 'stocon',
    //   success: function (res) {
    //     console.log("更改缓存数据前：")
    //     console.log(res.data)
    //     that.setData({
    //       stocon:res.data
    //     })
    //   }
    // })
    var changed = {};
    changed['stocon[' + this.data.condition.id + ']'] = this.data.condition
    this.setData(changed)
    console.log("要写入缓存的数据:")
    console.log(this.data.stocon);
    wx.setStorage({
      key: 'stocon',
      data: this.data.stocon,
    })
    // wx.getStorage({
    //   key: 'stocon',
    //   success: function (res) {
    //     console.log("更改缓存数据后：")
    //     console.log(res.data)
    //   }
    // })
    wx.navigateBack({
      delta: 1
    })
  },
  slider4change: function (e) {
    var changed = {};
    changed['condition.price'] = e.detail.value;
    this.setData(changed);
  },
  onShow: function () {
    let pageThis = this
    var runData = wx.getStorageSync("run");
    console.log(runData);
    let labels = ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "今天"]
    let data = [4055, 2545, 9644, 3659, 1640, 3589, 425]

    for (var i = 6; i > 0; i--) {
      var date = new Date(runData.stepInfoList[24 + i].timestamp * 1000)
      console.log(date)
      labels[i] = date.getMonth() + 1 + "." + date.getDate();
      data[i] = runData.stepInfoList[24 + i].step;
    }
    app.deviceInfo.then(function (deviceInfo) {
      console.log('设备信息', deviceInfo)

      let width = 350;
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

    var athtemp = this.data.ath, sttemp = this.data.storetype, pntemp = this.data.pernum,mtemp=this.data.method;
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
    for (var i = 0; i < mtemp.length; i++) {
      if (con.method.indexOf(mtemp[i].name) != -1) {
        changed['method[' + i + '].checked'] = true
      }
    }
    this.setData(changed)
    console.log(this.data.ath);

    var that = this;

    wx.getStorage({
      key: 'stocon',
      success: function (res) {
        console.log("更改缓存数据前：")
        console.log(res.data)
        that.setData({
          stocon: res.data
        })
      }
    })

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
    // console.log(this.data.winHeight);

  },

  footerTap: app.footerTap,


})