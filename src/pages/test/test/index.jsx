import React from "react";
import { View, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { baseUrl } from "../../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import back from "../../../img/背景.png";

export default class Answer extends React.Component {
  state = {
    info: {
      totalCount: "",
      totalScore: "",
      status: ""
    }
  };
  startTest() {
    Taro.navigateTo({
      url: "/pages/test/question/index"
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
            this.setState({ info: { ...res.data } });
            console.log(this.state.info);
          }
        });
      }
    });
  }

  render() {
    const { info } = this.state;
    return (
      <View className="index">
        <Image className="back" src={back} />
        <View className="content">
          <View>总答题得分:{info.totalScore}</View>
          <View>今日答题得分:xxx</View>
          <View>今日剩余答题次数:{info.status}</View>
        </View>
        <Button className="btn" onClick={this.startTest.bind(this)}>
          开始答题
        </Button>
      </View>
    );
  }
}
