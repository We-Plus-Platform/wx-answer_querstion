import React from "react";
import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Answer extends React.Component {
  startTest() {
    Taro.navigateTo({
      url: "/pages/test/question/index"
    });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View>总答题得分:xxx</View>
        <View>今日答题得分:xxx</View>
        <View>今日答题得分:xxx</View>
        <View>今日答题次数:xxx</View>
        <Button onClick={this.startTest.bind(this)}>开始答题</Button>
      </View>
    );
  }
}
