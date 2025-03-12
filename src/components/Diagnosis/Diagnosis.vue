<template>
    <div class="data-test-page">
      <div class="top-bar">
        <h1>Data Test Page</h1>
      </div>
  
      <!-- 网络图的容器 -->
      <div class="network">
        <h2>Network Graph</h2>
        <div class="content">
          <div class="content1">
             <div id="mynetwork"></div>
          </div>
          <div class="content2">
            <div>
              <h3>Node Information</h3>
            </div>
          </div>
        </div>
      </div>
      
  
      <!-- 测试按钮和文件上传输入 -->
      <div class="container">
        <button id="test">Test</button>
        <div class="file-upload-container">
          <input type="file" id="csvUpload" class="file-upload-input">
          <label for="csvUpload" class="file-upload-button">上传文件</label>
          <span class="file-name">未选择文件</span>
        </div>
      </div>
  
      <!-- 页面底部信息 -->
      <div class="footer">
        <div class="footer-link">
          <p><a href="/" title="首页">Index</a></p>
          <p><a href="/Description" title="辅助诊断AI系统简介">Description</a></p>
        </div>
        <p>Copyright © 2025.zstu.digital medicine All rights reserved.</p>
        <p>Contact us: <a href="https://www.zstu.edu.cn/">support@zstu.edu.cn</a></p>
      </div>
    </div>
  </template>
  
  <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
  
  <style scoped>
    @import '../Diagnosis/Diagnosis.css';
  </style>
  
  <script>
  window.onload = function() {
      const nodes = new window.vis.DataSet([
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'}
      ])
      const edges = new window.vis.DataSet([
          {from: 1, to: 3},
          {from: 1, to: 2},
          {from: 2, to: 4},
          {from: 2, to: 5}
      ])
  
      const container = document.getElementById('mynetwork')
      const data = {
          nodes:nodes,
          edges:edges
      }
      const options = {
          nodes:{
              shape:'dot',//指定节点形状为圆形
              size:10,//设置节点的大小为 10像素
              borderwidth:2,//设置节点的边框宽度为 2像素
              font:{
                  size:12,//配置节点上文字的字体大小为 12像素
                  bold:false//配置节点上文字是否加粗
              }
          },
          edges:{
              width:0.15,//线的宽度
              color:{inherit:'from'},//指定线的颜色继承自节点的颜色
              smooth:{
                  type:'continuous'//指定边为平滑曲线
              }
          },
          physics:{
              enabled:true//启动物理引擎
          },
          "interaction": {
          "dragNodes": true,
          "hideEdgesOnDrag": false,
          "hideNodesOnDrag": false
      },
      "physics": {
          "enabled": true,
          "forceAtlas2Based": {
              "avoidOverlap": 0,
              "centralGravity": 0.015,
              "damping": 0.4,
              "gravitationalConstant": -31,
              "springConstant": 0.08,
              "springLength": 100
          },
          "solver": "forceAtlas2Based",
          "stabilization": {
              "enabled": true,
              "fit": true,
              "iterations": 1000,
              "onlyDynamicEdges": false,
              "updateInterval": 50
          }
      }
      }
  
      
      //读取csv文件
      document.getElementById('csvUpload').addEventListener('change',function(event){
  
        const fileInput = event.target;
        const fileName = fileInput.files[0] ? fileInput.files[0].name : '未选择文件';
        document.querySelector('.file-name').textContent = fileName;
  
  
        const file=event.target.files[0]
        console.log('file:',file)
        if(file){
          const reader=new FileReader()
          reader.onload=function(e){
            alert('文件上传成功！')
            const csvData = e.target.result;
            console.log("Raw CSV Data:");
            const linesArray = csvData.split('\r\n').map(line => line.replace(/"/g, '')).slice(1);
            console.log(linesArray);
            linesArray.forEach(element => {
              const mediate=element.split(',');
              if(!nodes.get(mediate[1])){
                nodes.add({id:mediate[1],label:''})
              }
              if(!nodes.get(mediate[2])){
                nodes.add({id:mediate[2],label:''})
              }
              edges.add({from:mediate[1],to:mediate[2]})
            });
          }
        reader.readAsText(file);
  
        }
        else{
          console.log('file not exist')
        }
      })
  
      //创建一个网络图
      const network = new window.vis.Network(container,data,options)
      document.getElementById('test').addEventListener('click',function(){
          const tool=nodes.get(6)
          if(!nodes.get(6)){
              nodes.add({id:6,label:'Node 6'})
              edges.add({from:1,to:6})
          }
          else{
              alert('error')
          }
      });
    };
  </script>