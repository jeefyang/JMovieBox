import type { Express } from "express"


export const shuntFn = <B, R>(type: "POST" | 'GET', url: string) => {
    return {
        fetch: async (data?: B): Promise<R> => {
            return new Promise(async (resolve, reject) => {
                if (type == "GET") {
                    const queryString = data ? new URLSearchParams({
                        ...data
                    }).toString() : ""
                    fetch(`${url}${queryString ? ('?' + queryString) : ''}`)
                        .then(response => response.json())
                        .then(data => resolve(data))
                        .catch(error => reject(error))
                }
                else if (type == "POST") {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    if (!res.ok) {
                        reject(`HTTP error! status: ${res.status}`)
                        return
                    }
                    const j = await res.json()
                    resolve(j)
                }
            })
        },
        use: async (app: Express,
            cb: (
                req: Parameters<Parameters<Express['get' | 'post']>[1]>[0],
                res: Parameters<Parameters<Express['get' | 'post']>[1]>[1],
                data: B
            ) => Promise<R | null | void> | (R | null | void),
            returnCB?: (req: Parameters<Parameters<Express['get' | 'post']>[1]>[0],
                res: Parameters<Parameters<Express['get' | 'post']>[1]>[1],
                data: R | null | void) => Promise<void> | void
        ) => {

            if (type == "GET") {
                app.get(url, async (req, res, next) => {
                    try {
                        const data = await cb(req, res, <any>req.query)
                        returnCB && await returnCB(req, res, data)
                        next()
                    }
                    catch (err) {
                        next(err)
                    }

                })
            }
            else if (type == "POST") {
                app.post(url, async (req, res, next) => {
                    try {
                        const data = await cb(req, res, req.body)
                        returnCB && await returnCB(req, res, data)
                        next()
                    }
                    catch (err) {
                        next(err)
                    }

                })
            }
        }
    }
}


