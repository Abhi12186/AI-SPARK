/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // aur bhi env vars add kar sakte ho agar future me zarurat ho
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
