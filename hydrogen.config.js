import { defineConfig } from "@shopify/hydrogen/config"

export default defineConfig({
  shopify: {
    storeDomain: "hydrogen-preview.myshopify.com",
    storefrontToken: "3b580e70970c4528da70c98e097c2fa0",
    storefrontApiVersion: "2022-07",
  },
  logger: {
    /* Overrides the default `log.trace` behavior. */
    // trace: (request, ...args) => console.log(request.url, ...args),
    /* Overrides the default `log.error` behavior. */
    // error: async (request, error) => {
    //   console.error(error)
    //   // Methods can return promises. Hydrogen won't block the current
    //   // request but it will wait for the promises to be returned before the runtime instance ends.
    //   await myErrorTrackingService.send(request, error)
    // },
    /* ... */

    // /* Logs the cache status of each stored entry: `PUT`, `HIT`, `MISS` or `STALE`. */
    showCacheApiStatus: true,
    /* Logs the cache control headers of the main document and its sub queries. */
    showCacheControlHeader: true,
    /*
      记录请求、解析和呈现查询的时间轴。
      这是一个实验性的特性。因此，功能容易发生变化。
    */
    showQueryTiming: true,
    /* 
       如果你从Storefront API中过度获取数据，在应用程序中记录警告。
       这是一个实验性的特性。因此，功能容易发生变化。
    */
    // showUnusedQueryProperties: true,
  },
})
