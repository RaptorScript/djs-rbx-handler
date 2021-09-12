const axios = require('axios')
const cookie = process.env.ROBLOX
const session = axios.create({ headers: { '.ROBLOSECURITY': cookie } })
module.exports = function (method, url) {
    return new Promise(async (resolve, reject) => {
        await session.request({ url, method })
            .then((response) => {
                console.log('Method With token')
                resolve(response)
            })
            .catch(async (reason) => {
                if (reason.response.status === 403) {
                    console.log('Method Without token')
                    session.defaults.headers["x-csrf-token"] = reason.response.headers["x-csrf-token"]
                    const reason2 = await session.request({ method, url })
                    resolve(reason2)
                } else {
                    reject(reason)
                }
            })
    })

}
