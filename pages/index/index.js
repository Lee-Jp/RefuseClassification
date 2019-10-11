// pages/index/index.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serch:"",
    shouldkey:[],
    collections:[],
    selectedSort: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 导入常见分类
    var res = require('../../resources/result.js');
    // 定义一个数组
    var result = [];
    for (var i = 0; i < 4; i++) {
      // 把导入的分类转换成字符串
      var data = res.result.data[(i + 1).toString()];
      // 获取分类标准
      var model = that.getSort(i);
      // 给每个分类标准加入数据
      model["wasts"] = data;
      // 组合成一个新的数组，数组中有分类标准和常见举例
      result.push(model);
    }
    // 给全局赋值这个数组
    getApp().globalData.collections = result;
    console.log(result)
    // 给data赋值这个数组
    that.setData({
      collections: result
    })
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //输入要搜索的内容
  seach(e){
    that = this;
    let keyword = e.detail.value;
    if(keyword){
      wx.request({
        url: 'https://sffc.sh-service.com/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler_2.ashx?a=GET_KEYWORDS&kw=' + keyword,
        success(res) {
          // console.log(res.data.kw_list)
          that.setData({
            shouldkey: res.data.kw_list
          })
        }
      })
    }else{
      that.setData({
        shouldkey: []
      })
    }
  },
  //根据选择的词来获取具体的分类
  searchSort(e) {
    var that = this
    var shouldkey = e.currentTarget.dataset.shouldkey
    // console.log(e)
    wx.request({
      url: 'https://sffc.sh-service.com/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler_2.ashx?a=EXC_QUERY&kw=' + shouldkey,
      success(res) {
        var type = res.data.query_result_type_1.trashType
        that.setData({
          // 得到分类详情
          selectedSort: that.getSort(that.handleSorch(type))
        })
      }
    })
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../wastList/wastList?index=' + e.currentTarget.dataset.index
    })
  },
  // 清空输入内容
  clear(){
    this.setData({
      shouldkey: [],
      search: ""
    })
  },
  dismiss() {
    this.setData({
      selectedSort: null
    })
  },
  // 跳转猜一猜
  cai:function(){
    wx.navigateTo({
      url: '../guess/guess',
    })
  },
  handleSorch(i) {
    console.log(i)
    switch (i) {
      case 1:
        i = 3
        break
      case 2:
        i = 2
        break
      case 3:
        i = 0
        break
      case 4:
        i = 1
        break
      case 7:
        i = 4
        break
      case 6:
        i = 5
        break
    }
    return i
  },
    // 执行这个方法就会得到组合好的数组
  getSort(i) {
    // 定义了分类名
    var names = ["湿垃圾", "干垃圾", "可回收垃圾", "有害垃圾", "建筑垃圾", "大件垃圾"]
    // 定义了图片背景色
    var colors = ["#48D1CC", "#8B4513", "#7CFC00", "#FF0000", "#8B4513", "#13227a"]
    // 定义了垃圾的描述信息
    var des = ["日常生活垃圾产生的容易腐烂的生物质废弃物",
      "除有害垃圾、可回收物、 湿垃圾以外的其他生活废弃物",
      "适宜回收利用和资源化利 用的，如：玻、金、塑、 纸、衣",
      "对人体健康或者自然环境造成直接或潜在危害的废弃物",
      "建筑装修产生的垃圾, 不能直接丢入垃圾桶，需要投入专门的建筑垃圾桶或联系物业处理",
      "尺寸较大的垃圾，无法装入垃圾箱"
    ]
    // 进行举例
    var inc = ["剩菜剩饭、瓜皮果核、花卉绿植、过期食品等",
      "餐盒、餐巾纸、湿纸巾、卫生间用纸、塑料袋、 食品包装袋、污染严重的纸、烟蒂、纸尿裤、 一次性杯子、大骨头、贝壳、花盆、陶瓷等",
      "酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等",
      "废电池、油漆桶、荧光灯管、废药品及其包装物等",
      "砖块、瓷砖等",
      "拉杆箱、自行车"
    ]
    // 投放建议
    var req = ["尽量沥干水分 难以辨识类别的生活垃圾投入干垃圾容器内",
      "纯流质的食物垃圾，如牛奶等，应直接倒进下水口 有包装物的湿垃圾应将包装物去除后分类投放，包装物请投放到对应的可回收物或干垃圾容器",
      "轻投轻放 清洁干燥，避免污染 废纸尽量平整 立体包装物请清空内容物，清洁后压扁投放 有尖锐边角的，应包裹后投放",
      "投放时请注意轻放 易破损的请连带包装或包裹后轻放 如易挥发，请密封后投放",
      "不能直接丢入垃圾桶，需要投入专门的建筑垃圾桶或联系物业处理!",
      "不能直接丢入垃圾桶，可以预约可回收物经营者或者大件垃圾手机运输单位上门回收，或者投放至管理责任人制定的场所"
    ]
    // 组成一个新的数组，把所有信息按垃圾进行分类
    var model = {
      "name": names[i],
      "color": colors[i],
      "icon": "../../resources/" + (i + 1).toString() + ".png",
      "des": des[i],
      "inc": inc[i],
      "req": req[i]
    }
    return model
  }
})