<template>
  <div id="app">
    <header>
      <div class="header-container">
        <div class="empty">
          <img src="https://gd-hbimg.huaban.com/1a889cfd89caecf4325e9310a3cc6728f4c5d730dddbb-G0mRDe_fw1200webp" alt="">
        </div>
        <div class="logo">
          <h1>二期辅助诊断系统</h1>
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

    <div class="carousel">
      <div class="carousel-inner" ref="carouselInner">
        <div class="carousel-item active">
          <img src="../assets/Fig1-DiagramM2GMC-6.jpg" alt="Image 1">
        </div>
        <div class="carousel-item">
          <img src="../assets/Fig1-FrameworkSTPD.jpg" alt="Image 2">
        </div>
        <div class="carousel-item">
          <img src="../assets/Fig1_DualGCN-Framework-v3.jpg" alt="Image 3">
        </div>
        <div class="carousel-item">
          <img src="../assets/Fig2-STembeddings.jpg" alt="Image 4">
        </div>
      </div>
      <div class="carousel-indicators">
        <span class="indicator active" @click="showSlide(0)"></span>
        <span class="indicator" @click="showSlide(1)"></span>
        <span class="indicator" @click="showSlide(2)"></span>
        <span class="indicator" @click="showSlide(3)"></span>
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
      <a href="https://beian.miit.gov.cn/" target="_blank" style="color: black">浙ICP备2025162002号-1</a>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo" target="_blank" class="report-link"
        rel="noreferrer"><img alt="" data-src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
          class="report-img" src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
          style="width: 20px;height: auto;margin-left: 10px"><span class="report-link-text"
          style="color: black">浙公网安备33019202002609号</span></a>
    </footer>
  </div>
</template>

<style scoped>
@import url("//cdn.jsdelivr.net/npm/element-plus/dist/index.css");
@import '../assets/index.css';
</style>

<script scoped>
export default {
  mounted() {
    let currentIndex = 0;
    const slides = this.$el.querySelectorAll('.carousel-item');
    const indicators = this.$el.querySelectorAll('.indicator');

    // 动态设置轮播图高度为最小图片高度
    const setCarouselHeight = () => {
      let minHeight = Infinity;
      slides.forEach((slide) => {
        const img = slide.querySelector('img');
        if (img.complete) { // 检查图片是否加载完成
          const height = img.naturalHeight; // 获取图片原始高度
          if (height < minHeight) {
            minHeight = height;
          }
        }
      });
      this.$el.querySelector('.carousel').style.height = `${minHeight}px` / 5;
    };

    // 确保图片加载完成后设置高度
    slides.forEach((slide) => {
      const img = slide.querySelector('img');
      img.onload = setCarouselHeight;
    });

    // 初始调用一次，以防图片已经加载完成
    setCarouselHeight();

    function showSlide(index) {
      const carouselInner = this.$refs.carouselInner;
      const slideWidth = slides[index].clientWidth; // 获取当前图片的宽度
      const translateX = -index * slideWidth; // 计算平移距离
      carouselInner.style.transform = `translateX(${translateX}px)`; // 平滑移动

      // 更新指示器的活动状态
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide.call(this, nextIndex); // 使用 call 确保 this 指向正确
      currentIndex = nextIndex;
    }

    setInterval(() => {
      nextSlide.call(this); // 使用 call 确保 this 指向正确
    }, 5000); // 自动播放轮播图，每5秒切换一次

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide.call(this, index); // 使用 call 确保 this 指向正确
        currentIndex = index;
      });
    });
  }
};
</script>