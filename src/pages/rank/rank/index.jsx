import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { baseUrl } from "../../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export default class Rank extends Component {
  state = {
    rankList: [],
    myRank: {}
  };

  //获取信息
  information() {
    //查询所有人排行
    Taro.request({
      method: "get",
      url: baseUrl + "/system/rank/0",
      success: res => {
        const { rank } = res.data.data;
        this.setState({ rankList: rank });
        console.log("所有人排名", this.state.rankList);
        // console.log(res.data.message);
      }
    });
    //查询个人排行
    //从本地保存的getStorage中拿取id
    Taro.getStorage({
      key: "id",
      success: res => {
        const userId = res.data;
        Taro.request({
          method: "get",
          url: baseUrl + `/system/rank/${userId}`,
          success: res => {
            const { rank } = res.data.data;
            this.setState({ myRank: rank[0] });
            console.log("我的排名", this.state.myRank);
          }
        });
      }
    });
  }
  componentDidShow() {
    this.information();
  }
  onPullDownRefresh() {
    this.information();

    setTimeout(() => {
      // 停止下拉刷新
      Taro.stopPullDownRefresh();
    }, 1000);
  }

  componentDidHide() {}

  render() {
    const { myRank } = this.state;
    return (
      <View className="my-page">
        <Image className="bgi" src="http://42.193.15.69/background.png" />
        <View className="header">
          <View className="header-brain">重邮最强大脑</View>
          <View className="header-rank">排行榜</View>
        </View>
        <View className="rank">
          <View className="my-rank">
            <View className="my-rank-score">我的成绩</View>
            <Image className="my-avatar" src={myRank.avatarUrl}></Image>
            <View className="my-rank-name">{myRank.nickName}</View>
            <View>第{myRank.ranking}名</View>
            <View className="line">|</View>
            <View>{myRank.totalScore}分</View>
          </View>
          <View className="all-rank">
            <View className="title">
              <Text>排名</Text>
              <Text>姓名</Text>
              <Text>得分</Text>
            </View>
            <View className="rank-content">
              {this.state.rankList.map(rankObj => {
                return (
                  <View className="cu-item" key={rankObj.basicId}>
                    <View className="text-gray">第{rankObj.ranking}名</View>
                    <View className="content">
                      <Image
                        className="cu-avatar round lg"
                        src={rankObj.avatarUrl}
                      ></Image>
                      <View className="text-grey text-sm">
                        {rankObj.nickName}
                      </View>
                    </View>
                    <View className="action">
                      <View className="text-red text-xl">
                        {rankObj.totalScore}分
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
