<template>
    <div id="app">
      <header>
        <div>
          <h1>二期辅助诊断系统</h1>
        </div>
      </header>

  <div class="carousel">
    <div class="carousel-inner" ref="carouselInner">
      <div class="carousel-item active">
        <img src="/image1.png" alt="Image 1">
      </div>
      <div class="carousel-item">
        <img src="/image2.png" alt="Image 2">
      </div>
      <div class="carousel-item">
        <img src="/image3.png" alt="Image 3">
      </div>
    </div>
    <div class="carousel-indicators">
      <span class="indicator active" @click="showSlide(0)"></span>
      <span class="indicator" @click="showSlide(1)"></span>
      <span class="indicator" @click="showSlide(2)"></span>
    </div>
  </div>

  <div class="introduction">
    <nav>
      <ul>
        <li>
          <el-card shadow="hover"><a href="/Description" title="辅助诊断AI系统简介">系统简介</a></el-card>
          <el-card shadow="hover"><a href="/diagnosis" title="前往数据测试页面">数据测试</a></el-card>
        </li>
      </ul>
    </nav>
  </div>
  
      <footer>
        <h3>All about this</h3>
        <h3>please contanct with us.</h3>
        <ul>
          <li><a href="" title="背景情况介绍">Background</a></li>
          <li><a href="/Description" title="辅助诊断AI系统简介">Description</a></li>
          <li><a href="/diagnosis" title="数据测试">Diagnosis</a></li>
        </ul>
        <p>Copyright © 2025.zstu.digital medicine All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <style scoped>
  @import '../assets/index.css';
  @import url("//cdn.jsdelivr.net/npm/element-plus/dist/index.css");
  </style>
<script>
export default {
  mounted() {
        // //两个定时器
        // var dsq1,dsq2;
        // //单个图片的长度，为后续移动路程的计算做准备
        // var imgW = imgs[0].offsetWidth
        // //第一张显示的图片下标
        // var imgIndex = 1
        // //默认的按钮下标
        // var btnIndex = 0
        // //初始的main的scrollLeft值 600px
        // main.scrollLeft = imgW*imgIndex

    let currentIndex = 0;
    const slides = this.$el.querySelectorAll('.carousel-item');
    const indicators = this.$el.querySelectorAll('.indicator');

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slides[i].classList.toggle('active', i === index);
        indicators[i].classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
      currentIndex = nextIndex;
    }

    // function move(){
    //         //获取开始值和结束值,指每2张图片之间移动的距离
    //         var start = main.scrollLeft
    //         var end = imgIndex*imgW
    //         var speed = (end-start)/20//speed=30
    //         //num为步数，宽度为600px,speed为30，则走完需要20步
    //         var num = 0
    //         clearInterval(dsq2)
    //         dsq2 = setInterval(function(){
    //             num++
    //             if(num == 20){
    //                 clearInterval(dsq2)
    //                 main.scrollLeft = end
    //             }else{
    //                 start += speed
    //                 main.scrollLeft = start
    //            }
    //             //注意dsq2的时间和dsq1时间的大小，dsq2的时间间隔不能太大   
    //         },30)
    //     }  

    setInterval(nextSlide, 3000); // 自动播放轮播图，每3秒切换一次

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        currentIndex = index;
      });
    });
  }
}
</script>