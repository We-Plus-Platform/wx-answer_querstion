import React, { createRef } from "react";
import { View, Button, Input, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";
import { baseUrl } from "../baseUrl";

export default class Add extends React.Component {
  //渲染我的页面信息
  state = {
    userInfo: {
      stuNum: "",
      college: "",
      qqNum: "",
      realName: ""
    }
  };
  //获取输入框更改的值
  getcollege = createRef();
  getqqNum = createRef();
  getstuNum = createRef();
  getrealName = createRef();
  //提交信息
  saveInf() {
    const college = this.getcollege.current.value;
    const qqNum = this.getqqNum.current.value;
    const stuNum = this.getstuNum.current.value;
    const realName = this.getrealName.current.value;
    if (college === "" || qqNum === "" || stuNum === "" || realName === "") {
      Taro.showToast({
        title: "请填写信息",
        icon: "error",
        duration: 2000
      });
    } else {
      Taro.getStorage({
        key: "id",
        success: function(res) {
          //将数字类型的id转为字符类型
          let wid = res.data.toString();
          console.log("@@", wid);
          Taro.request({
            method: "post",
            url: baseUrl + "/system/user/add",
            data: {
              wid: wid,
              stuNum: stuNum,
              college: college,
              qqNum: qqNum,
              realName: realName
            },
            success: res => {
              console.log("@", res);
              Taro.switchTab({
                url: "/pages/my/my/index",
                success: res => {
                  Taro.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 2000
                  });
                }
              });
            }
          });
        }
      });
    }
  }
  render() {
    // const { nickName, college, qqNum, realName, stuNum } = this.state.userInfo;
    return (
      <View className="index">
        <Image className="back" src="http://42.193.15.69/background.png" />
        <View className="posi">添加信息</View>
        <View className="college-title">
          <Text>学院</Text>
          <Input ref={this.getcollege} className="college" />
        </View>

        <View className="qqNum-title">
          <Text>QQ:</Text>
          <Input ref={this.getqqNum} className="qqNum" />
        </View>

        <View className="realName-title">
          <Text>名字:</Text>
          <Input ref={this.getrealName} className="realName" />
        </View>

        <View className="stuNum-title">
          <Text>学号:</Text>
          <Input ref={this.getstuNum} className="stuNum" />
        </View>
        <Button className="btn" onClick={this.saveInf.bind(this)}>
          提交信息
        </Button>
      </View>
    );
  }
}
