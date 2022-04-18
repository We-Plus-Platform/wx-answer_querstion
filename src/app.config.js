export default {
  pages: [
    "pages/index/index",
    "pages/rank/rank/index",
    "pages/test/test/index",
    "pages/test/question/index",
    "pages/test/result/index",
    "pages/my/changeUser/index",
    "pages/my/my/index",
    "pages/login/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/rank/rank/index",
        text: "排行",
        iconPath: "img/排行榜.png"
        // selectedIconPath: "pages/imgs/tabnav/icon2-act.png"
      },
      {
        pagePath: "pages/test/test/index",
        text: "答题",
        // iconPath: "pages/img/答题.png"
        selectedIconPath: "img/答题1.png"
      },
      {
        pagePath: "pages/my/my/index",
        text: "我的",
        iconPath: "img/个人.png"
        // selectedIconPath: "pages/imgs/tabnav/icon2-act.png"
      }
    ],
    color: "#000",
    selectedColor: "#56abe4",
    backgroundColor: "#fff",
    borderStyle: "white"
  }
};
