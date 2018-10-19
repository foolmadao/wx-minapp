// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url :'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getRecommendInfo',
        success:function(res){
          let data = res.data.data
          that.setData({
            date: data.date,
            recommendTitle: data.title,
            recommendImage: data.imgSrc
          })
        }
      })
      wx.request({
        url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getMarkTypeList",
        success: function(res){
          that.setData({
            tag: res.data.data
          })
        }
      })
      wx.request({
        url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getHomeArticleList",
        
        success: function(res){
          if(wx.getStorageSync('arrList') == ''){
            let likeArr = []
            for(let i = 0; i < res.data.data.length; i++ ){
              likeArr[i] = Math.random() > 0.5 ? true : false;
            }
            wx.setStorageSync('arrList',likeArr)
          }
          let arr = wx.getStorageSync('arrList')
          that.setData({
            perInfo: res.data.data,
            likeArr: arr
          })
        }
      })
  },
  onmoreTap: function(e){
    let type = e.currentTarget.dataset.articletype
    wx.showActionSheet({
      itemList: ["内容过期了","内容和" + type +"不相关","不再显示" + type + "的内容"]
    })

  },

  like: function(e){
    let index = e.currentTarget.dataset.likeindex
    this.data.likeArr[index] = !this.data.likeArr[index]
    wx.setStorageSync('arrList',this.data.likeArr)
    this.setData({
      likeArr: this.data.likeArr
    })
  },
  onArticleTypeTap:function(e){
    var typeId = e.currentTarget.dataset.articletypeid;
    wx.navigateTo({
      url: '/pages/type/type?typeId='+typeId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(function(){
      wx.hideLoading()
    },1000)
    
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