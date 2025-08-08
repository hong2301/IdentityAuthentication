/// <reference types="vite/client" />
interface ImportMetaEnv {
    // 在这里定义你的环境变量
    readonly VITE_API_BASE_URL: string;
    // 如果你有其他变量，可以继续在这里添加
    // readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
