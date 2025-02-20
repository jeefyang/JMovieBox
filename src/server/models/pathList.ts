// import { Model, DataTypes } from "sequelize"
import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table({
    tableName: 'pathList'
})
export class PathList extends Model<PathList> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number = 1;

    /** 基础路径 */
    @Column({ type: DataType.TEXT, comment: "基础路径" })
    path: string = ""
    /** 影子路径,用于覆盖 */
    @Column({ type: DataType.TEXT, comment: "影子路径,用于覆盖" })
    overPath: string = ""
}