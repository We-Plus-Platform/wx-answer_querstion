import React from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { baseUrl } from "../../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import homeBack from "../../../img/背景.png";

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
  //问题反馈
  loadQuestion() {
    Taro.navigateTo({
      url: "/pages/my/chat/index"
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
            console.log(res);
            this.setState({ userInfo: res.data.data.userInfo });
            console.log("my", this.state.userInfo);
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
        <Image
          className="back"
          src="https://s1.ax1x.com/2022/04/21/LcVsk6.png"
        />
        <View className="inf">
          <Image className="avatarUrl" src={avatarUrl}></Image>
          <View>学院:{college}</View>
          <View>真实姓名:{realName}</View>
          <View>学号:{stuNum}</View>
          <View>昵称:{nickName}</View>
          <View>QQ:{qqNum}</View>
        </View>
        <View className="changeUser" onClick={this.changeUser.bind(this)}>
          更改信息
        </View>
        <View className="loadQuestion" onClick={this.loadQuestion.bind(this)}>
          问题反馈
        </View>
      </View>
    );
  }
}
