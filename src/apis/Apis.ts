import { shuntFn } from "./ApisUtil";

export const Apis = {
    /** 测试数据 */
    test: shuntFn<{
        /** 前置数据 */
        a: string,
        /** 后置数据 */
        b: string
    }, { status: number, text: string }>("POST", '/test')
}

