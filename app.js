// app.js
App({
 onLaunch(){
    let that=this;
    try{
      var reader = wx.getStorageSync('reader')
      if (reader && reader.openid) {
        //远程获取用户信息
        wx.request({
          url: this.globalData.localHost + 'CReader/openid?openid=' + reader.openid,
          success: res => {
            this.globalData.reader = res.data;
            this.globalData.openid=res.data.openid;
            wx.setStorageSync("reader", res.data);
            if (this.readerReadyCallback) {
              this.readerReadyCallback(res)
            }
          },
          fail: res => {
            console.log(res);
          }
        })
      } else{
        wx.login({
          success: (res) => {
            wx.request({
              url: this.globalData.localHost+'CReader/code?code='+res.code,
              success:res=>{
                this.globalData.openid=res.data.openid;
                var reader ={"openid":res.data.openid}
                wx.setStorageSync('reader', reader);
                //https://developers.weixin.qq.com/community/develop/doc/000c8c744083586af9762b59056c04
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              },
              fail:res=>{
                console.log(res);
              }
            })
          },
          fail:(res)=>{
            console.log(res);
          }
        })  
      }
    } catch(e){
      console.log(e);
    }

 },
 globalData:{
   openid:null,
   reader:null,
   //localHost:'http://localhost:5157/api/'
   localHost:'https://reader.yangtzeu.edu.cn/mini/api/'
 }

})