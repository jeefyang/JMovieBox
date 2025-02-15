import { keyEnum } from ".";

export const historyListModel = {
    /** 基础路径 */
    basePath: keyEnum.TEXT,
    /** 文件路径 */
    filePath: keyEnum.TEXT,
    /** 观赏次数 */
    viewCount: keyEnum.INTEGER,
    /** 上次观赏时间 */
    lastViewTime: keyEnum.INTEGER,
    /** 首次观赏时间 */
    firstViewTime:keyEnum.INTEGER,
    /** 标签 */
    tagList: keyEnum.TEXT,
    /** 分数 */
    score: keyEnum.REAL,
    /** 自我分数 */
    myScore: keyEnum.REAL,
    /** 关键人物 */
    targetPersonList: keyEnum.TEXT
}