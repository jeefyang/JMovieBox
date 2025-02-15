import { default as Database } from "better-sqlite3"
import { array, object, z } from "zod"
import { testModel } from "./db-tables/test"
import { type DataDescType, type DBType, type KeyType, keyEnum } from "./db-tables/index"

export class JDBTable<D extends Record<string, KeyType>, B extends DBType<D>> {
    constructor(public name: string, public model: D, public db: InstanceType<typeof Database>) {
        this.create()
    }

    /** 创建表 */
    create() {
        let str = ""
        for (let key in this.model) {
            str += `, ${key} ${this.getDataType(this.model[key])}`
        }
        this.db.prepare(`'CREATE TABLE ${this.name} (id INTEGER PRIMARY KEY${str})`).run()
    }

    /** 查找全部数据 */
    findAll(keys?: (keyof D)[]): B[] {
        const stmt = this.db.prepare((!keys || keys.length == 0) ? `SELECT * FROM ${this.name}` : `SELECT ${keys.join()} FROM ${this.name}`)
        return <any[]>stmt.all()
    }

    /** 关键字查找 */
    find(data: Partial<B>): B[] {
        const stmt = this.db.prepare(`SELECT * FROM ${this.name} WHERE ${Object.keys(data).map(k => `${k} = ?`).join(" AND ")}`)
        return <any[]>stmt.all(...Object.values(data))
    }

    /** 删除 */
    delete(data: Partial<B>) {
        const stmt = this.db.prepare(`DELECT FROM ${this.name} WHERE ${Object.keys(data).map(k => `${k} = ?`).join(" AND ")}`)
        return stmt.run(...Object.values(data))
    }

    /** 修改 */
    update(newData: Partial<B>, findData?: Partial<B>) {
        let findStr = ""
        if (findData) {
            findStr = `${Object.keys(findData).map(k => `${k} = ?`).join(" AND ")}`
        }
        const stmt = this.db.prepare(`UPDATE ${this.name} SET ${Object.keys(newData).map(k => `${k} = ?`).join(', ')} ${findStr ? "WHERE " + findStr : ''}}`)
        return stmt.run(...Object.values(newData), ...(findData ? Object.values(findData) : []))
    }


    /** 插入 */
    insert(data: B | B[]) {
        Object.keys(this.model)
        const insert = this.db.prepare(`INSERT INFO ${this.name} (${Object.keys(this.model).join(", ")}) VALUES(${Object.keys(this.model).map(k => `@${k}`).join(", ")})`)
        if (Array.isArray(data)) {
            const insertMany = this.db.transaction((ds) => {
                for (const d of ds) insert.run(d);
            });
            insertMany(data)
        }
        else {
            insert.run(data)
        }
    }

    /** 获取数据类型 */
    getDataType(data: KeyType) {
        if (data == keyEnum.BLOB) {
            return "BLOB"
        }
        else if (data == keyEnum.INTEGER) {
            return "INTEGER"
        }
        else if (data == keyEnum.REAL) {
            return "REAL"
        }
        else if (data == keyEnum.TEXT) {
            return "TEXT"
        } else if (data == keyEnum.string) {
            return "TEXT"
        } else if (data == keyEnum.number) {
            return "REAL"
        } else if (data == keyEnum.boolean) {
            return "INTEGER"
        }
    }
}
