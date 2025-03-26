// src/types/env.d.ts
interface ImportMetaEnv {
  BASE_URL: string;
  [key: string]: any; // 如果有其他自定义环境变量，也可以在这里定义
}

interface ImportMeta {
  env: ImportMetaEnv;
}