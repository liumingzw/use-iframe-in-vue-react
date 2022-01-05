<template>
  <div>
    <div :style="{ backgroundColor: '#4169E1', marginBottom: '10px' }">
      <h2>This is vue component</h2>
      <button @click="sendMsgVueToIframe">发送信息: vue => iframe</button>
    </div>
    <iframe :src="src" ref="iframe" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "./iframe.html",
      iframeWin: null,
    };
  },
  methods: {
    sendMsgVueToIframe() {
      // postMessage: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
      const msg = {
        from: "vue",
        params: {
          p1: "来自 vue 的 msg",
        },
      };
      const targetOrigin = "*";
      this.iframeWin.postMessage(msg, targetOrigin);
    },
  },
  mounted() {
    this.iframeWin = this.$refs.iframe.contentWindow;
    window.addEventListener("message", (event) => {
      const { from, params } = event.data;
      if (from === "iframe") {
        // 业务代码
        console.log("vue 收到 msg", params);
      }
    });
  },
};
</script>