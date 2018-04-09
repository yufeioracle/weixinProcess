//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bookDetail:{},
    imageUrl: ""
  },
  shareFunc : function(){
    wx.showActionSheet({
      itemList: [
        '微信',
        'QQ',
        '朋友圈',
        '新浪微博'
      ],
    })
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      imageUrl: app.dataIndex.imageUrl
    });
    wx.setNavigationBarTitle({
      title: '文与字'
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/book/4229633',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
         that.setData({
           bookDetail:res.data
         });
      },
      fail: function () {
        console.log(111)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
