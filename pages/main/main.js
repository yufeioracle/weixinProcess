// pages/first/first.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    imageUrl:"",
    bookesArr:[],
    txtData:"",
    hasData:false
  },
  clearSearch : function(){
    this.setData({
      bookesArr:[],
      txtData:"",
      hasData:false
    });
  },
  toDetail : function(event){
    wx.navigateTo({
      url: '../bookDetail/bookDetail?id=' + event.currentTarget.dataset.index,
    })
  },
  txtData :function(e){
    const that = this;
    that.setData({
      txtData: e.detail.value
    });
    if (e.detail.value == ""){
      that.setData({
        hasData:false
      });
      return;
    }
    that.setData({
      hasData: true
    });
    wx.request({
      url: 'https://douban.uieee.com/v2/book/search',
      data: { q: e.detail.value},
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        that.setData({
          bookesArr: res.data.books
        });
      },
      fail: function () {
        console.log(111)
      }
    })
    this.setData({
      txtData: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      imageUrl :app.dataIndex.imageUrl
    });
    wx.setNavigationBarTitle({
      title: '文与字'
    })

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})