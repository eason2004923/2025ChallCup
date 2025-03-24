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
      
      <div class="maincontent">

      <!-- 测试与文件实例 -->
       <div class="testcontent">
        <h2>Test and File Example</h2>
          <div class="file-upload-container">
            <input type="file" id="csvUpload" class="file-upload-input">
            <label for="csvUpload" class="file-upload-button">上传文件</label>
            <span class="file-name">未选择文件</span>
          </div>
        <el-dropdown class="dropdown" trigger="click">
           <el-button type="primary">
              Test File<el-icon class="el-icon--right"><arrow-down /></el-icon>
           </el-button>
           <template #dropdown>
               <el-dropdown-menu>
                <el-dropdown-item @click="loadFile('FPN-M6.csv')">FPN-M6.csv</el-dropdown-item>
                <el-dropdown-item @click="loadFile('TestFile:002.csv')">TestFile:002.csv</el-dropdown-item>
                <el-dropdown-item @click="loadFile('TestFile:003.csv')">TestFile:003.csv</el-dropdown-item>
                <el-dropdown-item @click="loadFile('TestFile:004.csv')">TestFile:004.csv</el-dropdown-item>
                <el-dropdown-item @click="loadFile('TestFile:005.csv')">TestFile:005.csv</el-dropdown-item>
            </el-dropdown-menu>
           </template>
        </el-dropdown>
       </div>
  
      <!-- 文件上传输入 -->
       <div class="container">
        <h2>File Upload and Processing Data</h2>
        <div class="container_1">
       
        <div>
        <el-button type="primary" size="large" @click="openUpload('.csv')" v-loading="uploading">upload</el-button>
        <span>{{ fileName }}</span>
        </div>
      </div>
      <!-- 绘制邻接表 -->
      <div class="container_2">
        <div>
          <!-- step1处理基因文件 -->
          <el-button class="btn" type="primary" @click="processGene" v-loading="processingGene">step1(processGene)</el-button>
          <!-- step2生成邻接矩阵 -->
          <el-button class="btn" type="primary" @click="getChart" v-loading="gettingChart">step2(getChart)</el-button>
          <!-- 获取PFN邻接表 -->
          <el-button class="btn" type="primary" @click="getPFNChart" v-loading="gettingPFNChart">getPFNChart</el-button>
        </div>
      </div>
       </div>
      </div>

      <div class="introduction">
    <nav>
      <ul>
        <li>
          <el-card shadow="hover" style="padding-left: 1rem; padding-right: 1rem;"><a href="/" title="前往数据测试页面">首页</a></el-card>
          <el-card shadow="hover"><a href="/Description" title="辅助诊断AI系统简介">系统简介</a></el-card>
        </li>
      </ul>
    </nav>
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
    <uploaDia ref="uploadRef" @getFile="getFileName" @closeDialog="closeUpload"/>
</template>
  
<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
  
<style scoped>
  @import '../Diagnosis/Diagnosis.css';
  @import url("//cdn.jsdelivr.net/npm/element-plus/dist/index.css");
</style>


  <script setup lang="ts">
  import { DataSet, Network } from 'vis';
  import {onMounted, ref} from 'vue';
  import uploaDia from './uploaDia.vue';
  import { FileApi } from '../../api/Diagnosis/Diagnosis';
  import { ElMessage } from 'element-plus';
  const uid=ref('2025')
  const fileName=ref('未选择文件')//暂存上传的文件名
  const uploading=ref(false)//upload状态工具
  const processingGene=ref(false)//processGene状态工具
  const gettingChart=ref(false)//getChart状态工具
  const gettingPFNChart=ref(false)//getChart状态工具
  const progressBar=ref('0')//进度条工具
  const uploadRef=ref()


// 定义全局的 nodes 和 edges
const nodes =new DataSet([
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'}
      ])
const edges =new DataSet([
          {from: 1, to: 3},
          {from: 1, to: 2},
          {from: 2, to: 4},
          {from: 2, to: 5}
      ])

  //打开upload弹窗
  const openUpload=(tool:string)=>{

    console.log('open upload dialog')
    uploadRef.value.open(tool)
    uploading.value=true//设置uploading状态
  }
  //获取上传了的文件名fileName
  const getFileName=async (tool:string) => {
    console.log(tool)
    fileName.value = tool
  }
  //关闭upload弹窗
  const closeUpload = () => {
    uploading.value = false
  } 
  //获取两个重要文件
  const processGene=async()=>{
    //检查fileName是否存在
    if(fileName.value=='未选择文件'){
      ElMessage.error('请先上传文件')
      console.log('请先上传文件')
      return ;
    }
    try{
      processingGene.value=true//设置按钮为激活状态
      console.log('selectGene for file:',fileName.value)
      //step1_selectGene
      const res_step1= await FileApi.selectGene(fileName.value,uid.value,'660')
      console.log('selectGene success,res:',res_step1)
      //step2_createGeneMap
      let lastDotIndex: number = fileName.value.lastIndexOf('.');
      let newFilename: string = fileName.value.slice(0, lastDotIndex) + '_1000' + fileName.value.substring(lastDotIndex);
      console.log('createGeneMap for file:',newFilename)
      const res_step2= await FileApi.createGeneMap(newFilename,uid.value)
      console.log('createGeneMap success,res:',res_step2)
      progressBar.value='50'
    }catch(error){
      progressBar.value='0'
      ElMessage.error(`selectGene error:${error}`)
    }finally{
      processingGene.value=false//取消按钮激活状态
    }
  }
  //获取邻接矩阵
  const getChart= async ()=>{
    //检查进度(proccessGene是否完成)
    // if(progressBar.value<'50'){
    //   ElMessage.error('请先完成step1')
    //   console.log('请先完成step1')
    //   return ;
    // }
    try{
      console.log('gettingChart...')
      gettingChart.value=true
      const res=await FileApi.createAdjMatrix('Data_Correlation.txt',uid.value)
      console.log('success getChart,res:',res)
      progressBar.value='100'
    }catch(error){
      progressBar.value='50'
      ElMessage.error(`gettingChart error:${error}`)
    }finally{
      gettingChart.value=false
    }
  }
  //获取PFN邻接矩阵
  const getPFNChart=async()=>{
    //检查进度(proccessGene是否完成)
    // if(progressBar.value<'50'){
    //   ElMessage.error('请先完成step1')
    //   console.log('请先完成step1')
    //   return ;
    // }
    try{
      console.log('gettingPFNChart...')
      gettingChart.value=true
      const res=await FileApi.getFile('PPMI-data_M6_1000_PFN.csv',uid.value)
      console.log('success getPFNChart,res:',res)
      progressBar.value='100'
    }catch(error){
      progressBar.value='50'
      ElMessage.error(`gettingPFNChart error:${error}`)
    }finally{
      gettingChart.value=false
    }  
  }

  //加载文件
  const loadFile = async (fileName: string) => {
  try {
    console.log(`Loading file: ${fileName}`);
    // 假设文件存储在服务器路径或本地路径
    // const filePath = `http://localhost:5100/api/files/${fileName}`;
    const filePath = `E:/ChallCup-2/${fileName}`;
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to load file: ${fileName}`);
    }

    const csvData = await response.text();
    console.log("Raw CSV Data:", csvData);

    // 解析 CSV 数据并更新网络图
    const linesArray = csvData.split('\n').map(line => line.trim()).filter(line => line);
    console.log("Parsed CSV Lines:", linesArray);

    linesArray.forEach((element, index) => {
      const mediate = element.split(',');
      if (mediate.length >= 2) {
        const fromNode = mediate[0].trim();
        const toNode = mediate[1].trim();

        if (!nodes.get(fromNode)) {
          nodes.add({ id: fromNode, label: `Node ${fromNode}` });
        }
        if (!nodes.get(toNode)) {
          nodes.add({ id: toNode, label: `Node ${toNode}` });
        }
        edges.add({ from: fromNode, to: toNode });
      } else {
        console.warn(`Invalid line format at index ${index}: ${element}`);
      }
    });

    console.log('Network graph updated successfully.');
    ElMessage.success(`文件加载成功: ${fileName}`);
  } catch (error) {
    console.error(`Error loading file`);
    ElMessage.error(`加载文件失败: ${fileName}`);
  }
};

  window.onload = function() {

      const container = document.getElementById('mynetwork')
      const data = {
          nodes:nodes,
          edges:edges
      }
      const options = {
          nodes: {
              shape: 'dot', // 指定节点形状为圆形
              size: 10, // 设置节点的大小为10像素
              borderWidth: 2, // 设置节点的边框宽度为2像素
              font: {
                  size: 12, // 配置节点上文字的字体大小为12像素
                  bold: {
                      mod: 'normal' // 如果不希望字体加粗，则使用 'normal'
                  }
              }
          },
          edges: {
              width: 0.15, // 线的宽度
              color: {inherit: 'from'}, // 指定线的颜色继承自节点的颜色
              smooth: {
                  type: 'continuous' // 指定边为平滑曲线
              }
          },
          physics: {
              enabled: true,
              forceAtlas2Based: {
                  avoidOverlap: 0,
                  centralGravity: 0.015,
                  damping: 0.4,
                  gravitationalConstant: -31,
                  springConstant: 0.08,
                  springLength: 100
              },
              solver: "forceAtlas2Based",
              stabilization: {
                  enabled: true,
                  fit: true,
                  iterations: 1000,
                  onlyDynamicEdges: false,
                  updateInterval: 50
              }
          },
          interaction: {
              dragNodes: true,
              hideEdgesOnDrag: false,
              hideNodesOnDrag: false
          }
      };
  
      
    document.getElementById('csvUpload')?.addEventListener('change', function(event) {
    // 类型断言：告诉 TypeScript event.target 实际上是 HTMLInputElement 类型
    const fileInput = event.target as HTMLInputElement;
    const fileName = fileInput.files?.[0] ? fileInput.files[0].name : '未选择文件';
    (document.querySelector('.file-name') as HTMLElement).textContent = fileName;

    const file = fileInput.files?.[0];
    console.log('file:', file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            alert('文件上传成功！');
            const csvData = e.target?.result;
            console.log("Raw CSV Data:");
            if (typeof csvData === 'string') {
                const linesArray = csvData.split('\r\n').map(line => line.replace(/"/g, '')).slice(1);
                console.log(linesArray);
                linesArray.forEach(element => {
                    const mediate = element.split(',');
                    if (!nodes.get(mediate[1])) {
                        nodes.add({id: mediate[1], label: ''});
                    }
                    if (!nodes.get(mediate[2])) {
                        nodes.add({id: mediate[2], label: ''});
                    }
                    edges.add({from: mediate[1], to: mediate[2]});
                });
            }
        };
        reader.readAsText(file);
    } else {
        console.log('file not exist');
    }
  });
  
  //创建一个网络图
  const network = new Network(container,data,options)
  document.getElementById('test')?.addEventListener('click', function() {
    const tool = nodes.get(6);
    if (!tool) {
        nodes.add({id: 6, label: 'Node 6'});
        edges.add({from: 1, to: 6});
    } else {
        alert('error');
    }
  });
};
let eventSource:any//SSE实例
//连接SSE
const ConnectSSE = () => {
  CloseSSE();
  uid.value = '2025'
  eventSource = new EventSource(`http://120.26.117.60:5090/sse/createSse?uid=${uid.value}`);
  eventSource.onopen = function () {
    console.log('SSE链接成功,uid:', uid.value);
  }
  eventSource.onmessage = function (event:any) {
    if (event.data) {
      console.log(event.data)
    }
  }
  eventSource.onerror = function (error:any) {
    console.error('SSE发生错误:', error, 'readyState:', eventSource.readyState);
    // 可以在这里添加重试逻辑或其他错误处理
  };
}
const CloseSSE = () => {
  if (eventSource) {
    eventSource.close()
    console.log('SSE connection closed.');
    eventSource = null; // 清除引用
  }
};

onMounted(()=>{
  // FileApi.connectSSE('2025');
  //自动连接SSE
  ConnectSSE();
})
</script>