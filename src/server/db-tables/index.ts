export enum keyEnum {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    INTEGER = 'INTEGER',
    REAL = "REAL",
    TEXT = 'TEXT',
    BLOB = "BLOB"
}

export type KeyType = keyof typeof keyEnum

export type DataDescType = {
    name: string
    model: Record<string, KeyType>
}

export type DBType<T extends Record<string, KeyType>> = { id?: number } & { [x in keyof T]: T[x] extends keyEnum.string ? string :
    T[x] extends keyEnum.number ? number :
    T[x] extends keyEnum.boolean ? boolean :
    T[x] extends keyEnum.INTEGER ? number :
    T[x] extends keyEnum.REAL ? number :
    T[x] extends keyEnum.TEXT ? string :
    T[x] extends keyEnum.BLOB ? Blob :
    unknown
}

