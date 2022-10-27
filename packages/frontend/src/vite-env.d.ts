/// <reference types="vite/client" />

declare module "*.fbx" {
  const path: string;
  export default path;
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
