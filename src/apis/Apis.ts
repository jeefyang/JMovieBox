type JResquestPost<R = string> = {
    type: "POST",
    body: Object,
    reutrnData: R,
    url: string
}

type JResquestGet<R = string> = {
    type: "GET",
    body: Record<string, string>,
    reutrnData: R,
    url: string
}

type JResquest<R = string> = JResquestPost<R> | JResquestGet<R>

export const Jfetch = async <R = string>(res: JResquest<R>) => {
    if (res.type == "GET") {
        const queryString = new URLSearchParams({
            ...res.body
        }).toString()
    }
}

