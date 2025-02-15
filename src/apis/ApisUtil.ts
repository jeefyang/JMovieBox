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
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                reject(`HTTP error! status: ${response.status}`)
                                return
                            }
                            return response.json()
                        })
                        .then(data => resolve(data))
                        .catch(error => reject(error))
                }
            })
        },
        use: async (app: Express,
            cb: (
                req: Parameters<Parameters<Express['get' | 'post']>[1]>[0],
                res: Parameters<Parameters<Express['get' | 'post']>[1]>[1],
                data: B
            ) => Promise<R | null | void> | (R | null | void),
            sendCB?: (req: Parameters<Parameters<Express['get' | 'post']>[1]>[0],
                res: Parameters<Parameters<Express['get' | 'post']>[1]>[1],
                data: R | null | void) => Promise<void> | void
        ) => {

            if (type == "GET") {
                app.get(url, async (req, res, next) => {
                    try {
                        const data = await cb(req, res, <any>req.query)
                        if (sendCB) {
                            await sendCB(req, res, data)
                        }
                        else {
                            data && res.send(data)
                        }
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
                        if (sendCB) {
                            await sendCB(req, res, data)
                        }
                        else {
                            data && res.send(data)
                        }
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


