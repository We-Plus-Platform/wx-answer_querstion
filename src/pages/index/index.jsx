import { Component } from "react";
import { View, Button } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import { baseUrl } from "../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Index extends Component {
  state = {
    code: ""
    //将拿到的userInfo传递给my
  };
  clickMe() {
    Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        //将用户信息存本地
        Taro.setStorage({
          key: "userInfo",
          data: res.userInfo,
          success: response => {
            Taro.request({
              url: baseUrl + "/system/user/wxLogin",
              method: "post",
              data: {
                code: this.state.code,
                nickName: res.nickName,
                avatarUrl: res.avatarUrl
              },
              success: res => {
                console.log("成功", res);
                // 保存一个id到本地;
                Taro.setStorage({
                  key: "id",
                  data: res.data.data.userInfo.id
                });
                Taro.switchTab({
                  url: "/pages/my/my/index",
                  success: res => {
                    console.log(res);
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
    // Taro.clearStorage();
    //在用户进入页面进行判断,如果有用户数据,直接跳转到my
    Taro.getStorage({
      key: "userInfo",
      success: function(res) {
        if (res.data !== "")
          return Taro.switchTab({
            url: "/pages/my/my/index",
            success: res => {
              console.log(res);
            }
          });
      }
    });
  }

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Button onClick={this.clickMe.bind(this)}>进入答题小程序</Button>
      </View>
    );
  }
}
