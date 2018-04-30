import chartWrap from '../canvas/chartWrap'
import getConfig from './getConfig'
var app = getApp();

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    ifcanvas:"block",
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
    if (e.detail.current!=0){
      this.setData({
        ifcanvas:"none"
      })
    }else {
      this.setData({
        ifcanvas: "block"
      })
    }
    console.log(e.detail.current+" "+this.data.ifcanvas)
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
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      condition: this.data.condition
    })
    wx.navigateBack({
      delta: 1
    })
  },
  // radioChange: function (e) {
  //   //删除同字段的标签
  //   var con = this.data.condition;
  //   for (var i = 0; i < con.length; i++) {
  //     if (con[i].id == e.target.id) {
  //       con.splice(i, 1);
  //       this.setData({
  //         condition: con
  //       });
  //     }
  //   }
  //   var arr;
  //   if (e.target.id == "ath") {
  //     arr = this.data.ath
  //   }
  //   else if (e.target.id == "pernum") {
  //     arr = this.data.pernum
  //   }
  //   else if (e.target.id == "storetype") {
  //     arr = this.data.storetype
  //   }
  //   var checked = e.detail.value
  //   var changed = {}
  //   for (var i = 0; i < arr.length; i++) {
  //     if (checked.indexOf(arr[i].name) !== -1) {
  //       changed['arr[' + i + '].checked'] = true;
  //       var addcon = { con: checked, id: e.target.id };
  //       con.push(addcon);
  //       this.setData({
  //         condition: con
  //       })
  //     } else {
  //       changed['athlete[' + i + '].checked'] = false
  //     }
  //   }
  //   this.setData(changed)
  // },

  // checkboxChange: function (e) {
  //   var checked = e.detail.value
  //   var changed = {}

  //   console.log(checked);
  //   for (var i = 0; i < this.data.illness.length; i++) {
  //     if (checked.indexOf(this.data.illness[i].name) !== -1) {
  //       changed['illness[' + i + '].checked'] = true
  //     } else {
  //       changed['illness[' + i + '].checked'] = false
  //     }
  //   }
  //   console.log(this.data.condition)
  //   var con = this.data.condition;
  //   for (var i = con.length - 1; i >= 0; i--) {

  //     console.log(con[i].con + " " + con[i].id);
  //     if (con[i].id == "illness") {
  //       con.splice(i, 1);
  //       this.setData({
  //         condition: con
  //       });
  //       continue;
  //     }
  //   }
  //   for (var i = 0; i < checked.length; i++) {
  //     var addcon = { con: checked[i], id: "illness" };
  //     con.push(addcon);
  //     this.setData({
  //       condition: con
  //     })
  //   }
  //   console.log(this.data.condition)
  //   this.setData(changed)
  // },

  retopre: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      condition: this.data.condition
    })
    wx.navigateBack({
      delta: 1
    })
  },
  onShow: function () {
    let pageThis = this
    app.deviceInfo.then(function (deviceInfo) {
      console.log('设备信息', deviceInfo)
      let labels = ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "今天"]
      let data = [4055, 2545, 9644, 3659, 1640, 3589, 425]
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
  slider4change:function(e){
    var changed={};
    changed['condition.price'] = e.detail.value;
    this.setData(changed);
  },
  onLoad: function (options) {
    var con = JSON.parse(options.condition);
    console.log("******************");
    console.log(con);
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
    for (var i = 0; i < mtemp.length; i++) {
      if (con.method.indexOf(mtemp[i].name) != -1) {
        changed['method[' + i + '].checked'] = true
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
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://test.com/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
    // wx.request({
    //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid="wx5d1c7ba289c985b8"&secret="a0c588c5a4a2bc6346d685d799a5ab41"&js_code=code"&grant_type=authorization_code'
    // })
    // wx.getWeRunData({
    //   success(res) {
    //     const encryptedData = res.encryptedData;
    //     var WXBizDataCrypt = require('./WXBizDataCrypt')

    //     var appId = 'wx5d1c7ba289c985b8'
    //     var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='//sessionkey和iv要通过code换取
    //     var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

    //     var pc = new WXBizDataCrypt(appId, sessionKey)

    //     var data = pc.decryptData(encryptedData, iv)

    //     console.log('解密后 data: ', data)
    //     console.log(encryptedData);
    //   }
    // });
  },

  footerTap: app.footerTap
})