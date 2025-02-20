import { Sequelize, Model } from "sequelize-typescript"
// import type { WhereOptions } from "sequelize-typescript"

import { PathList } from "./models/pathList"
import type { WhereOptions } from "sequelize"


class User extends Model {
    declare id: number
}


export class JDB {
    sequelize: Sequelize = <any>null

    constructor(public url: string) {
        this.init
    }

    async init() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: this.url,
            models: [__dirname + '/models']
        })

        const list = await PathList.findAll()
        list[0].overPath
        PathList.findAll({ where: Sequelize.and(<WhereOptions<PathList>>{ overPath: "123" }), raw: true })

    }
}