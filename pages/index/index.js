// pages/index/index.js
var app = getApp();
var host=app.globalData.localHost;
/**
 * {
      "id": 10000054,
      "category": "1713,3274,13645",
      "fid": 1,
      "book_name": "西方哲学史讲演录",
      "author": "赵林",
      "isbn": "9787040236422",
      "imagePath": "http://img14.360buyimg.com/n0/jfs/t2503/212/1063202174/148094/3ae94e69/563c1a80N35fc633b.jpg",
      "keywords": "哲学史-西方国家",
      "pages": "373",
      "publishers": "高等教育出版社",
      "publish_time": "2009-11-01T00:00:00",
      "market_price": 23
    }
 * 
 */
//https://developers.weixin.qq.com/community/develop/doc/000c8c744083586af9762b59056c04
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    reader:null,
    flag:0,
    currentTab:0,
    category:[{'id':1,'name':'哲学'},{'id':2,'name':'历史学'}],
    bookSimpleList:null,
    keyword:"all",
    fid:1,
    field:"book_name",
    pageSize:10,
    pageIndex:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //app.js回调函数
    app.userInfoReadyCallback = res => {
      this.setData({
        openid:res.data.openid
      });
    },
    app.readerReadyCallback = res => {
      this.setData({
        reader:res.data
      });
    },
    //获取目录
    this.getCategory();
    this.search();
    },
     
  /**
 * 以下是自定义函数
 */
//获取学科分类目录
  getCategory:function(){
    var that=this;
    var category= wx.getStorageSync('P_BookClass');
    that.setData({category:category});
    if(!category){
      wx.request({
        url: host+'P_BookClass',
        success:res=>{
          wx.setStorageSync('P_BookClass', res.data);
          that.setData({category:res.data});
        },
        fail:res=>{
          console.log(res);
        }
      })
    }
  },
  //查询图书
  search:function(){
    var that=this;
    wx.request({
      url:host+ 'CBiblios/search',
      data:{
        keyword:that.data.keyword,
        fid:that.data.fid,
        field:that.data.book_name,
        pageSize:that.data.pageSize,
        pageIndex:that.data.pageIndex
      },
      success:res=>{
        console.log(res);
        
        that.setData({
          bookSimpleList:res.data
        });
      },
      fail:res=>{
        console.log(res);
      }
    })
  },
  //翻页
  turnPage:function(e){
    var that=this;
    console.log(e.currentTarget.dataset.id);
    if(e.currentTarget.dataset.id=="up"){
      var totalPage=that.data.bookSimpleList.total/that.data.pageSize;
      console.log(totalPage +":"+that.data.pageIndex);
      if(that.data.pageIndex>1){
        that.setData({pageIndex:that.data.pageIndex-1});
        that.search();
      }

    } else if(e.currentTarget.dataset.id=="down"){
      console.log(that.data.pageSize);
      var totalPage=that.data.bookSimpleList.total/that.data.pageSize;
      console.log(totalPage +":"+that.data.pageIndex);
      if(that.data.pageIndex<totalPage){
        that.setData({pageIndex:that.data.pageIndex+1});
        that.search();
      }
    }
  },
   //选择目录后显示图书书目简单列表
   switchNav: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    if (that.data.currentTab == id) {
      return false;
    } else {
      that.setData({ currentTab: id });
    }
    that.setData({ flag: id-1 });
    that.setData({fid:id});
    that.setData({pageIndex:1});
    that.search();
   },

})