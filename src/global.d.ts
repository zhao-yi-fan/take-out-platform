export {};

declare global {
  interface Window {
    Vue?: {
      createApp: any;
    };
    vant?: any;
  }
}
