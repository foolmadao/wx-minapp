// pages/type/type.js
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
    console.log(options)
    var typeId = options.typeId
    var that = this

    wx.request({
      url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/'+typeId,
      success: function(res){
        console.log(res)
        that.setData({
          commendImage: res.data.data.imgSrc,
          title: res.data.data.title
        })
      }
      
    })
    wx.request({
      url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/'+typeId,
      success: function(res){
        console.log(res.data.data.length)

        if(wx.getStorageSync('likeArrList') == ''){
          let likeArr = []
          for(let i = 0; i < res.data.data.length; i++ ){
            likeArr[i] = Math.random() > 0.5 ? true : false;
          }
          wx.setStorageSync('likeArrList',likeArr)
        }
        let arr = wx.getStorageSync('likeArrList')
        that.setData({
          articleList: res.data.data,
          typelikeArr: arr
        })
        
      }
    })
  },
  onmoreTap: function(e){
    console.log(e)
    let type = e.currentTarget.dataset.articletype
    wx.showActionSheet({
      itemList: ["内容过期了","内容和" + type +"不相关","不再显示" + type + "的内容"]
    })

  },
  like: function(e){
    console.log(this.data.typelikeArr)
    let index = e.currentTarget.dataset.likeindex
    this.data.typelikeArr[index] = !this.data.typelikeArr[index]
    wx.setStorageSync('likeArrList',this.data.typelikeArr)
    this.setData({
      typelikeArr: this.data.typelikeArr
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