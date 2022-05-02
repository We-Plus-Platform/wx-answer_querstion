import { Component } from "react";
import { View, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { baseUrl } from "../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
// import homeBack from "../../img/背景.png";
// import homeContent from "../../img/首页content.png";

export default class Index extends Component {
  state = {
    code: ""
    //将拿到的userInfo传递给my
  };
  clickMe() {
    Taro.getUserProfile({
      desc: "用于完善用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        console.log("information", res.userInfo);
        const nickName = res.userInfo.nickName;
        const avatarUrl = res.userInfo.avatarUrl;
        Taro.request({
          url: baseUrl + "/system/user/wxLogin",
          method: "post",
          data: {
            code: this.state.code,
            nickName: nickName,
            avatarUrl: avatarUrl
          },
          success: res => {
            console.log("成功", res);
            const { id } = res.data.data.userInfo;
            // 保存一个id到本地;
            Taro.setStorage({
              key: "id",
              data: id,
              success: response => {
                //查询数据库是否有信息
                Taro.request({
                  url: baseUrl + `/system/user/getInfo/${id}`,
                  method: "get",
                  success: res => {
                    console.log("@", res);
                    console.log(res.data.code);
                    //如果数据库中有信息,则进入个人界面
                    if (res.data.code == 200) {
                      Taro.switchTab({
                        url: "/pages/my/my/index"
                      });
                      //没有则是新用户,进入信息填取页面
                    } else {
                      Taro.redirectTo({
                        url: "/pages/add/index"
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  componentDidMount() {
    // 调用微信登录接口;
    // 获取code发送给后端;
    Taro.login({
      success: response => {
        this.setState({ code: response.code });
        // console.log("@", this.state.code);
      }
    });
  }

  componentWillUnmount() {}

  componentDidShow() {
    //在用户进入页面进行判断,如果有用户的id,直接跳转到个人页面
    Taro.getStorage({
      key: "id",
      success: function(res) {
        if (res.data !== "") {
          Taro.switchTab({
            url: "/pages/my/my/index",
            success: res => {
              console.log(res);
            }
          });
        }
      }
    });
  }

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Image className="back" src="http://42.193.15.69/background.png" />
        <Image className="homeContent" src="http://42.193.15.69/home.png" />
        <Button className="btn" onClick={this.clickMe.bind(this)}>
          进入答题小程序
        </Button>
      </View>
    );
  }
}
