import Axios from '../axios';
export const FileApi={
  //上传文件
  uploadFile:async(fileData:any)=>{
    if(!fileData){
      return Promise.reject(new Error('Data is required'));
    }
    try {
      const formData = new FormData();
      formData.append('file', fileData); // 这里的 'file' 需要与后端 @RequestParam("file") 中的名称一致
      return await Axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (error) {
      console.error('Error uploadCsv:', error);
      throw new Error('Failed to upload the CSV file');
    }
  },
  //挑选基因
  selectGene:async(fileName:string,uid:string,num:string)=>{
    //判断文件名是否存在
    if(!fileName){
      return Promise.reject(new Error('fileName is required'));
    }
    try{
      return await Axios.get('/M2STGAT/selectGene',{params:{fileName:fileName,uid:uid,num:num}})
    }catch(error){
      console.log("selectGene error:",error)
    }
  },  
  //生成基因图谱
  createGeneMap:async(fileName:string,uid:string)=>{
    //判断文件名是否存在
    if(!fileName){
      return Promise.reject(new Error('fileName is required'));
    }
    try{
      return await Axios.get('/M2STGAT/createGeneMap',{params:{fileName:fileName,uid:uid}})
    }catch(error){
      console.log("createGeneMap error:",error)
    }
  },
  //聚类
  moduleCluster:async(fileName:string,uid:string)=>{
    //判断文件名是否存在
    if(!fileName){
      return Promise.reject(new Error('fileName is required'));
    }
    try{
      return await Axios.get('/M2STGAT/moduleCluster',{params:{fileName:fileName,uid:uid}})
    }catch(error){
      console.log("moduleCluster error:",error)
    }
  },
  //邻接矩阵转化
  createAdjMatrix:async(fileName:string,type:string,uid:string)=>{
    //判断文件名是否存在
    if(!fileName){
      return Promise.reject(new Error('fileName is required'));
    }
    try{
      return await Axios.get('/M2STGAT/createAdjMatrix',{params:{fileName:fileName,type:type,uid:uid}})
    }catch(error){
      console.log("createAdjMatrix error:",error)
    }
  },
  //利用模型预测
  predictMoudle:async(uid:string)=>{
    try{
      return await Axios.get('/M2STGAT/predict',{params:{M12GeneFileName:'PPMI-data_M12_1000.csv',M24GeneFileName:'PPMI-data_M24_1000.csv',M36GeneFileName:'PPMI-data_M36_1000.csv',
                                                         M12AdjMatrixFileName:'M12_AdjMatrix.csv',M24AdjMatrixFileName:'M24_AdjMatrix.csv',M36AdjMatrixFileName:'M36_AdjMatrix.csv',uid:uid}})
    }catch(error){
      console.log("predictMoudle error:",error)
    }
  },
  //获取文件
  getFile:async(fileName:string)=>{
    //判断文件名是否存在
    if(!fileName){
      return Promise.reject(new Error('fileName is required'));
    }
    try{
      return await Axios.get('/M2STGAT/getFile',{params:{fileName:fileName}})
    }catch(error){
      console.log("getFile error:",error)
    }
  },
  connectSSE:async(uid:string)=>{
    //判断uid是否存在
    if(!uid){
      return Promise.reject(new Error('uid is required'));
    }
    try{
      return await Axios.get('/sse/createSse',{params:{uid:uid}})
    }catch{}
  },
  testSSE:async(uid:string)=>{
    //判断uid是否存在
    if(!uid){
      return Promise.reject(new Error('uid is required'));
    }
    try{
      return await Axios.get('/sse/sendMsg',{params:{uid:uid}})
    }catch{}
  },
  closeSSE:async(uid:string)=>{
    if(!uid){
      return Promise.reject(new Error('uid is required'));
    }
    try{
      return await Axios.get('/sse/closeSse',{params:{uid:uid}})
    }catch{}
  }
  
}   