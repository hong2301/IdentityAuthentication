/// <reference types="vite/client" />

interface ImportMetaEnv {
    // 在这里定义你的环境变量
    readonly VITE_API_BASE_URL: string;

    // 基础Vite环境变量
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}