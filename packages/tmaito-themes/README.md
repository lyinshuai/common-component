### 变量列表

```style

/* Font */
@font-size-sm: 12px * @hd;
@font-size-base: 14px * @hd;
@font-size-l: 16px * @hd;
@font-size-lg: 18px * @hd;
@font-size-xl: 24px * @hd;
@font-size-xxl: 32px * @hd;
@font-size-xxxl: 48px * @hd;
@font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular, "Hiragino Sans GB",
  "Microsoft Yahei", "Noto Sans", sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

// Color
@info-color: #00aafb;
@error-color: #ff2233;
@primary-color: #006cd2;
@success-color: #14c437;
@warning-color: #ff8607;

// Text Color
@text-color-0: #000;
@text-color-3: #333;
@text-color-6: #666;
@text-color-9: #999;
@text-color-c: #ccc;
@text-color-f: #fff;

// Link Color
@link-color: #006cd2;
@link-hover-color: #0060bc;
@link-active-color: #0060bc;

// Icon Color
@icon-color: #ccc;
@icon-active-color: @link-active-color;

// Border Color
@border-color: #f0f0f0;
@border-color-extra: #e5f7ff;

// Background Color
@bg-base: #f8f9fd;
@bg-white: #fff;
@bg-1: #fafafa;
@bg-extra: #e5effc;
@bg-primary: @primary-color;

```

### mixins 列表

```less
/*
 * 溢出(...)省略展示
 * @rowCount 须展示行数
 */
.ellipsis(@rowCount);

/*
 * 横线
 * @dir 方向
 * @style 样式
 * @width 宽度
 * @color 颜色
 */
.border(@dir: bottom, @style: solid, @width: 1px, @color: @color-border)
```

### common 公用样式

可直接使用

```html
<!-- 居中 -->
<div className="align-center">XXXX</div>
<!-- 居右 -->
<div className="align-right">XXXX</div>
<!-- 数字 -->
<div className="num">XXXX</div>
<!-- 链接 -->
<div className="link">XXXX</div>
<!-- 禁止操作 -->
<div className="not-allowed">XXXX</div>
```
