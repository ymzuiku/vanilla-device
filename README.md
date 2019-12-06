# vanilla-device

- Get mobile device detail
  The introduction of mobile-touch, if the device is a mobile device, can make the whole page scroll closer to native and support Typescript

## Install

unpkg:

```html
<script src="https://unpkg.com/vanilla-device@1.0.7/umd/index.js"></script>
```

npm:

```sh
$ npm install --save vanilla-device
```

## Feature

### 1. Get Device details:

```js
import "vanilla-device";

console.log(vanillaDevice.isPc());
console.log(vanillaDevice.isIPhoneX());
console.log(vanillaDevice.safeTop());
```

### 2. Safe CSS:

1. import package

```js
import vanillaDevice from "vanilla-device";
```

2. use css value

```css
.page {
  padding-top: var(--safe-top);
  padding-bottom: var(--safe-bottom);
}
```

3. If your use CSS-IN-JS

```js
import vanillaDevice from "vanilla-device";

const safeTop = vanillaDevice.safeTop(); 

<div style="{{ paddingTop:safeTop }} />
```

### 3. Touch:

1. Double-clicking the screen will not scale
2. Finger kneading won't zoom in on the screen

```js
import vanillaDevice from "vanilla-device";

vanillaDevice.setCanNotScalePage();
```

### 4. Scroll like native:

1. When the scroll area receives the scroll gesture, it can respond quickly and solve the problem of no response when switching overflow
2. Block all scrolling. Scrolling will not show the background of the browser

```js
import vanillaDevice from "vanilla-device";

const view = document.getElementById("the-need-scroll-element");
vanillaDevice.setFocusTouchScroll(view);
```

### 5. Keyboard:

1. When the iOS keyboard appears, click the blank area to automatically close the keyboard
2. Automatically adjust the scroll area when the iOS keyboard appears

```js
import vanillaDevice from "vanilla-device";

vanillaDevice.setKeyboardAutoScrollBack();
```
