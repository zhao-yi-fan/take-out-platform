export {};

declare global {
  interface Window {
    __imgErrorList__: {
      src: string;
      time: number;
      element: HTMLImageElement;
    }[];
    Vue?: {
      createApp: any;
    };
    vant?: any;
  }
}
