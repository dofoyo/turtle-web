<template>
  <div id="main">
    <div id='myChart'
           ref="myChart"
           >
      </div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'echarts',
  data () {
    return {
      itemID:'',
      resData: '',
      echartsOption: {
        title: {
          text: '',
          left: 0
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: [],
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        series: [
          {
            name: '日K',
            type: 'k',
            data: [],
            itemStyle: {
              normal: {
                color: '#ec0000',
                color0: '#00da3c',
                borderColor: '#8A0000',
                borderColor0: '#008F28'
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    '$store.state.itemID': function () {
          this.itemID = this.$store.state.itemID;
          this.getDataAndDraw();
    }
  },
  mounted () {
    this.itemID = this.$store.state.itemID;
    this.myChart = echarts.init(document.getElementById('myChart'));
    this.getDataAndDraw();
    //this.setEchartOption();
    //this.myChart.setOption(this.echartsOption);
    //this.timer = setInterval(this.getData,60000); //每1分钟刷新一次
  },
  methods: {
    getDataAndDraw:function(){      
      var vm = this;
      vm.isloading = true;
      var apiurl = 'http://localhost:8088/kdatas/' + vm.itemID;
      vm.$http.get(apiurl)
              .then(function(response){
                var rawDatas = response.data.content;
                
                var title = rawDatas.nameCode
                var categoryData = []
                var values = []
                for(var i in rawDatas.kdatas){
                    categoryData.push(rawDatas.kdatas[i].date)
                    var kdata = []
                    kdata.push(rawDatas.kdatas[i].open)
                    kdata.push(rawDatas.kdatas[i].close)
                    kdata.push(rawDatas.kdatas[i].low)
                    kdata.push(rawDatas.kdatas[i].high)
                    values.push(kdata)
                }
                
                //var kData = [['sangzddd'],['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]]
                
                //console.log(rawDatas);
                //console.log(title);
                //console.log(categoryData);
                //console.log(values);

                vm.isloading = false;

                //vm.resData = vm.splitData(kData) 
                vm.$set(vm.echartsOption.title,"text",title)   
                //vm.echartsOption.title.text = vm.resData.title
                vm.echartsOption.xAxis.data = categoryData
                vm.echartsOption.series[0].data = values

                vm.myChart.setOption(vm.echartsOption);

             })
              .catch(function(response) {
                vm.isloading = false;
                console.log("getKData: there are something wrong!!!");
                console.log(apiurl)
                console.log(response);
                
              })
    }
  },
  destroyed: function(){
    clearInterval(this.timer);
  }
}

</script>
<style scoped>
#myChart{
  width: 70%;
  height: 500px;
  margin: 0 auto;
}
</style>
