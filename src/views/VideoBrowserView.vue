<script setup lang="ts">
import { ref } from "vue";
import { NAutoComplete, NFlex, NAffix, NButton } from "naive-ui";

const searchKey = ref("");
const rememberList = ref<string[]>([]);
</script>

<template>
    <div class="parent">
        <n-affix :top="10">
            <n-flex :wrap="false">
                <n-auto-complete
                    v-model:value="searchKey"
                    :input-props="{
                        autocomplete: 'disabled'
                    }"
                    :options="rememberList"
                    placeholder="搜索关键字"
                    clearable
                />
                <n-button type="info"> 搜索 </n-button>
            </n-flex>
        </n-affix>
    </div>
</template>

<style lang="scss" scoped>
.parent {
    height: 100%;
    overflow: auto;
}
</style>
