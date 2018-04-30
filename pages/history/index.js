var app = getApp();
import config from '../../config.js';
Page({
  data: {
    pickhistoryStoreList: [],
    // pickStoreList: [{ id: "2", picktimes: 12 }, { id: "11", picktimes: 7 }, { id: "5", picktimes: 5 }, { id: "3", picktimes: 4 }, { id: "1", picktimes: 2 }, { id: "26", picktimes: 1 }],
    pickStoreList: [],
    pickid: [],
    page: 1,
    pageSize: 4,
    hasMoreData: true
  },
  getStoreInfo: function (message) {
    var that = this;
    var page = that.data.page, ps = that.data.pageSize, phsl = that.data.pickhistoryStoreList;

    if (that.data.page == 1) {
      phsl = []
    }
    wx.request({
      url: config.api + 'stores/[' + that.data.pickid.slice(ps * (page - 1), ps * page + 1) + ']',
      success: function (res) {
        console.log(res.data);
        if (res.data.length < ps) {
          that.setData({
            pickhistoryStoreList: phsl.concat(res.data),
            hasMoreData: false
          })
        } else {
          that.setData({
            pickhistoryStoreList: phsl.concat(res.data),
            hasMoreData: true,
            page: page + 1
          })
        }
      }
    })
  },
  onReachBottom: function (e) {
    console.log('下拉')
    if (this.data.hasMoreData) {
      this.getStoreInfo('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  },

  onShow: function () {
    var that = this;
    var pickid = [];
    wx.getStorage({
      key: 'pickStoreList',
      success: function (res) {
        console.log(res.data)
        that.setData({
          pickStoreList: res.data
        })
        console.log("加载到的数据：")
        console.log(that.data.pickStoreList)

        var psl = that.data.pickStoreList;
        for (var i = 0; i < psl.length; i++) {
          pickid[i] = psl[i].id;
        }
        that.setData({
          pickid: pickid
        })
        that.getStoreInfo('正在加载数据...')
      },
    })
  }
})
