import React from "react";
import { View, Button, Input } from "@tarojs/components";
import { Taro, Current } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Login extends React.Component {
  //渲染我的页面信息
  state = {
    userInfo: {}
  };
  //更改信息
  saveInf() {
    //获取输入框更改的值
  }
  //获取路由传递过来的参数
  componentDidMount() {
    this.setState({ userInfo: Current.router.params });
  }
  render() {
    const { nickName, college, qqNum, realName, stuNum } = this.state.userInfo;
    return (
      <View className="index">
        <Input value={nickName} />
        <Input value={college} />
        <Input value={qqNum} />
        <Input value={realName} />
        <Input value={stuNum} />
        <Button onClick={this.saveInf.bind(this)}>更改信息</Button>
      </View>
    );
  }
}
