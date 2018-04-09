// pages/first/first.js
const app = getApp();
var nowPage = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "",
    image:"",
    fileData:[],
    scrollHeight:0,
    isHidden:true,
    inputSearchData:""
  },
  txtData:function(e){
    const that = this;
    that.setData({
      inputSearchData: e.detail.value
    });
  },
  fileSearch:function(){
    const that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search',
      data: { q: that.data.inputSearchData },
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        var data = [];
        for (var i = 0; i < res.data.subjects.length; i++) {
          data.push(res.data.subjects[i]);
        }
        that.setData({
          fileData: data
        });
      },
      fail: function () {
        console.log(111)
      }
    })
  },
  bindDownLoad1 :function(e){
    const that = this;
    nowPage ++;
    if (!that.data.isHidden){
        return;
    }
    that.setData({
      isHidden: false
    });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: { start: nowPage * 9, count: 9 },
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        var data = that.data.fileData;
        for (var i in res.data.subjects) {
          data.push({
            id: res.data.subjects[i].id,
            imageUrl: res.data.subjects[i].images.small,
            filmName: res.data.subjects[i].title,
            score: res.data.subjects[i].rating.average,
            image: that.data.image
          });
        }
        that.setData({
          fileData: data,
          isHidden: true
        });
      },
      fail: function () {
        console.log(111)
      }
    })
  },
  toFilmDetailFunc:function(event){
    wx.navigateTo({
      url: '../fileDetail/fileDetail?id=' + event.currentTarget.dataset.index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      image: app.dataIndex.imageUrl
    });
    wx.getSystemInfo({
        success:function(res) {
           that.setData({
              scrollHeight:res.windowHeight
            });
        }
    });
    wx.setNavigationBarTitle({
      title: '电影列表'
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: {start:0 , count:9},
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        var data = [];
        for (var i in res.data.subjects){
          data[i] = {
            id: res.data.subjects[i].id,
            imageUrl: res.data.subjects[i].images.small,
            filmName: res.data.subjects[i].title,
            score: res.data.subjects[i].rating.average,
            image:that.data.image
          };
        }
        that.setData({
          fileData: data
        });
      },
      fail: function () {
        console.log(111)
      }
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  }
})