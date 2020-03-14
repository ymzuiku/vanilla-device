const ua = navigator.userAgent;
const dp = window.devicePixelRatio || 1;
export const iw = () => window.innerWidth;
export const ih = () => window.innerHeight;

export const isSmall = () => (dp > 1 ? iw() <= 320 : iw() <= 640);
export const isMiddle = () => (dp > 1 ? iw() <= 375 : iw() <= 750);
export const isLarge = () => (dp > 1 ? iw() <= 512 : iw() <= 1024);
export const isExtraLarge = () => (dp > 1 ? iw() <= 640 : iw() <= 1280);

export const isAndroid = () => /(?:Android)/.test(ua);
// const isAndroid = true;
export const isFireFox = () => /(?:Firefox)/.test(ua);
export const isChrome = () => /(?:Chrome|CriOS)/.test(ua);
export const isPad = () =>
  /(?:iPad|PlayBook)/.test(ua) ||
  (isAndroid() && !/(?:Mobile)/.test(ua)) ||
  (isFireFox() && /(?:Tablet)/.test(ua));
export const isIos = () => /(?:iPhone)/.test(ua) && !isPad();
export const isWechat = () => /MicroMessenger/.test(ua);
export const isPc = () => {
  const agents = [
    "android",
    "iphone",
    "windows phone",
    "ipad",
    "ipod"
  ];
  
  let flag = true;
  const ua = navigator.userAgent.toLowerCase();
  for (let v = 0; v < agents.length; v++) {
    if (ua.indexOf(agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag
};
export const isLow = () => {
  if (isPc()) {
    return false;
  }
  return getAndroidVersion() <= 8 || getIOSVersion() <= 12;
};

// iPhone X、iPhone XS
export const isIPhoneX = () =>
  /iphone/gi.test(window.navigator.userAgent) && ih() >= 812;

export const hair = () => (dp > 1 ? 0.5 : 1);
export const line = () => (dp > 1 ? 0.65 : 1);

export function getAndroidVersion() {
  if (!isAndroid()) {
    return 999;
  }
  var theUa = ua.toLowerCase();
  var match = theUa.match(/android\s([0-9\.]*)/);
  const version = match ? match[1] : "0";

  return parseFloat(version);
}

export function getIOSVersion() {
  if (!isIos()) {
    return 999;
  }
  var theUa = ua.toLowerCase();
  var reg = /os [\d._]+/gi;
  var v_info = theUa.match(reg);
  const version = (v_info + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."); //得到版本号9.3.2或者9.0

  return parseFloat(version);
}

// 获取是否是 ios 或 android
export const isNativeIOS = () =>
  window.location.href.indexOf("_os_ios_") >= 0 || (window as any)._os_ios;
export const isNativeAndroid = () =>
  window.location.href.indexOf("_os_android_") >= 0 ||
  (window as any)._os_android;
export const isNative = () =>
  isNativeIOS() || isNativeAndroid() || (window as any).cordova || false;

export const safeTop = () => (isNative() ? (isIPhoneX() ? 43 : 20) : 0);

export const safeBottom = () => {
  if (isWechat() && isIos()) {
    return ih() >= 720 ? 25 : 0;
  }
  return isIPhoneX() ? 25 : 0;
};

const id = "__device-style-ele__";

// 根据设备设置高度
function setCSSValue() {
  const deviceStyle = `
    :root {
      --safe-top:${safeTop()}px; --safe-bottom:${safeBottom()}px; --hair:${hair()}px;--line:${line()}px; --iw:${iw()}px; --ih:${ih()}px;
    }
  `;

  const lastStyle = document.getElementById(id);
  if (lastStyle) {
    lastStyle.textContent = deviceStyle;
  } else {
    const styleEle = document.createElement("style");
    styleEle.textContent = deviceStyle;
    styleEle.id = id;
    document.head.append(styleEle);
  }
}

let resizeTimer = null as any;

window.addEventListener("resize", () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
    resizeTimer = null;
  }
  setTimeout(setCSSValue, 30);
});

setCSSValue();

export const setMobileCss = () => {
  if (isPc() || (window as any).__setMobileCss) {
    return;
  }

  (window as any).__setCanNotScale = true;
  // touch-action: manipulation; 启用平移和捏合缩放手势，但禁用其他非标准手势
  const nextCss = `
    * {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; 
      touch-action: manipulation;
    }
    .can-user-select, input, textarea {
      -moz-user-select:auto; -webkit-user-select:auto;-ms-user-select:auto; user-select:auto;
    }
  `;

  const styleEle = document.createElement("style");
  styleEle.textContent = nextCss;

  const mateEle = document.createElement("meta");
  mateEle.setAttribute("name", "viewport");
  mateEle.setAttribute(
    "content",
    "width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui, viewport-fit=cover"
  );

  document.head.append(styleEle, mateEle);

  /** 阻止双指放大; */
  document.addEventListener("gesturestart", function(event: any) {
    event.preventDefault();
  });
};

export const setKeyboardAutoHide = () => {
  if (isPc() || (window as any).__setKeyboardAutoHide) {
    return;
  }

  (window as any).__setKeyboardAutoHide = true;
  // 处理ios移动端键盘自动收起，并且回到页面滚动位置
  let bodyScrollTop = 0;
  let windowScrollTop = 0;
  let keyboardFocusInput: any;
  let keyboardTimer = null as any;
  const bindBlurKeyboard = (e: any) => {
    if (keyboardFocusInput && keyboardFocusInput.blur) {
      keyboardFocusInput.blur();
    }
  };
  document.body.addEventListener("focusin", (e: any) => {
    if (keyboardTimer) {
      clearTimeout(keyboardTimer);
      keyboardTimer = null;
    }
    // 软键盘弹起事件
    keyboardFocusInput = e.target;
    bodyScrollTop = document.body.scrollTop;
    windowScrollTop = window.scrollY;

    keyboardTimer = setTimeout(() => {
      document.body.addEventListener("touchend", bindBlurKeyboard);
    }, 60);
  });
  document.body.addEventListener("focusout", () => {
    // 软键盘关闭事件
    document.body.scrollTop = bodyScrollTop;
    window.scrollTo(0, windowScrollTop);
    keyboardFocusInput = false;
    document.body.removeEventListener("touchend", bindBlurKeyboard);
  });
};

export const setCanScrollByAttribute = (dataKey = "data-can-scroll") => {
  if (!(window as any).__setCanScrollByAttribute) {
    (window as any).__setCanScrollByAttribute = true;
    const setAttribute = (HTMLElement.prototype as any).setAttribute;
    HTMLElement.prototype.setAttribute = function(key: string, value: string) {
      if (key === dataKey && value) {
        setCanScroll(this);
      } else {
        setAttribute.call(this, key, value);
      }
    };
  }
};

export const setCanScroll = (view?: any) => {
  if (!(window as any).__setCanScroll) {
    (window as any).__setCanScroll = true;
    // 阻止默认的处理方式(阻止下拉滑动的效果)
    document.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault();
      },
      { passive: false }
    );

    const styleEle = document.createElement("style");
    styleEle.textContent = `
  div {
    -webkit-overflow-scrolling: touch;
  }
`;
    document.body.appendChild(styleEle);
  }

  if (!view) {
    return;
  }

  // 确保滚动区域在最顶部和最底部时，touch不会让body滚动
  if (!view.__mobile_scroll) {
    view.__mobile_scroll = true;

    view.addEventListener("touchstart", () => {
      // 计算高度是否可以滚动
      view.__can_scroll = view.scrollHeight > view.clientHeight;
      if (view.__can_scroll) {
        const scrollTop: number = view.scrollTop;

        if (scrollTop === 0) {
          view.scrollTop = 1;
        } else if (scrollTop + view.offsetHeight === view.scrollHeight) {
          view.scrollTop = view.scrollHeight - view.offsetHeight - 1;
        }
      }
    });

    // body整个阻止了滚动，此时整个页面都不能滚动，在需要滚动对象中拦截冒泡才可滚动
    view.addEventListener("touchmove", (e: Event) => {
      if (view.__can_scroll) {
        e.stopPropagation();
      } else {
        e.preventDefault();
      }
    });
  }
};
