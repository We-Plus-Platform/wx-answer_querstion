import React from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { baseUrl } from "../../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Login extends React.Component {
  //渲染我的页面信息
  state = {
    userInfo: {}
  };
  //更改用户信息
  changeUser() {
    const {
      avatarUrl,
      nickName,
      college,
      qqNum,
      realName,
      stuNum
    } = this.state.userInfo;
    Taro.navigateTo({
      url:
        "/pages/my/changeUser/index?&nickName=" +
        nickName +
        "&college=" +
        college +
        "&qqNum=" +
        qqNum +
        "&realName=" +
        realName +
        "&stuNum=" +
        stuNum
    });
  }
  componentDidMount() {
    Taro.getStorage({
      key: "id",
      success: res => {
        Taro.request({
          method: "get",
          url: baseUrl + `/system/user/getInfo/${res.data}`,
          success: res => {
            this.setState({ userInfo: res.data.data.userInfo });
            console.log(this.state.userInfo);
          }
        });
      }
    });
  }
  render() {
    const {
      avatarUrl,
      nickName,
      college,
      qqNum,
      realName,
      stuNum
    } = this.state.userInfo;
    return (
      <View className="index">
        <View>
          <Image className="avatarUrl" src={avatarUrl}></Image>
          <View>{college}</View>
          <View>{nickName}</View>
          <View>{college}</View>
          <View>{qqNum}</View>
          <View>{realName}</View>
          <View>{stuNum}</View>
        </View>
        <View onClick={this.changeUser.bind(this)}>更改信息</View>
      </View>
    );
  }
}
