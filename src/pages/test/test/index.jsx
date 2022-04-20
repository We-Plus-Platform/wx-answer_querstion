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
      status: ""
    }
  };
  startTest() {
    const { status } = this.state.info;
    if (status === 1) {
      Taro.showToast({
        title: "今天已答过题了",
        icon: "error",
        duration: 2000
      });
    } else {
      Taro.redirectTo({
        url: "/pages/test/question/index"
      });
    }
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
            const { userInfo } = res.data.data;
            this.setState({ info: userInfo });
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
          <View className="score">总答题得分:{info.totalScore}</View>
          <View>今日剩余答题次数:{info.status}</View>
        </View>
        <Button className="btn" onClick={this.startTest.bind(this)}>
          开始答题
        </Button>
      </View>
    );
  }
}
