import React, { Component } from 'react';
// import classnames  from 'classnames';
import { Chart } from '@antv/g2';
import { Line, Column } from '@antv/g2plot';
import { Scene, CityBuildingLayer, LineLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import './map.styl';


export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineData: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ],
      stackedData: [
        { action: '浏览网站', pv: 50000 },
        { action: '放入购物车', pv: 35000 },
        { action: '生成订单', pv: 25000 },
        { action: '支付订单', pv: 15000 },
        { action: '完成交易', pv: 8500 },
      ],
      pieData: [
        { type: '男性', value: 56.4 },
        { type: '女性', value: 43.6 }
      ]
    }
  }

  componentDidMount() {
    this.lineMap();
    this.columnMap();
    this.pieMap();
    this.cityMap();
  }

  // 基础折线图
  lineMap() {
    let data = this.state.lineData;
    const linePlot = new Line(document.getElementById('line'), {
      title: {
        visible: true,
        text: '带数据点的折线图',
      },
      description: {
        visible: true,
        text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
      },
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      point: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
    });

    linePlot.render();
  }

  // 基础柱状图
  columnMap() {
    let data = this.state.stackedData;
    const columnPlot = new Column(document.getElementById('column'), {
      title: {
        visible: true,
        text: '基础柱状图-转化率组件',
      },
      description: {
        visible: true,
        text: '基础柱状图的图形之间添加转化率标签图形，用户希望关注从左到右的数据变化比例',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'action',
      yField: 'pv',
      conversionTag: {
        visible: true,
      },
    });

    columnPlot.render();
  }

  // 饼图
  pieMap() {
    let data = this.state.pieData;
    const chart = new Chart({
      container: 'pie',
      autoFit: true,
      height: 500
    });
    chart.data(data);
    chart.legend(false);
    chart.tooltip({
      showMarkers: false
    });
    chart.facet('rect', {
      fields: ['type'],
      padding: 20,
      showTitle: false,
      eachView: (view, facet) => {
        const data = facet.data;
        let color;
        if (data[0].type === '男性') {
          color = '#0a9afe';
        } else {
          color = '#f0657d';
        }
        data.push({ type: '其他', value: 100 - data[0].value });
        view.data(data);
        view.coordinate('theta', {
          radius: 0.8,
          innerRadius: 0.5
        });
        view
          .interval()
          .adjust('stack')
          .position('value')
          .color('type', [color, '#eceef1'])
          .style({
            opacity: 1,
          });
        view.annotation().text({
          position: [ '50%', '50%' ],
          content: data[0].type,
          style: {
            fontSize: 12,
            fill: '#8c8c8c',
            fontWeight: 300,
            textBaseline: 'bottom',
            textAlign: 'center'
          },
          offsetY: -12,
        });
    
        view.annotation().text({
          position: ['50%', '50%'],
          content: data[0].value,
          style: {
            fontSize: 18,
            fill: '#000',
            fontWeight: 500,
            textAlign: 'center'
          },
          offsetY: 10,
        });
    
        view.interaction('element-active');
      }
    });
    chart.render();
  }

  // 城市
  cityMap() {
    const scene = new Scene({
      id: 'city',
      map: new GaodeMap({
        style: 'amap://styles/a49ef8d081db7b85adb2e90ba7941f1e?isPublic=true',
        center: [ 120.173104, 30.244072 ],
        pitch: 70.41138037735848,
        zoom: 17.18,
        rotation: 2.24, // 358.7459759480504
        minZoom: 14
      })
    });
    
    scene.on('loaded', () => {
      fetch(
        'https://gw.alipayobjects.com/os/rmsportal/ggFwDClGjjvpSMBIrcEx.json'
      )
        .then(res => res.json())
        .then(data => {
          const layer = new CityBuildingLayer(
            {
              zIndex: 0
            }
          );
          layer
            .source(data)
            .size('floor', [ 100, 3000 ])
            .color('rgba(242,246,250,0.5)')
            .animate({
              enable: true
            })
            .style({
              opacity: 1.0,
              baseColor: 'rgba(36,16,63,0.3)',
              windowColor: '#0e0220',
              brightColor: '#08faee'
            });
          scene.addLayer(layer);
        });
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json'
      )
        .then(res => res.json())
        .then(data => {
          const layer = new LineLayer({
            zIndex: 0
          })
            .source(data)
            .size(1)
            .shape('line')
            .color('#ff893a')
            .animate({
              interval: 1, // 间隔
              duration: 2, // 持续时间，延时
              trailLength: 2 // 流线长度
            });
          scene.addLayer(layer);
        });
    
    });
  }

  render() {
    return (
      <div className="map">
        <div id="line" className="grid-map"></div>
        <div id="column" className="grid-map"></div>
        <div id="pie" className="grid-map"></div>
        <div id="city" className="grid-map"></div>
      </div>
    );
  }
}
