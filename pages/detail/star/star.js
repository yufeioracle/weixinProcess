// pages/first/first.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      imageUrl: app.dataIndex.imageUrl
    });
  }
})