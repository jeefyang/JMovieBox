import { keyEnum } from ".";

export const pathListModel = {
    /** 基础路径 */
    path: keyEnum.string,
    /** 替换路径,满足影子服务器 */
    overPath: keyEnum.string
}