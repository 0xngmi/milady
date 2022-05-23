const axios = require("axios")
const {writeFileSync} = require("fs")

const BASE_API = 'https://freespeechextremist.com/api/v1/accounts/9giNbFxBKUl44Tszzc'
// 'https://letsalllovela.in/api/v1/accounts/27115'
// 'https://social.darkpeak.org/api/v1/accounts/4806'
// 'https://shitposter.club/api/v1/accounts/90679'

async function main(){
    let posts = []
    let newPosts = (await axios.get(`${BASE_API}/statuses?with_muted=true&limit=20`)).data;
    do{
        console.log(posts.length)
        posts = posts.concat(newPosts)
        writeFileSync("posts.json", JSON.stringify(posts))
        newPosts = (await axios.get(`${BASE_API}/statuses?max_id=${newPosts[newPosts.length-1].id}&with_muted=true&limit=20`)).data;
    } while(newPosts.length > 0)
    writeFileSync("freespeechextremist.json", JSON.stringify(posts))
}
main()