const axios = require('axios');
const cheerio = require("cheerio");
const download = require("node-image-downloader")


const getHtml = async() => {
    try{
        const res = await axios({
            url: "https://finance.naver.com/item/main.nhn?code=005930",
            method: "GET",
        })
        return res;
    }
    catch(error){
        console.error(error)
    }
}

getHtml().then((html)=>{
    let ulList = [];
    const $ = cheerio.load(html.data);

    const today = $("em.no_up span")
    const img = $("div.chart img");
    const imagesrc = img.attr("src")

    console.log(today.text())

    download({
        imgs: [
            {
                uri:imagesrc
            }
        ],
        dest:'./downloads'
    }).then((info) => {
        console.log('Download Completed')
    })
})


