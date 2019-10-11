// pages/guess/guess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    random: {},
    result: [],
    question: 0,
    queResult: [],
    score:0,
    types: [{
        id: 1,
        name: "湿垃圾"
      },
      {
        id: 2,
        name: "干垃圾"
      },
      {
        id: 3,
        name: "可回收垃圾"
      },
      {
        id: 4,
        name: "有害垃圾"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 导入常见分类
    var res = require('../../resources/result.js');
    // 定义一个数组
    for (var i = 0; i < 4; i++) {
      // 把导入的分类转换成字符串
      var data = res.result.data[(i + 1).toString()];
      for (let item of data) {
        delete item.a;
        delete item.i;
        that.data.result.push(item)
      }
    }
    this.nextq();
  },
  // 点击选项
  guess(e) {
    var that = this;
    console.log(e.target.dataset.choose);
    console.log(that.data.random)
    if (e.target.dataset.choose == that.data.random.c) {
      wx.showToast({
        title: '恭喜你猜对啦',
        icon: 'success',
        mask:true,
        duration: 500
      });
      that.setData({
        score: that.data.score+10
      })
      that.data.random.bgcolor = "#6cde08";
    } else {
      wx.showToast({
        icon: 'none',
        mask: true,
        title: '应是' + that.getType(that.data.random.c),
        duration: 500
      });
      that.data.random.bgcolor = "#ec3309";
    };
    that.data.random.num = that.data.question
    this.data.random.c = that.getType(that.data.random.c);
    this.data.queResult.push(that.data.random);
    this.setData({
      queResult: that.data.queResult
    })
    console.log(this.data.queResult)
    setTimeout(function(){
        that.nextq()
    }
    ,500)
  },
  // 下一题
  nextq:function() {
    var that = this;
    // console.log(this.data.question)
    // if (this.data.question < 10) {
      // // 给data赋值这个对象
      this.setData({
        random: that.data.result[that.randomNum(0, that.data.result.length)]
      })
      this.data.question++
        this.setData({
          question: this.data.question++
        })
    // } else {
    //   console.log('客官没有了~~~')
    // }
  },
  // 跳转到倡议书页面
  sign:function(){
    wx.navigateTo({
      url: '../signbook/signbook',
    })
  },
  getType(i) {
    // 定义了分类名
    var getType = ["湿垃圾", "干垃圾", "可回收垃圾", "有害垃圾"]
    return getType[i - 1]
  },
  //生成从minNum到maxNum的随机数
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },
  /*
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    console.log(123)
  }
})