import React, { createRef } from "react";
import { View, Button, Input, Image, Text } from "@tarojs/components";
import Taro, { Current } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import homeBack from "../../../img/背景.png";
import { baseUrl } from "../../baseUrl";

export default class Login extends React.Component {
  //渲染我的页面信息
  state = {
    userInfo: {
      nickName: "",
      stuNum: "",
      college: "",
      qqNum: "",
      realName: ""
    }
  };
  //获取输入框更改的值
  getnickName = createRef();
  getcollege = createRef();
  getqqNum = createRef();
  getstuNum = createRef();
  getrealName = createRef();
  //更改信息
  saveInf() {
    const nickName = this.getnickName.current.value;
    const college = this.getcollege.current.value;
    const qqNum = this.getqqNum.current.value;
    const stuNum = this.getstuNum.current.value;
    const realName = this.getrealName.current.value;
    Taro.getStorage({
      key: "id",
      success: function(res) {
        console.log("@", res.data);
        let wid = res.data.toString();
        console.log("@@", wid);
        Taro.request({
          method: "post",
          url: baseUrl + "/system/user/update",
          data: {
            wid: wid,
            nickName: nickName,
            stuNum: stuNum,
            college: college,
            qqNum: qqNum,
            realName: realName
          },
          success: res => {
            console.log(res);
          }
        });
      }
    });
  }
  //获取路由传递过来的参数
  componentDidMount() {
    this.setState({ userInfo: Current.router.params });
  }
  render() {
    const { nickName, college, qqNum, realName, stuNum } = this.state.userInfo;
    return (
      <View className="index">
        <Image className="back" src={homeBack} />
        <View className="posi">修改信息</View>
        <View className="name-title">
          <Text>昵称:</Text>
          <Input ref={this.getnickName} className="name" value={nickName} />
        </View>

        <View className="college-title">
          <Text>学院</Text>
          <Input ref={this.getcollege} className="college" value={college} />
        </View>

        <View className="qqNum-title">
          <Text>QQ:</Text>
          <Input ref={this.getqqNum} className="qqNum" value={qqNum} />
        </View>

        <View className="realName-title">
          <Text>名字:</Text>
          <Input ref={this.getrealName} className="realName" value={realName} />
        </View>

        <View className="stuNum-title">
          <Text>学号:</Text>
          <Input ref={this.getstuNum} className="stuNum" value={stuNum} />
        </View>
        <Button className="btn" onClick={this.saveInf.bind(this)}>
          更改信息
        </Button>
      </View>
    );
  }
}
