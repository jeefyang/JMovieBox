import { default as Database } from "better-sqlite3"

export class JDB {
    // 数据库核心
    db: InstanceType<typeof Database>
    tableList={
        
    }
    constructor(public url: string) {
        this.db = new Database(url)
    }
    /** 初始化 */
    init() {
        this.db.prepare("CREAT")
    }

    /** 创建表 */
    createTable(name:string){
        this.db.prepare(`CREATE TABEL users(id)`)
    }





}