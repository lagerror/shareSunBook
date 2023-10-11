// pages/collector/collector.js
var app = getApp();
var host=app.globalData.localHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reader:null,
    holding:null,
    openid:null,
    bookType:0,
    pageSize:10,
    pageIndex:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getReader();
    this.getHolding(app.globalData.openid);
  },
  /**
 * 以下是自定义函数
 */
//获取读者信息
getReader:function(){
  var that=this;
  console.log(app.globalData.openid);
  if(app.globalData.openid)
  {
    wx.request({
      url:host+ 'CReader/openid?openid='+app.globalData.openid,
      success:res=>{
        that.setData({reader:res.data});
        console.log(that.data.reader);
      },
      fail:res=>{
        console.log(res);
      }

  })}
  else{
    wx.navigateTo({
      url: '../pages/my/my',
    })
  }
},
//获取藏书信息
getHolding:function(openid){
  var that=this;
    wx.request({
      url:host+ 'CHolding/openid',
      data:{
        openid:app.globalData.openid,
        bookType:that.data.bookType,
        pageSize:that.data.pageSize,
        pageIndex:that.data.pageIndex
      },
      success:res=>{
        that.setData({holding:res.data});
        console.log(that.data.holding);
      },
      fail:res=>{
        console.log(res);
      }
    })
},
//筛选holding
filter:function(e){
  console.log(e.currentTarget.dataset.id);
  var that=this;
  that.setData({bookType:e.currentTarget.dataset.id});
  that.getHolding(app.globalData.openid);
  
},
//扫码二维码录入个人藏书
scanIsbn:function(){
  wx.scanCode({
    success:res=>{
      if(res.errMsg=="scanCode:ok" & res.scanType=="EAN_13")
      {
        console.log(res);
      }
    }
  });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})