import React from "react";
import { View, Button } from "@tarojs/components";
import { Taro, Current } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Answer extends React.Component {
  state = {
    answerScore: "",
    answerCount: ""
  };
  componentDidMount() {
    this.setState({
      answerScore: Current.router.params.answerScore[0],
      answerCount: Current.router.params.answerScore[1]
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View>答题得分:{this.state.answerScore}</View>
        <View>答题得分:{this.state.answerCount}</View>
        <Button>分享</Button>
      </View>
    );
  }
}
