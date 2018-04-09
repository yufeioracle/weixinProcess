// pages/first/first.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmData:{},
    fileData:{},
    movie_type:[],
    title:"",
    centerTitle:"",
    image:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '电影详情'
    })
    that.setData({
      image: app.dataIndex.imageUrl
    });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/' + options.id,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        console.log();
        var score = {
          score: res.data.rating.average,
          image:that.data.image
        }
        var movie_type = [];
        for (var i in res.data.attrs.movie_type){
          if (i != ( res.data.attrs.movie_type.length - 1 ) ){
            movie_type.push((res.data.attrs.movie_type[i] + '、'))
          }else{
            movie_type.push(res.data.attrs.movie_type[i])
          }
        }
        that.setData({
          filmData: res.data,
          fileData: score,
          movie_type: movie_type,
          title: res.data.alt_title.substring(0, res.data.alt_title.indexOf('/')),
          centerTitle: res.data.alt_title.substring(res.data.alt_title.indexOf('/') + 1, res.data.alt_title.length)
        });
      },
      fail: function () {}
    })
  }
})