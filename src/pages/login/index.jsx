import React, { createRef } from "react";
import { View, Button, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Login extends React.Component {
  // state = {
  //   userName: "",
  //   userPwd: ""
  //   // userIdd
  // };
  //获取ref
  username = createRef();
  password = createRef();
  //点击注册
  signUp() {
    //获取账号,密码
    const username = this.username.current.value;
    const password = this.password.current.value;
    Taro.request({
      method: "post",
      url: "http://47.108.166.59:8678/system/signUp",
      data: {
        userName: username,
        userPwd: password
      },
      success: function(res) {
        console.log(res.data);
        console.log(res.data.message);
      },
      fail: function(err) {
        console.log(err);
      }
    });
  }
  login() {
    const username = this.username.current.value;
    const password = this.password.current.value;
    Taro.request({
      method: "post",
      url: "http://47.108.166.59:8678/system/login",
      data: {
        userName: username,
        userPwd: password
      },
      success: function(res) {
        const message = res.data.message;
        const jwt = res.data.data.jwt;
        Taro.setStorage({
          key: "token",
          data: jwt
        });
        Taro.setStorage({
          key: "userId",
          data: res.data.data.userId
        });
        Taro.switchTab({
          url: "/pages/index/index"
        });
      },
      fail: function(err) {
        console.log(err);
      }
    });
  }
  render() {
    return (
      <View className="index">
        <Input ref={this.username} type="text" placeholder="请输入账号"></Input>
        <Input
          ref={this.password}
          type="password"
          placeholder="请输入密码"
        ></Input>
        <Button onClick={this.signUp.bind(this)}>注册</Button>
        <Button onClick={this.login.bind(this)}>登录</Button>
      </View>
    );
  }
}
