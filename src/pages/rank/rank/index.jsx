import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { baseUrl } from "../../baseUrl";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

import back from "../../../img/背景.png";

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
      <View className="mw-page">
        <View className="cu-list menu menu-avatar mw-menu">
          {this.state.rankList.map(rankObj => {
            return (
              <View className="cu-item" key={rankObj.basicId}>
                <Image
                  className="cu-avatar round lg"
                  src={rankObj.avatarUrl}
                ></Image>
                <View className="content">
                  <View className="text-gray">第{myRank.ranking}名</View>
                  <View className="text-grey text-sm">{rankObj.nickName}</View>
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
      //   <View className="rank-index">
      //     <Image className="bgi" src={back} />
      //     <View className="rank-header">
      //       <View className="rank-header-title">重邮最强大脑</View>
      //       <View>排行榜</View>
      //     </View>

      //     {/* 渲染排行 */}
      //     <View className="rank">
      //       {/* 个人信息 */}
      //       <View className="rank-my">
      //         <Text>我的成绩:</Text>
      //         {/* <Image className="userImg" src={myRank.avatarUrl} /> */}
      //         <Text>{myRank.ranking}</Text>
      //         <Text>{myRank.nickName}</Text>
      //         <Text>{myRank.totalScore}</Text>
      //       </View>
      //       <View className="rank-all">
      //         <View className="rank-title">
      //           <Text>排名</Text>
      //           <Text>姓名</Text>
      //           <Text>得分</Text>
      //         </View>
      //         {this.state.rankList.map(rankObj => {
      //           return (
      //             <View className="rank-content" key={rankObj.basicId}>
      //               <Text>{rankObj.ranking}</Text>
      //               <View>
      //                 <Image className="userImg" src={rankObj.avatarUrl} />
      //                 <Text>{rankObj.nickName}</Text>
      //               </View>
      //               <Text>{rankObj.totalScore}</Text>
      //             </View>
      //           );
      //         })}
      //       </View>
      //     </View>
      //   </View>
    );
  }
}
