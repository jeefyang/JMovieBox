<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, ref } from "vue";
import { NFlex, NConfigProvider, darkTheme } from "naive-ui";
import { BrowserChrome, History, Config } from "@icon-park/vue-next";

const testData = ref("");
onMounted(async () => {
    testData.value = await fetch("/test").then((r) => r.text());
});
</script>

<template>
    <n-config-provider :theme="darkTheme">
        <div class="parant">
            <n-flex vertical style="height: 100%">
                <div class="box">
                    <RouterView />
                </div>
                <nav class="bottom">
                    <RouterLink to="/" class="router">
                        <div>
                            <browser-chrome theme="outline" size="24" />
                            <div>浏览</div>
                        </div>
                    </RouterLink>
                    <RouterLink to="/history" class="router">
                        <div>
                            <history theme="outline" size="24" />
                            <div>历史</div>
                        </div>
                    </RouterLink>
                    <RouterLink to="/config" class="router">
                        <div>
                            <config theme="outline" size="24" />
                            <div>设置</div>
                        </div>
                    </RouterLink>
                </nav>
            </n-flex>
        </div>
    </n-config-provider>
</template>

<style lang="scss" scoped>
.parant {
    width: 100%;
    height: calc(100vh - 4rem);
    .box {
        // background: #ff0;
        flex: 1;
        height: 0;
        width: 100%;
    }
    .bottom {
        margin-bottom: env(safe-area-inset-bottom);
        display: flex; 
        justify-content: space-around;

        .router {
            flex: 1;
            div {
                text-align: center;
            }
        }
    }
}
</style>
