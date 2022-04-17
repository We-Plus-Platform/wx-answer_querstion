import React from "react";
import { View, Image, Button, RadioGroup } from "@tarojs/components";
import { AtRadio, AtCountdown } from "taro-ui";
import Taro from "@tarojs/taro";

import { baseUrl } from "../../baseUrl";

//按需导入组件
import "taro-ui/dist/style/components/countdown.scss";
// import "taro-ui/dist/style/components/radio.scss";
import "./index.less";
import "../../../img/question-back.png";

export default class Answer extends React.Component {
  state = {
    questions: [
      {
        id: 0,
        quesA: "大专",
        quesB: "职高",
        quesC: "高中",
        quesD: "监狱",
        quesDetail: "重庆邮电大学？",
        questionId: 1,
        rightAnswer: "监狱"
      },
      {
        id: 0,
        quesA: "大专",
        quesB: "职高",
        quesC: "高中",
        quesD: "监狱",
        quesDetail: "重？",
        questionId: 2,
        rightAnswer: "监狱"
      },
      {
        id: 0,
        quesA: "大专",
        quesB: "职高",
        quesC: "高中",
        quesD: "监狱",
        quesDetail: "重庆？",
        questionId: 3,
        rightAnswer: "监狱"
      },
      {
        id: 0,
        quesA: "大专",
        quesB: "职高",
        quesC: "高中",
        quesD: "监狱",
        quesDetail: "重庆邮？",
        questionId: 4,
        rightAnswer: "监狱"
      },
      {
        id: 0,
        quesA: "大专",
        quesB: "职高",
        quesC: "高中",
        quesD: "监狱",
        quesDetail: "重庆邮电？",
        questionId: 5,
        rightAnswer: "监狱"
      }
    ],
    answerCount: 0,
    answerScore: 0,
    value: "",
    //正确答案
    rightAnswer: ["监狱", "监狱", "监狱", "监狱", "监狱"],
    //选择答案
    chooseValue: [],
    //当前题号
    index: 0
  };

  //答题时间到
  onTimeUp() {
    Taro.showToast({
      title: "时间到",
      icon: "success",
      duration: 2000
    });
  }

  //选中答案
  handleChange(value) {
    const { chooseValue, index } = this.state;
    // 对value进行处理得到答案;
    let chooseValue1 = value.substring(2);
    if (chooseValue1 !== "") {
      chooseValue[index] = chooseValue1;
    } else {
      chooseValue[index] = "";
    }
    console.log(chooseValue);
  }
  //对答案进行矫正
  isRight() {
    const { chooseValue, rightAnswer, questions } = this.state;
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      if (chooseValue[i] === rightAnswer[i]) {
        count += 1;
      }
    }
    this.setState({ answerCount: count });
    this.setState({ answerScore: count * 10 });
  }
  //上传选择的答案
  load() {
    this.isRight();
    console.log("回答正确数目", this.state.answerCount);
    console.log("最后得分", this.state.answerScore);
    Taro.navigateTo({
      url:
        "/pages/test/result/index?answerScore=" +
        this.state.answerCount +
        "&answerScore=" +
        this.state.answerScore
    });
  }

  //在页面渲染时获取题目
  // componentWillMount() {
  //   Taro.getStorage({
  //     key: "userId",
  //     success: res => {
  //       const userId = res.data;
  //       Taro.getStorage({
  //         key: "token",
  //         success: res => {
  //           const token = res.data;
  //           Taro.request({
  //             method: "get",
  //             url: baseUrl+`/system/answer/question/${userId}`,
  //             success: res => {
  //               const { questions } = res.data.data;
  //               let rightAnswer = [];
  //               questions.map(Object => {
  //                 rightAnswer.push(Object.rightAnswer);
  //               });
  //               this.setState((this.state.rightAnswer = rightAnswer));
  //               this.setState((this.state.questions = questions));
  //               console.log(res.data.message);
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  //上一题
  last() {
    const { index } = this.state;
    if (index === 0) return alert("已经是第一题了");
    this.setState({ index: index - 1 });
  }
  //下一题
  next() {
    const { index, questions } = this.state;
    if (index === questions.length - 1) return alert("已经是最后一提了");
    this.setState({ index: index + 1 });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    //打开小程序时触发
    // console.log(1);
  }

  componentDidHide() {
    //离开小程序时触发
    //离开页面直接触发提交答案
    console.log(2);
    //提交
    // Taro.getStorage({
    //   key: "token",
    //   success: function(res) {
    //     Taro.request({
    //       method: "post",
    //       url: "http://47.108.166.59:8678/system/answer/question/12",
    //       header: {
    //         Authorization: res.data
    //       },
    //       data: {
    //         answerCount: "5",
    //         answerScore: "50"
    //       },
    //       success: function(res) {
    //         console.log(res.data);
    //         this.state.questions = res.data.questions;
    //       }
    //     });
    //   }
    // });
  }

  render() {
    const { questions, index } = this.state;
    return (
      <View className="page">
        <Image className="bgi" src="../../../img/question-back.png" />
        <View className="title">题目</View>
        {/* 倒计时 */}
        <View className="time">
          <AtCountdown
            className="last_time"
            format={{ minutes: ":", seconds: "" }}
            onTimeUp={this.onTimeUp.bind(this)}
            isShowHour={false}
            minutes={10}
            seconds={0}
          />
        </View>
        <View className="content">
          {/* 题目 */}
          <View className="questions">
            <RadioGroup className="question" key={questions[index].questionId}>
              <View className="quesDetail">
                {index + 1}.{questions[index].quesDetail}
              </View>
              <AtRadio
                className="answers"
                options={[
                  {
                    label: `A.${questions[index].quesA}`,
                    value: index + "." + questions[index].quesA
                  },
                  {
                    label: `B.${questions[index].quesB}`,
                    value: index + "." + questions[index].quesB
                  },
                  {
                    label: `C.${questions[index].quesC}`,
                    value: index + "." + questions[index].quesC
                  },
                  {
                    label: `D.${questions[index].quesD}`,
                    value: index + "." + questions[index].quesD
                  }
                ]}
                value={this.state.value}
                onClick={this.handleChange.bind(this)}
              />
            </RadioGroup>
          </View>
        </View>
        {/* 按钮 */}
        <View className="btns">
          <Button
            className="btns last"
            size="mini"
            onClick={this.last.bind(this)}
          >
            上一题
          </Button>
          <Button
            className="btns load"
            size="mini"
            onClick={this.load.bind(this)}
          >
            提交
          </Button>
          <Button
            className="btns next"
            size="mini"
            onClick={this.next.bind(this)}
          >
            下一题
          </Button>
        </View>
      </View>
    );
  }
}
