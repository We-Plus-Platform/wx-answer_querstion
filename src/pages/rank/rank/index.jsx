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
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
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

  componentDidHide() {}

  render() {
    const { myRank } = this.state;
    return (
      <View className="index">
        <View>排行榜</View>
        {/* 渲染排行 */}
        <View>
          {this.state.rankList.map(rankObj => {
            return (
              <View key={rankObj.basicId}>
                <Image src={rankObj.avatarUrl} />
                <Text>{rankObj.basicId}</Text>
                <Text>{rankObj.nickName}</Text>
                <Text>{rankObj.stuNum}</Text>
                <Text>{rankObj.college}</Text>
                <Text>{rankObj.totalCount}</Text>
                <Text>{rankObj.totalScore}</Text>
                <Text>{rankObj.ranking}</Text>
              </View>
            );
          })}
        </View>
        {/* 个人信息 */}
        <View>
          <Image src={myRank.avatarUrl} />
          <Text>{myRank.basicId}</Text>
          <Text>{myRank.nickName}</Text>
          <Text>{myRank.stuNum}</Text>
          <Text>{myRank.college}</Text>
          <Text>{myRank.totalCount}</Text>
          <Text>{myRank.totalScore}</Text>
          <Text>{myRank.ranking}</Text>
        </View>
      </View>
    );
  }
}
