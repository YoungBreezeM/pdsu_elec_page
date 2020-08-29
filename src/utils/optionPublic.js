//echarts 组件
import * as echarts from 'echarts/lib/echarts';
class optionPublicFun {
  /**
   * @namespace init
   * @param {渲染echarts的容器id} id 
   * @author he
   * create in 19-11-30
   */
  init(id) {
    let init = echarts.init(document.getElementById(id));
    return init;
  }
  /**
   * @namespace textStyle
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   */
  textStyle(weight, size) {
    let textStyle = {
      color: "#fff",
      fontWeight: weight,
      fontSize: size
    }
    return textStyle;
  }
  /**
   * @namespace lineStyle
   * @param {线条颜色} color 
   * @param {线条宽度} num 
   */
  lineStyle(color, num) {
    let lineStyle = {
      color: color,
      width: num
    };
    return lineStyle;
  }
  
  /**
   * @namespace getStack 返回折线图、雷达图选中的个数
   * @param {legend参数} params 
   */
  getStack(params) {
    let stack = 0;
    let selectedCity = params.selected;
    if(selectedCity.length<=0)
      throw new Error("The number of selectedCity of 0");
    for (let i in selectedCity) {
      if (selectedCity[i]) {
        stack++;
      }
    }
    return stack;
  }
  /**
   * @namespace initSelectedCity 初始化折线图、雷达图选中的城市
   * @param {legend参数} params 
   * @param {默认选中城市名} defaultCityName 
   * @param {选中的城市} selectedCity 
   * @param {城市选项} option 
   */
  initSelectedCity(params, defaultCityName, selectedCity, option) {
    let cityName = params.name;
    for (let i in selectedCity) {
      option.legend.selected[i] = false;
      selectedCity[i] = false;
    }
    selectedCity[defaultCityName] = true;
    selectedCity[cityName] = true;
    option.legend.selected[defaultCityName] = true;
    option.legend.selected[cityName] = true;
    return option;
  }
}
export default optionPublicFun;
