import optionPublicFun from '../../../../utils/optionPublic.js'
class optionMapFun {
  /**
   * @namespace mapTooltip
   * @author he
   * create in 2020-1-11
   */
  mapTooltip() {
    let tooltip = {
      trigger: 'item',
      formatter: function (params) {
        return params.name + ":" + params.data["value"] + "分";
      },
      textStyle: new optionPublicFun().textStyle("normal"),
    }
    return tooltip;
  }
  /**
   * @namespace mapBarSeries
   * @param {地图各地市数据} datas
   * @param {排名各地市数据} barData
   */
  mapBarSeries(datas, barData) {
    let series = [{
        type: "map",
        // top: '10%',
        mapType: "河南",
        roam: false, //鼠标缩放和平移漫游
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          emphasis: {
            color: "red"
          }
        },
        data: datas,
        zoom: 1.15,
        left: 22
      },
      {
        name: "barSer",
        type: "bar",
        roam: false,
        visualMap: false,
        zlevel: 2,
        barMaxWidth: 8,
        barGap: 0,
        itemStyle: {
          normal: {
            color: function (params) {
              // build a color map as your need.
              var colorList = [{
                  colorStops: [{
                      offset: 0,
                      color: "#FFD119" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFAC4C" // 100% 处的颜色
                    }
                  ]
                },
                {
                  colorStops: [{
                      offset: 0,
                      color: "#00C0FA" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#2F95FA" // 100% 处的颜色
                    }
                  ]
                }
              ];
              if (params.dataIndex < 3) {
                return colorList[0];
              } else {
                return colorList[1];
              }
            },
            barBorderRadius: 15
          }
        },
        data: barData
      }
    ]
    return series;
  }
  /**
   * @namespace mapTitle
   */
  mapTitle() {
    let title = [{
      show: true,
      text: "排名情况",
      textStyle: {
        color: "#fff",
        fontSize: 18
      },
      right: 45,
      top: 55
    }]
    return title
  }
 /**
  * @namespace mapBarGrid 地图中柱状图
  */
  mapBarGrid() {
    let grid = {
      right: 0,
      top: "85",
      width: "10%"
    }
    return grid;
  }
  /**
   * @namespace mapBarYaxis
   * @param {yData} 各地市排名后Y轴值
   */
  mapBarYaxis(yData) {
    let yAxis = {
      type: "category",
      inverse: true,
      nameGap: 16,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#ddd"
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#ddd"
        }
      },
      axisLabel: {
        interval: 0,
        margin: 85,
        textStyle: {
          color: "#fff",
          align: "left",
          fontSize: 12
        },
        rich: {
          a: {
            color: "#fff",
            backgroundColor: "#FAAA39",
            width: 20,
            height: 15,
            align: "center",
            borderRadius: 2
          },
          b: {
            color: "#fff",
            backgroundColor: "#4197FD",
            width: 20,
            height: 15,
            align: "center",
            borderRadius: 2
          }
        },
        formatter: function (params) {
          if (parseInt(params.slice(0, 2)) < 3) {
            return [
              "{a|" +
              (parseInt(params.slice(0, 2)) + 1) +
              "}" +
              "  " +
              params.slice(1)
            ].join("\n");
          } else {
            if (parseInt(params) + 1 > 10) {
              return [
                "{b|" +
                (parseInt(params.slice(0, 2)) + 1) +
                "}" +
                "  " +
                params.slice(2)
              ].join("\n");
            } else {
              return [
                "{b|" +
                (parseInt(params.slice(0, 2)) + 1) +
                "}" +
                "  " +
                params.slice(1)
              ].join("\n");
            }
          }
        }
      },
      data: yData
    }
    return yAxis
  }
}
export default optionMapFun;
