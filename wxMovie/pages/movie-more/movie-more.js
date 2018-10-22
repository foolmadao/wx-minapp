// pages/movie-more/movie-more.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInTheaters:true,
    showComingSoon:false,
    inTheaters:{},
    comingSoon:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.typeId)
    var typeId = options.typeId
    if (typeId == 'inTheaters'){
      this.setData({
        showInTheaters:true,
        showComingSoon: false
      })
    }else{
      this.setData({
        showInTheaters: false,
        showComingSoon: true
      })
    }
    this.getMovieListData(typeId)
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
  getMovieListData(typeId){
    let url
    if (typeId == 'inTheaters'){
      url = app.globalData.doubanBase + app.globalData.inTheaters

    }else{
      url = app.globalData.doubanBase + app.globalData.comingSoon
    }
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:10000
    })
    var offset = this.data[typeId].offset || 0
    var total = this.data[typeId].total || 999
    if(offset >= total){
      wx.hideToast()
      return
    }      
    wx.request({
      url,
      type:'GET',
      header:{'content-type':'json'},
      data:{
        start: offset,
        count:5
      },
      success:res => {
        var subjects = res.data.subjects
        var movies = this.data[typeId].movies || []
        var total = res.data.total
        var offset = this.data[typeId].offset || 0
        offset += subjects.length
        subjects.forEach(item => {
          let allCasts = item.casts.map(i => i.name).join(' / ')
          let allDirs = item.directors.map(i => i.name).join(' / ')
          let allGenres = item.genres.join(' / ')
          let movie = {
            ...item,
            allCasts,
            allDirs,
            allGenres,
            typeId
          }
          movies.push(movie)
        })
        this.setData({
          [typeId]:{
            offset,total,movies
          }
        })
      },
      fail: err => cosnole.log(err),
      complete(){
        wx.hideToast()
      }
    })
  },
  selectTap(e){
    var tabId = e.currentTarget.dataset.tabId
    if (tabId == 'inTheaters'){
      this.setData({
        showInTheaters: true,
        showComingSoon: false
      })
    }else{
      this.setData({
        showInTheaters: false,
        showComingSoon: true
      })
    }
    console.log(this.data[tabId].movies)
    if (!this.data[tabId].movies){
      this.getMovieListData(tabId)
    }
  },
  loadMore(){
    var typeId
    if(this.data.showInTheaters){
      typeId = 'inTheaters'
    }else{
      typeId = 'comingSoon' 
    }
    this.getMovieListData(typeId)
  },
  handleTicket(){
    wx.showModal({
      title: '提示',
      content: '我不卖票'
    })
  },
  handleWish() {
    wx.showModal({
      title: '提示',
      content: '想看自己去'
    })
  },
  bindToDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + id,
    })
  }

  
  
})