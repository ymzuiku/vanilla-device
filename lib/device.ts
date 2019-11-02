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
export const isTablet = () =>
  /(?:iPad|PlayBook)/.test(ua) || (isAndroid() && !/(?:Mobile)/.test(ua)) || (isFireFox() && /(?:Tablet)/.test(ua));
export const isIos = () => /(?:iPhone)/.test(ua) && !isTablet();
export const isWechat = () => /MicroMessenger/.test(ua);
export const isPc = () => !isIos() && !isAndroid();
export const isLow = () => false;

// iPhone X、iPhone XS
export const isIPhoneX = () =>
  /iphone/gi.test(window.navigator.userAgent) && dp && dp === 3 && iw() === 375 && ih() === 812;

// iPhone XS Max
export const isIPhoneXMax = () =>
  /iphone/gi.test(window.navigator.userAgent) && dp && dp === 3 && iw() === 414 && ih() === 896;

export const hair = () => (dp > 1 ? 0.5 : 1);
export const line = () => (dp > 1 ? 0.65 : 1);

export const isNeedIPhoneSafe = () => isIPhoneX() || isIPhoneXMax();

// 获取是否是 ios 或 android
export const isNativeIOS = () => window.location.href.indexOf('_os_ios_') >= 0;
export const isNativeAndroid = () => window.location.href.indexOf('_os_android_') >= 0;
export const isNative = () => isNativeIOS() || isNativeAndroid() || (window as any).cordova || false;

export const safeTop = () => (isNative() ? (isNeedIPhoneSafe() ? 43 : 20) : 0);

export const safeBottom = () => (isNative() || isWechat() ? (isNeedIPhoneSafe() ? 25 : 0) : 0);

const id = '__device-style-ele__';

// 根据设备设置高度
function setCSSValue() {
  const deviceStyle = `
    :root {
      --safe-top:${safeTop()}px; --safe-bottom:${safeBottom()}px; --hair:${hair()}px;--line:${line()}px; --iw:${iw()}px; --ih:${ih()}px;
    }
    body {height:${ih()}px;}
  `;

  const lastStyle = document.getElementById(id);
  if (lastStyle) {
    lastStyle.textContent = deviceStyle;
  } else {
    const styleEle = document.createElement('style');
    styleEle.textContent = deviceStyle;
    styleEle.id = id;
    document.head.append(styleEle);
  }
}

let resizeTimer = null as any;

window.addEventListener('resize', () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
    resizeTimer = null;
  }
  setTimeout(setCSSValue, 30);
});

setCSSValue();

export const setCanNotScalePage = () => {
  if (isPc() || (window as any).__setCanNotScale) {
    return;
  }

  (window as any).__setCanNotScale = true;
  // touch-action: manipulation; 启用平移和捏合缩放手势，但禁用其他非标准手势
  const nextCss = `
    * {
      -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; 
      touch-action: manipulation;
    }
    .can-user-select, input, textarea {
      -moz-user-select:auto; -webkit-user-select:auto;-ms-user-select:auto; user-select:auto;
    }
  `;

  const styleEle = document.createElement('style');
  styleEle.textContent = nextCss;

  const mateEle = document.createElement('meta');
  mateEle.setAttribute('name', 'viewport');
  mateEle.setAttribute(
    'content',
    'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui, viewport-fit=cover',
  );

  document.head.append(styleEle, mateEle);

  /** 阻止双指放大; */
  document.addEventListener('gesturestart', function(event: any) {
    event.preventDefault();
  });
};

export const setKeyboardAutoScrollBack = () => {
  if (isPc() || (window as any).__setKeyboardAutoScrollBack) {
    return;
  }

  (window as any).__setKeyboardAutoScrollBack = true;
  // 处理ios移动端键盘自动收起，并且回到页面滚动位置
  let bodyScrollTop = 0;
  let keyboardFocusInput: any;
  const bindBlurKeyboard = () => {
    if (keyboardFocusInput && keyboardFocusInput.blur) {
      keyboardFocusInput.blur();
    }
  };
  document.body.addEventListener('focusin', (e: any) => {
    // 软键盘弹起事件
    keyboardFocusInput = e.target;
    bodyScrollTop = document.body.scrollTop;
    setTimeout(() => {
      document.body.addEventListener('touchend', bindBlurKeyboard);
    }, 50);
  });
  document.body.addEventListener('focusout', () => {
    // 软键盘关闭事件
    document.body.scrollTop = bodyScrollTop;
    keyboardFocusInput = false;
    document.body.removeEventListener('touchend', bindBlurKeyboard);
  });
};

export const setFocusTouchScroll = (view?: any) => {
  if (isPc() && !(window as any).__setBodyCanNotTouchScroll) {
    // 阻止默认的处理方式(阻止下拉滑动的效果)
    document.addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault();
      },
      { passive: false },
    );
    return;
  }
  (window as any).__setBodyCanNotTouchScroll = true;

  if (!view) {
    return;
  }

  // 确保滚动区域在最顶部和最底部时，touch不会让body滚动
  if (!view.__mobile_scroll) {
    view.__mobile_scroll = true;

    view.addEventListener('touchstart', () => {
      // 计算高度是否可以滚动
      view.__can_scroll = view.scrollHeight > view.clientHeight;

      if (view.__can_scroll) {
        const scrollTop = view.scrollTop;

        if (scrollTop === 0) {
          view.scrollTop = 1;
        } else if ((scrollTop as number) + (view.offsetHeight as number) === view.scrollHeight) {
          view.scrollTop = view.scrollHeight - view.offsetHeight - 1;
        }
      }
    });

    // body整个阻止了滚动，此时整个页面都不能滚动，在需要滚动对象中拦截冒泡才可滚动
    view.addEventListener('touchmove', (e: Event) => {
      if (view.__can_scroll) {
        e.stopPropagation();
      } else {
        e.preventDefault();
      }
    });
  }
};

const media = {
  '@media-sm': `@media (min-width: 640px)`,
  '@media-md': '@media (min-width: 768px)',
  '@media-lg': '@media (min-width: 1024px)',
  '@media-xl': '@media (min-width: 1280px)',
  '@media-pc': `@media (min-width: ${isPc() ? '0px' : '9999px'})`,
  '@media-ios': `@media (min-width: ${isIos() ? '0px' : '9999px'})`,
  '@media-android': `@media (min-width: ${isAndroid() ? '0px' : '9999px'})`,
  '@media-wechat': `@media (min-width: ${isWechat() ? '0px' : '9999px'})`,
};

export const replaceCSSMedia = (css: string) => {
  if (/@media-/.test(css)) {
    Object.keys(media).forEach(k => {
      css = css.replace(k, (media as any)[k]);
    });
  }
  return css;
};
