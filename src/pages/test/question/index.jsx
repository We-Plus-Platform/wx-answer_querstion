import React from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Image,
  Button,
  Radio,
  RadioGroup,
  Label
} from "@tarojs/components";
import { AtCountdown } from "taro-ui";

import { baseUrl } from "../../baseUrl";

//按需导入组件
import "taro-ui/dist/style/components/countdown.scss";
// import "taro-ui/dist/style/components/radio.scss";
import "./index.less";
import choosing from "../../../img/choosing.png";
import answerBack from "../../../img/答题back.png";

export default class Question extends React.Component {
  state = {
    //选择题
    selectQues: [],
    //判断题
    judgeQues: [],
    //合并
    merge: [
      {
        quesDetail: "",
        ansA: "",
        ansB: "",
        ansC: "",
        ansD: ""
      }
    ],
    //隐藏选项
    showAnswerC: true,
    showAnswerD: true,
    //是否选择
    isChooseA: false,
    isChooseB: false,
    isChooseC: false,
    isChooseD: false,
    //分数
    answerCount: 0,
    answerScore: 0,
    // value: "",
    //正确答案
    rightAnswers: [],
    //选择答案
    chooseValue: [],
    //当前题号
    index: 1
  };

  //在页面渲染时获取题目
  componentDidMount() {
    Taro.getStorage({
      key: "id",
      success: res => {
        Taro.request({
          method: "get",
          url: baseUrl + `/system/ques/${res.data}`,
          success: response => {
            // console.log(response);
            const { selectQues } = response.data;
            //将两个数组进行合并
            // const mergeQues = selectQues.concat(judgeQues);
            // this.setState((this.state.merge = selectQues));
            let rightAnswer = [];
            selectQues.map(Object => {
              rightAnswer.push(Object.rightAns);
            });
            this.setState({ rightAnswers: rightAnswer });
            this.setState({ merge: selectQues });
            // console.log("@@", this.state.merge);
            // console.log("@@", this.state.rightAnswers);
            //对第一题选项是空做处理是空
            const { merge, index } = this.state;
            if (merge[index - 1].ansC === null) {
              this.setState({ showAnswerC: false });
            } else if (merge[index - 1].ansD === null) {
              this.setState({ showAnswerD: false });
            } else {
              this.setState({ showAnswerC: true });
              this.setState({ showAnswerD: true });
            }
          }
        });
      }
    });
  }

  //答题时间到
  onTimeUp() {
    Taro.showToast({
      title: "时间到",
      icon: "success",
      duration: 2000
    });
    this.load();
  }

  //选中答案
  handleChange(value) {
    const { chooseValue, index } = this.state;
    // console.log(value.detail.value);
    // 对value进行处理得到答案;
    let chooseValue1 = value.detail.value;
    if (chooseValue1 !== "") {
      chooseValue[index - 1] = chooseValue1;
    } else {
      chooseValue[index - 1] = "";
    }
    // console.log(chooseValue);
  }
  //对答案进行矫正
  isRight() {
    const { chooseValue, rightAnswers, merge } = this.state;
    let count = 0;
    for (let i = 0; i < merge.length; i++) {
      if (chooseValue[i] === rightAnswers[i]) {
        count += 1;
      }
    }
    this.state.answerCount = count;
    this.state.answerScore = count * 10;
    //更新状态失败?
    // this.setState({ answerCount: count });
    // this.setState({ answerScore: count * 10 });
  }
  //上传选择的答案
  load() {
    this.isRight();
    console.log("回答正确数目", this.state.answerCount);
    console.log("最后得分", this.state.answerScore);
    const { answerCount, answerScore } = this.state;
    //转换类型
    let answerCount1 = answerCount.toString();
    let answerScore1 = answerScore.toString();

    Taro.getStorage({
      key: "id",
      success: res => {
        let id = res.data.toString();
        Taro.request({
          method: "post",
          url: baseUrl + "/system/ques",
          data: {
            userId: id,
            ansCount: answerCount1,
            ansScore: answerScore1
          },
          success: response => {
            console.log("提交答案", response.data.code);
            //成功才能跳转
            console.log("@", response.data.code);
            if (response.data.code === 200) {
              Taro.reLaunch({
                url:
                  "/pages/test/result/index?answerCount=" +
                  this.state.answerCount +
                  "&answerScore=" +
                  this.state.answerScore
              });
            }
          }
        });
      }
    });
  }

  isChoose() {
    const {
      chooseValue,
      merge,
      index,
      isChooseA,
      isChooseB,
      isChooseC,
      isChooseD
    } = this.state;
    //显示选中状态,如果用户选中了值,勾选记录
    const i = index;
    console.log(i);
    console.log("所有选择", chooseValue);
    console.log("选中", chooseValue[i - 1]);
    console.log("daan", merge[i - 1]);
    console.log(isChooseA, isChooseB, isChooseC, isChooseD);
    if (chooseValue[i - 1] === merge[i - 1].ansA) {
      this.setState({ isChooseA: true });
      this.setState({ isChooseB: false });
      this.setState({ isChooseC: false });
      this.setState({ isChooseD: false });
    } else if (chooseValue[i - 1] === merge[i - 1].ansB) {
      this.setState({ isChooseB: true });
      this.setState({ isChooseA: false });
      this.setState({ isChooseC: false });
      this.setState({ isChooseD: false });
    } else if (chooseValue[i - 1] === merge[i - 1].ansC) {
      this.setState({ isChooseC: true });
      this.setState({ isChooseA: false });
      this.setState({ isChooseB: false });
      this.setState({ isChooseD: false });
    } else if (chooseValue[i - 1] === merge[i - 1].ansD) {
      this.setState({ isChooseD: true });
      this.setState({ isChooseA: false });
      this.setState({ isChooseB: false });
      this.setState({ isChooseC: false });
    } else {
      this.setState({ isChooseA: false });
      this.setState({ isChooseB: false });
      this.setState({ isChooseC: false });
      this.setState({ isChooseD: false });
    }
  }

  //上一题
  last() {
    const { index } = this.state;
    //判断题目为第一题和选项为空情况
    if (index === 1) {
      Taro.showToast({
        title: "已经是第一题了",
        icon: "error",
        duration: 2000
      });
    } else {
      this.setState({ index: index - 1 }, () => {
        const { index, merge } = this.state;
        if (merge[index - 1].ansC === null) {
          this.setState({ showAnswerC: false });
        } else if (merge[index - 1].ansD === null) {
          this.setState({ showAnswerD: false });
        } else {
          this.setState({ showAnswerC: true });
          this.setState({ showAnswerD: true });
        }
        //显示选中状态,如果用户选中了值,勾选记录
        this.isChoose();
      });
    }
  }
  //下一题
  next() {
    const { index, merge } = this.state;
    //判断题目为第一题和选项为空情况
    if (index === merge.length) {
      Taro.showToast({
        title: "已经是最后一题了",
        icon: "error",
        duration: 2000
      });
    } else {
      this.setState({ index: index + 1 }, () => {
        if (merge[index].ansC === null) {
          this.setState({ showAnswerC: false });
        } else if (merge[index].ansD === null) {
          this.setState({ showAnswerD: false });
        } else {
          this.setState({ showAnswerC: true });
          this.setState({ showAnswerD: true });
        }
        //选项
        this.isChoose();
      });
    }
  }

  // componentDidShow() {
  //打开小程序时触发
  // console.log(1);
  // }

  componentDidHide() {
    //隐藏页面
    //离开小程序时触发
    //离开页面直接触发提交答案
    this.load();
  }

  render() {
    const {
      merge,
      index,
      showAnswerC,
      showAnswerD,
      isChooseA,
      isChooseB,
      isChooseC,
      isChooseD
    } = this.state;
    return (
      <View className="page">
        <Image className="bgi" src="http://42.193.15.69/background.png" />
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
          <Image className="answerBack" src={answerBack} />
          {/* 题目 */}
          <View className="questions">
            <RadioGroup
              className="question"
              key={index}
              onChange={this.handleChange.bind(this)}
            >
              <View className="quesDetail">
                {index}.{merge[index - 1].quesDetail}
              </View>
              {/* 判断题目是否显示 */}
              <Label>
                {isChooseA ? (
                  <Image className="choosing" src={choosing}></Image>
                ) : (
                  ""
                )}
                <Radio
                  // onClick={chooseValue}
                  className="answers"
                  value={merge[index - 1].ansA}
                >
                  {"A." + merge[index - 1].ansA}
                </Radio>
              </Label>
              <Label>
                {isChooseB ? (
                  <Image className="choosing" src={choosing}></Image>
                ) : (
                  ""
                )}
                <Radio className="answers" value={merge[index - 1].ansB}>
                  {"B." + merge[index - 1].ansB}
                </Radio>
              </Label>
              {showAnswerC ? (
                <Label>
                  {isChooseC ? (
                    <Image className="choosing" src={choosing}></Image>
                  ) : (
                    ""
                  )}
                  <Radio
                    checked={isChooseC}
                    className="answers"
                    value={merge[index - 1].ansC}
                  >
                    {"C." + merge[index - 1].ansC}
                  </Radio>
                </Label>
              ) : (
                ""
              )}
              {showAnswerD ? (
                <Label>
                  {isChooseD ? (
                    <Image className="choosing" src={choosing}></Image>
                  ) : (
                    ""
                  )}
                  <Radio
                    checked={isChooseD}
                    className="answers"
                    value={merge[index - 1].ansD}
                  >
                    {"D." + merge[index - 1].ansD}
                  </Radio>
                </Label>
              ) : (
                ""
              )}
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
