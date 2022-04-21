import React from "react";
import { View, Image } from "@tarojs/components";

import "./index.less";
import homeBack from "../../../img/背景.png";

export default class Login extends React.Component {
  render() {
    return (
      <View className="index">
        <Image
          className="back"
          src="https://s1.ax1x.com/2022/04/21/LcVsk6.png"
        />
      </View>
    );
  }
}
