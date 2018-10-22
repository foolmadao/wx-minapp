// pages/search/search.js
var app = getApp()
var time
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // resultData = []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  backToHome:function(){
    wx.navigateBack({
      url:'/pages/home/home'
    })
  },
  
  searchMovie: function(e){
    clearTimeout(time)
    let value = e.detail.value
    var url = app.globalData.doubanBase + app.globalData.searchUrl + value
    var self = this
    time = setTimeout(function(){
      console.log(url)
      wx.request({
        url: url,
        method: 'GET',
        header: { 'content-type': 'json' },
        success: function (res) {
          //获取名称 图片 年份 导演 评分
          self.arrangeData(res.data.subjects)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },500)
  },
  arrangeData: function(list){
    var resultList = []
    console.log(list)
    list.forEach(item => {
      var dirs = item.directors.map(i => i.name).join('/')
      var desc = item.rating.average + '分 / ' + item.year + ' / ' + dirs
      resultList.push({
        title: item.title,
        image: item.images.small,
        desc,
        id: item.id
      })
    })
    this.setData({
      resultList: resultList
    })
  },
  bindToDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + id,
    })
  }
}) 