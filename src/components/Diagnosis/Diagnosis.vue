<template>
  <div class="data-test-page">
    <!-- 顶部导航栏 -->
    <header>
      <div class="header-container">
        <div class="empty">
          <img src="https://gd-hbimg.huaban.com/1a889cfd89caecf4325e9310a3cc6728f4c5d730dddbb-G0mRDe_fw1200webp" alt="">
        </div>
        <div class="logo">
          <h1>Data Test Page</h1>
        </div>
        <nav class="nav-menu">
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/diagnosis">诊断工具</a></li>
            <li><a href="/">数据管理</a></li>
            <li><a href="/Description">关于系统</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- 网络图的容器 -->
    <div class="network">
      <h2>Network Graph</h2>
      <div class="content">
        <div class="content1">
          <div class="maincontent">

            <!-- 测试与文件实例 -->
            <div class="testcontent">
              <h3>Test and File Example</h3>
              <!-- <div class="file-upload-container">
                <input type="file" id="csvUpload" class="file-upload-input">
                <label for="csvUpload" class="file-upload-button">上传文件</label>
                <span class="file-name">未选择文件</span>
              </div> -->
              <el-dropdown class="dropdown" trigger="click">
                <el-button type="primary" class="dropdown-button">
                  Test File<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="loadFile('PPMI-data_M6.csv')">PPMI-data_M6.csv</el-dropdown-item>
                    <el-dropdown-item @click="loadFile('PPMI-data_M12.csv')">PPMI-data_M12.csv</el-dropdown-item>
                    <el-dropdown-item @click="loadFile('TestFile:003.csv')">TestFile:003.csv</el-dropdown-item>
                    <el-dropdown-item @click="loadFile('TestFile:004.csv')">TestFile:004.csv</el-dropdown-item>
                    <el-dropdown-item @click="loadFile('TestFile:005.csv')">TestFile:005.csv</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>

            <!-- 文件上传输入 -->
            <div class="container">
              <h3>File Upload and Processing Data</h3>
              <div class="container_1">
                <el-button class="upload-btn" type="primary" size="large" @click="openUpload('.csv')"
                  v-loading="uploading">upload</el-button>
                <span>{{ fileName }}</span>
              </div>
              <!-- 绘制邻接表 -->
              <div class="container_2">
                <!-- 处理基因文件 -->
                <el-button class="btn" type="primary" @click="processGene"
                  v-loading="processingGene">挑选基因</el-button>
                <!-- 获取PFN邻接表 -->
                <!-- <el-button class="btn" type="primary" @click="getPFNChart"
                  v-loading="gettingPFNChart">PFN推理</el-button> -->
                <el-button class="btn btn1" type="primary" @click="moduleCluster" v-loading="clustering">子图划分</el-button>
                <!-- 邻接矩阵转化 -->
                <el-button class="btn btn1" type="primary" @click="createAdjMatrix"
                  v-loading="createing_Adj">启动ai微服务</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content2">
          <div id="mynetwork"></div>
        </div>
        <div class="content3">
          <!-- 节点信息 -->
          <div class="node-info-container">
            <h3>Node Information</h3>
            <div class="node-info">
              <p>Total genes: <span id="node2">{{total_genes}}</span></p>
              <p>Total edges: <span id="node1">{{total_edges}}</span></p>
              <!-- <el-table :data="module" style="width: 100%">
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="color" label="Color" width="180" />
              </el-table> -->
            </div>
          </div>
          <!-- 控制台区域 -->
          <div class="console">
            <h3>Console</h3>
            <div class="console-content" id="consoleContent" ref="consoleBody">
              <!-- 日志信息将在这里动态显示 -->
              <div v-for="(message, index) in consoleMessages" :key="index" class="log-item">
                {{ message }}
              </div>
            </div>
            <el-button class="clearConsoleButton" @click="clearConsole()">Clear all log information</el-button>
          </div>
        </div>
      </div>
    </div>


    <div class="introduction">
      <nav>
        <ul>
          <li>
            <el-card shadow="hover" style="padding-left: 1rem; padding-right: 1rem;"><a href="/"
                title="前往数据测试页面">首页</a></el-card>
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
      <a href="https://beian.miit.gov.cn/" target="_blank" style="color: black">浙ICP备2025162002号-1</a>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo" target="_blank" class="report-link"
        rel="noreferrer"><img alt="" data-src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
          class="report-img" src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
          style="width: 20px;height: auto;margin-left: 10px"><span class="report-link-text"
          style="color: black">浙公网安备33019202002609号</span></a>
    </div>
  </div>
  <uploaDia ref="uploadRef" @getFile="getFileName" @closeDialog="closeUpload" />
</template>

<link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />

<style scoped>
@import '../Diagnosis/Diagnosis.css';
@import url("//cdn.jsdelivr.net/npm/element-plus/dist/index.css");
</style>


<script setup lang="ts">
import { DataSet, Network } from 'vis';
import { onMounted, ref } from 'vue';
import uploaDia from './uploaDia.vue';
import { FileApi } from '../../api/Diagnosis/Diagnosis';
import { nextTick } from 'vue';
import { ElMessage } from 'element-plus';
// import { da } from 'element-plus/es/locales.mjs';
const uid = ref('2025')
const fileName = ref('未选择文件')//暂存上传的文件名
const uploading = ref(false)//upload状态工具
const processingGene = ref(false)//processGene状态工具
const createing_Adj = ref(false)//getChart状态工具
const clustering = ref(false)//cluster状态工具
const progressBar = ref('0')//进度条工具
const uploadRef = ref()
const consoleMessages = ref(['欢迎使用本系统'])//console台文本工具


// 定义全局的 nodes 和 edges
const nodes = new DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' }
])

const edges = new DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2, type: 'c1_2' },
  { from: 2, to: 4 },
  { from: 2, to: 5, type: 'c1_4' }
])

//打开upload弹窗
const openUpload = (tool: string) => {

  console.log('open upload dialog')
  uploadRef.value.open(tool)
  uploading.value = true//设置uploading状态
}
//获取上传了的文件名fileName
const getFileName = async (tool: string) => {
  console.log(tool)
  fileName.value = tool
}
//关闭upload弹窗
const closeUpload = () => {
  uploading.value = false
}
//获取两个重要文件
const processGene = async () => {
  //检查fileName是否存在
  if (fileName.value == '未选择文件') {
    ElMessage.error('请先上传文件')
    console.log('请先上传文件')
    return;
  }
  try {
    processingGene.value = true//设置按钮为激活状态
    console.log('selectGene for file:', fileName.value)
    //step1_selectGene
    const res_step1 = await FileApi.selectGene(fileName.value, uid.value, '1000')
    console.log('selectGene success,res:', res_step1)
    //step2_createGeneMap
    let lastDotIndex: number = fileName.value.lastIndexOf('.');
    let newFilename: string = fileName.value.slice(0, lastDotIndex) + '_1000' + fileName.value.substring(lastDotIndex);
    console.log('createGeneMap for file:', newFilename)
    const res_step2 = await FileApi.createGeneMap(newFilename, uid.value)
    console.log('createGeneMap success,res:', res_step2)
    progressBar.value = '50'
  } catch (error) {
    progressBar.value = '0'
    ElMessage.error(`selectGene error:${error}`)
  } finally {
    processingGene.value = false//取消按钮激活状态
  }
}
//获取邻接矩阵
const createAdjMatrix = async () => {
  try {
    // //处理M12
    const res12=await FileApi.selectGene('PPMI-data_M12.csv', uid.value, '1000')
    console.log('selectGene success,res:', res12)
    console.log('createGeneMap for file:', 'PPMI-data_M12_1000.csv')
    const res_1 = await FileApi.createGeneMap('PPMI-data_M12_1000.csv', uid.value)
    console.log('createGeneMap success,res:', res_1)
    console.log('createing_Adj...')
    createing_Adj.value = true
    const res_adj1 = await FileApi.createAdjMatrix('Data_Correlation.txt','M12', uid.value)
    console.log('success getChart,res:', res_adj1)
    // // //处理M24
    // const res24=await FileApi.selectGene('PPMI-data_M24.csv', uid.value, '1000')
    // console.log('selectGene success,res:', res24)    
    // console.log('createGeneMap for file:', 'PPMI-data_M24_1000.csv')
    // const res_2 = await FileApi.createGeneMap('PPMI-data_M24_1000.csv', uid.value)
    // console.log('createGeneMap success,res:', res_2)
    // console.log('createing_Adj...')
    // createing_Adj.value = true
    // const res_adj2 = await FileApi.createAdjMatrix('Data_Correlation.txt','M24', uid.value)
    // console.log('success getChart,res:', res_adj2)
    // //处理M36
    // const res36=await FileApi.selectGene('PPMI-data_M36.csv', uid.value, '1000')
    // console.log('selectGene success,res:', res36)        
    // console.log('createGeneMap for file:', 'PPMI-data_M36_1000.csv')
    // const res_3 = await FileApi.createGeneMap('PPMI-data_M36_1000.csv', uid.value)
    // console.log('createGeneMap success,res:', res_3)
    // console.log('createing_Adj...')
    // createing_Adj.value = true
    // const res_adj3 = await FileApi.createAdjMatrix('Data_Correlation.txt','M36', uid.value)
    // console.log('success getChart,res:', res_adj3)
    predictMoudle();//调用模型预测
    progressBar.value = '100'
  } catch (error) {
    progressBar.value = '50'
    ElMessage.error(`createing_Adj error:${error}`)
  } finally {
    createing_Adj.value = false
  }
}
//获取PFN邻接矩阵
// const getPFNChart = async () => {
//   //检查进度(proccessGene是否完成)
//   // if(progressBar.value<'50'){
//   //   ElMessage.error('请先完成step1')
//   //   console.log('请先完成step1')
//   //   return ;
//   // }
//   try {
//     gettingPFNChart.value = true
//     let lastDotIndex: number = fileName.value.lastIndexOf('.');
//     let newFilename: string = fileName.value.slice(0, lastDotIndex) + '_1000_PFN' + fileName.value.substring(lastDotIndex);
//     console.log('gettingPFNChart for:', newFilename)
//     const res: any = await FileApi.getFile(newFilename)
//     console.log('success getPFNChart,res:', res)
//     console.log('success res_data:', res.data)
//     ElMessage.success(`成功获取PFN表!
//                         正在绘制图谱~`)
//     await drawChart(res.data);
//     ElMessage.success(`成功绘制图谱`)
//     progressBar.value = '100'
//   } catch (error) {
//     progressBar.value = '50'
//     ElMessage.error(`gettingPFNChart error:${error}`)
//   } finally {
//     gettingPFNChart.value = false
//   }
// }

//加载文件
const loadFile = async (tool: string) => {
  if(tool){
    fileName.value=tool
    console.log('已选择测试文件：',fileName)
  }
};
//绘画图表
//定义类对象数组，输出可能的类及其颜色
interface ColorClass {
  name: string;
  color: string;
}
const module = ref<ColorClass[]>([

]);
const drawChart = (data: string) => {
  if (data) {
    console.log('csvData:', data)
    //测试工具   
    //     let tool:string=`"","row","col","weight"
    // "1","ENSG00000211951.2","ENSG00000223350.2",0.998618526389936
    // "2","ENSG00000128849.10","ENSG00000157103.11",0.998517841438376
    // "3","ENSG00000186487.19","ENSG00000151067.21",0.998324825961499
    // "4","ENSG00000256654.3","ENSG00000128849.10",0.998252771390811
    // "5","ENSG00000183454.16","ENSG00000187720.14",0.998227327388466
    // "6","ENSG00000078549.14","ENSG00000138162.18",0.998208034887389
    // "7","ENSG00000174640.13","ENSG00000144730.17",0.998175096003787
    // "8","ENSG00000140538.16","ENSG00000151067.21",0.998149026302215
    // "9","ENSG00000157103.11","ENSG00000184347.14",0.998111040925496
    // "10","ENSG00000128849.10","ENSG00000184347.14",0.99809077834655`
    //     console.log(tool)
    // const linesArray = tool.split(/\r?\n/).map(line => line.replace(/"/g, '')).slice(1);

    //处理res.data数据，生成linesArray点边数组
    const linesArray = data.split(/\r?\n/).map(line => line.replace(/"/g, '')).slice(1);
    console.log(linesArray);
    console.log(linesArray.length);
    //添加点边信息
    nodes.clear();
    edges.clear();
    linesArray.forEach(element => {
      const mediate = element.split(',');
      if (!nodes.get(mediate[0])) {
        nodes.add({ id: mediate[0], label: '' });
      }
      if (!nodes.get(mediate[1])) {
        nodes.add({ id: mediate[1], label: '' });
      }
      edges.add({ from: mediate[0], to: mediate[1], color: { color: mediate[4] } });
      // 检查是否已存在相同 id 的对象
      const exists = module.value.some(
        (item) => item.name === mediate[3] && item.color === mediate[4]
      );
      if(!exists){
        const newItem: ColorClass = {
          name: mediate[3], // 提取 mediate[3] 作为 name
          color: mediate[4], // 提取 mediate[4] 作为 color
        };
        module.value.push(newItem)
      }
    });
    console.log('module:',module.value)
    updateNodeColors();
    ElMessage.success('成功绘制聚类图谱~')
  }
  console.log(edges)
}

//聚类模块
const total_edges=ref('未生成图表')
const total_genes=ref('未生成图表')
const moduleCluster = async () => {
  //检查fileName是否存在
  if (fileName.value == '未选择文件') {
    ElMessage.error('请先上传文件')
    console.log('请先上传文件')
    return;
  }
  try{  //获取文件名
    let lastDotIndex: number = fileName.value.lastIndexOf('.');
    let newFilename: string = fileName.value.slice(0, lastDotIndex) + '_1000_PFN' + fileName.value.substring(lastDotIndex);
    let newFilename_: string = fileName.value.slice(0, lastDotIndex) + '_1000_PFN_modules' + fileName.value.substring(lastDotIndex);
    console.log('moduleCluster for:', newFilename)
    //进行聚类
    clustering.value=true
    ElMessage.success('正在绘制聚类图谱~')
    const res: any = await FileApi.moduleCluster(newFilename, uid.value)
    console.log('res:', res)
    console.log('edges:', res.data.data.ClusterInfo["Total edges"])  
    total_edges.value=res.data.data.ClusterInfo["Total edges"]
    console.log('genes  :', res.data.data.ClusterInfo["Total genes"])  
    total_genes.value=res.data.data.ClusterInfo["Total genes"]
    console.log('getfile:', newFilename_)
    const respone: any = await FileApi.getFile(newFilename_)
    console.log('res:', respone)
    //绘制图谱
    await drawChart(respone.data)
  }catch(error){
    ElMessage.error('无法绘制聚类图谱~')
  }finally{
    clustering.value=false
  }
}
//调用模型预测
const predictMoudle = async () => {
  try{  
    //createGeneMap
    console.log('开始调用模型预测')
    const res = await FileApi.predictMoudle(uid.value)
    console.log('res:',res)
  }catch(error){
    ElMessage.error('调用模型预测失败')
  }finally{
    clustering.value=false
  }
}
// 动态更新节点颜色
function updateNodeColors() {
  const nodeColorMap: { [key: number]: string[] } = {};
  // 动态为边设置样式
  // edges.forEach((edge:any) => {
  //     let color;
  //     switch (edge.type) {
  //         case 'c1_4':
  //             color = 'red';
  //             break;
  //         case 'c1_2':
  //             color = 'blue';
  //             break;
  //         case 'c1_6':
  //             color = 'yellow';
  //             break;
  //         case 'c1_11':
  //             color = 'purple';
  //             break;
  //         case 'c1_18':
  //             color = 'orange';
  //             break;
  //         default:
  //             color = 'grey';
  //     }
  //     edges.update({ id: edge.id, color: { color: color } });
  // });
  // 遍历所有边，收集节点的颜色信息
  edges.forEach((edge: any) => {
    const fromNode = edge.from;
    const toNode = edge.to;

    // 如果节点还没有颜色，初始化为空数组
    if (!nodeColorMap[fromNode]) nodeColorMap[fromNode] = [];
    if (!nodeColorMap[toNode]) nodeColorMap[toNode] = [];

    // 将边的颜色添加到对应的节点中
    nodeColorMap[fromNode].push(edge.color.color);
    nodeColorMap[toNode].push(edge.color.color);
  });
  console.log('nodeColorMap:',nodeColorMap)
  // 更新节点颜色
  Object.keys(nodeColorMap).forEach((nodeId: any) => {
    const colors = nodeColorMap[nodeId];

    // 如果节点连接多条边，可以选择混合颜色或使用第一条边的颜色
    const nodeColor = colors[0]; // 使用第一条边的颜色
    nodes.update({ id: nodeId, color: { background: nodeColor, border: nodeColor } });
  });
}
window.onload = function () {

  const container = document.getElementById('mynetwork')
  const data = {
    nodes: nodes,
    edges: edges
  }
  const options = {
    groups: {
      c1_2: { color: { color: 'red', highlight: 'darkred' } }, // 类型1的颜色
      c1_4: { color: { background: 'blue', border: 'darkblue' } }, // 类型2的颜色
      default: { color: { background: 'gray', border: 'black' } } // 默认颜色
    },
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


  document.getElementById('csvUpload')?.addEventListener('change', function (event) {
    // 类型断言：告诉 TypeScript event.target 实际上是 HTMLInputElement 类型
    const fileInput = event.target as HTMLInputElement;
    const fileName = fileInput.files?.[0] ? fileInput.files[0].name : '未选择文件';
    (document.querySelector('.file-name') as HTMLElement).textContent = fileName;

    const file = fileInput.files?.[0];
    console.log('file:', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        alert('文件上传成功！');
        const csvData = e.target?.result;
        console.log("Raw CSV Data:");
        if (typeof csvData === 'string') {
          const linesArray = csvData.split('\r\n').map(line => line.replace(/"/g, '')).slice(1);
          console.log(linesArray);
          linesArray.forEach(element => {
            const mediate = element.split(',');
            if (!nodes.get(mediate[1])) {
              nodes.add({ id: mediate[1], label: '' });
            }
            if (!nodes.get(mediate[2])) {
              nodes.add({ id: mediate[2], label: '' });
            }
            edges.add({ from: mediate[1], to: mediate[2] });
          });
        }
      };
      reader.readAsText(file);
    } else {
      console.log('file not exist');
    }
  });

  //创建一个网络图
  // @ts-ignore
  const network = new Network(container, data, options)
  document.getElementById('test')?.addEventListener('click', function () {
    const tool = nodes.get(6);
    if (!tool) {
      nodes.add({ id: 6, label: 'Node 6' });
      edges.add({ from: 1, to: 6 });
    } else {
      alert('error');
    }
  });
};
let eventSource: any//SSE实例
//连接SSE
const ConnectSSE = () => {
  CloseSSE();
  uid.value = '2025'
  eventSource = new EventSource(`https://www.dementiaai.cn/backside/sse/createSse?uid=${uid.value}`);
  eventSource.onopen = function () {
    console.log('SSE链接成功,uid:', uid.value);
  }
  eventSource.onmessage = function (event:any) {
    if (event.data) {
      console.log(event.data)
      consoleMessages.value.push(`> ${event.data}`)
    }
    scrollToBottom();
  }
  eventSource.onerror = function (error: any) {
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
//方法：滚动到底部
const consoleBody = ref<HTMLElement | null>(null);
const scrollToBottom = () => {
  nextTick(() => {
    if (consoleBody.value) {
      consoleBody.value.scrollTop = consoleBody.value.scrollHeight;
    }
  });
};
// 定义响应式数据
const logs = ref<string[]>([]);

// 清除所有日志的方法
const clearConsole = () => {
  logs.value = []; // 清空日志数组
  console.log('Console cleared.'); // 在控制台输出清除日志的提示
};

onMounted(() => {
  // FileApi.connectSSE('2025');
  //自动连接SSE
  ConnectSSE();
})
</script>