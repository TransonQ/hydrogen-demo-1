# hydrogen

[toc]

## 创建项目

### 第一步

```bash
npm init @shopify/hydrogen -- --template hello-world
```

根据提示完成创建项目文件夹

### 第二步

```
npm run dev
```

打开 `http://localhost:3000/` ( 如果 3000 端口被占用, 端口号将会在 3000 的基础上依次递增 )

### 第三步

了解一下项目文件结构

```
├── public
    └── .gitkeep // Allows Git to recognize an empty directory
├── src
    └── assets
    │   └── favicon.svg
    ├── routes
    │   ├── index.server.jsx  // 首页的服务端组件 `sever component`
    ├── App.server.jsx  // 应用根组件
    ├── index.css
├── hydrogen.config.js  // Hydroge配置文件
├── index.html   // html 模板
├── jsconfig.json
├── package.json
├── README.md
├── vite.config.js  // 基于 vite 的项目
```

### 第四步

尝试在`Home`组件更改一下文案,体验一下 vite 基于 ESM 的热更新

### 添加 tailwindcss

```
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer
```

```
npx tailwindcss init -p
```

`tailwind.config.js`

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
```

`/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<b>重启服务</b>

## 请求数据

1. [将您的 Hydrogen 应用连接到店面并使用 Storefront API 获取数据](https://shopify.dev/api/storefront)
2. GraphQL [Shopify Storefront API GraphiQL explorer.](https://shopify.dev/custom-storefronts/tools/graphiql-storefront-api)
3. [useShopQuery](https://shopify.dev/api/hydrogen/hooks/global/useshopquery)
4. [关于 Suspense](https://reactjs.org/docs/react-api.html#reactsuspense)
5. [更多 react 服务端组件和并发特性 (React Conf 2021 ) ](https://reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)

<strong>踩坑...</strong>

- [Hydrogen Framework Error: Something's Wrong Here...](https://community.shopify.com/c/shopify-discussions/hydrogen-framework-error-something-s-wrong-here/m-p/1700374#M309077)
- [issue-2090](https://github.com/Shopify/hydrogen/issues/2090)
