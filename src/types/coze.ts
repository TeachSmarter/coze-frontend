export type CozeUIConfig = {
  base: {
    icon: string;
    layout: string;
    lang: string;
    zIndex: number;
  };
  chatBot: {
    title: string;
    uploadable: boolean;
    width: number;
  };
  header: {
    isNeedClose: boolean;
  };
  asstBtn: {
    isNeed: boolean;
  };
  footer: {
    isShow: boolean;
    expressionText: string;
    linkvars: {
      [key: string]: {
        text: string;
        link: string;
      };
    };
  };
};

export type CozeConfig = {
  config: {
    bot_id: string;
  };
  isIframe: boolean;
  auth: {
    type: string;
    token: string;
    onRefreshToken: () => Promise<string>;
  };
  userInfo: {
    id: string;
    url: string;
    nickname: string;
  };
  ui: CozeUIConfig;
};

export type ChatClient = {
  showChatBot: () => void;
  hideChatBot: () => void;
};

export type CozeWebSDK = {
  WebChatClient: {
    new (config: CozeConfig): ChatClient;
  };
};

declare global {
  interface Window {
    CozeWebSDK: CozeWebSDK;
  }
} 