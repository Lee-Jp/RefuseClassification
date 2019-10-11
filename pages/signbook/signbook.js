// pages/signbook/signbook.js
import Poster from '../../components/wxa-plugin-canvas/poster/poster';

const posterConfig = {
  demoConfig: {
    width: 563,
    height: 1000,
    backgroundColor: '#fff',
    debug: false,
    texts: [
      {
        x: 200,
        y: 910,
        text: [{
            text: '长按识别小程序',
            fontSize: 30,
            color: '#666666',
            opacity: 1,
            marginTop: 30,
            lineHeight: 30,
          },

        ],
        baseLine: 'middle',
      },
      {
        x: 200,
        y: 950,
        text: [{
          text: '垃圾分类从未如此简单',
          fontSize: 30,
          color: '#666666',
          opacity: 1,
          marginTop: 30,
          lineHeight: 30,
        }, ],
        baseLine: 'middle',
      }
    ],
    images: [{
        url: '/resources/poster.jpg',
        width: 563,
        height: 1000,
        y: 0,
        x: 0
    }, 
    {
        url: '/resources/scan.jpg',
        width: 120,
        height: 120,
        y: 860,
        x: 20,
        borderRadius: 100
      },
    ]
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    posterConfig: posterConfig.demoConfig,
    nickName: "",
    shareImgSrc:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  onPosterSuccess(e) {
    console.log(e.detail)
    this.setData({
      shareImgSrc: e.detail
    })
    console.log('haole')
    console.log(this.data.shareImgSrc)

    const {
      detail
    } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.error(err);
  },

  onGotUserInfo: function(e) {
    var that = this;
    console.log(e.detail.userInfo.nickName)
    this.setData({
      nickName: e.detail.userInfo.nickName
    })
    posterConfig.demoConfig.texts.push({
      x: 20,
      y: 30,
      text: [{
        text: that.data.nickName + ' 我是垃圾分类倡行者',
          fontSize: 30,
          color: '#c97170',
          opacity: 1,
          marginTop: 30,
          lineHeight: 30,
          fontWeight: 'bold',
          fontStyle: 'italic'
        },

      ],
      baseLine: 'middle',
    })
    that.onCreatePoster();
  },
  /**
   * 异步生成海报
   */
  onCreatePoster() {
    var that = this;
    this.setData({
      posterConfig: posterConfig.demoConfig
    }, () => {
      Poster.create(true); // 入参：true为抹掉重新生成
    });
    setTimeout(function(){
      that.savephoto();
    },3000)
  },
savephoto(){
  var that = this
  wx.saveImageToPhotosAlbum({ // 这张图片保存到本地相册
    //shareImgSrc为canvas赋值的图片路径
    filePath: that.data.shareImgSrc,
    success(res) {
      console.log('保存成功');
      wx.showModal({
        title: '保存成功',
        content: '图片成功保存到相册了，快去发朋友圈吧~',
        showCancel: false,
        confirmText: '确认',
        confirmColor: '#21e6c1',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      })
    },
    fail(res){
      console.log('保存失败');
      wx.showToast({
        title: '保存失败，请手动保存',
        icon:'none'
      })

    }
  })
},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log(123)
  }
})