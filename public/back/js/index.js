$(function(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".pic_left"));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    var myChart1 = echarts.init(document.querySelector(".pic_right"));

    // 绘制饼状图, 需要哪些东西?
    // 标题, 数据

    // 4. 配置数据
    var option1 = {
        // 标题
        title: {
            text: "热门品牌销售",
            subtext: "2017年6月",
            x:"center"
        },
        // 提示框
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend:{
            orient:"vertical",
            left:"left",
            data:['耐克','阿迪','百伦','李宁','乔丹']
        },
        // 数据, 有可能有多组数据对比, 所以是一个数组
        series: [
            {
                name: "销售情况",
                type: "pie",  // type: bar 柱状图, line 折线图, pie 饼图
                radius:"55%",
                center:["50%","60%"],
                data: [
                    // 将数据配置成我们需要的数据格式
                    { name: "耐克", value: 335 },
                    { name: "阿迪", value: 310 },
                    { name: "百伦", value: 234 },
                    { name: "李宁", value: 135 },
                    { name: "乔丹", value: 1548 }
                ],
                itemStyle:{
                    emphasis:{
                        shadowBlur:10,
                        shadowOffsetX:0,
                        shadowColor:"rgba(0,0,0,.5)"
                    }
                }
            }
        ]
    };

    // 5. 通过 setOption方法, 根据 option 生成图标
    myChart1.setOption( option1);


})