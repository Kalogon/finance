const axios = require('axios');
const cheerio = require("cheerio");
const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const route = require("./routes");
const setUpPassport = require("./setuppassport");

const urls = ["https://finance.naver.com/item/sise.nhn?code=005930",
            "https://finance.naver.com/item/sise.nhn?code=035720",
            "https://finance.naver.com/item/sise.nhn?code=028300",
            "https://finance.naver.com/item/sise.nhn?code=006400",
            "https://finance.naver.com/item/sise.nhn?code=008350",
            "https://finance.naver.com/item/sise.nhn?code=000660",
            "https://finance.naver.com/item/sise.nhn?code=068270",
            "https://finance.naver.com/item/sise.nhn?code=052670",
            "https://finance.naver.com/item/sise.nhn?code=035420",
            "https://finance.naver.com/item/sise.nhn?code=033250",
            "https://finance.naver.com/item/sise.nhn?code=051910",
            "https://finance.naver.com/item/sise.nhn?code=082270",
            "https://finance.naver.com/item/sise.nhn?code=034220",
            "https://finance.naver.com/item/sise.nhn?code=017670",
            "https://finance.naver.com/item/sise.nhn?code=268600",
            "https://finance.naver.com/item/sise.nhn?code=215600",
            "https://finance.naver.com/item/sise.nhn?code=196170",
            "https://finance.naver.com/item/sise.nhn?code=086060",
            "https://finance.naver.com/item/sise.nhn?code=066570",
            "https://finance.naver.com/item/sise.nhn?code=061970",
            "https://finance.naver.com/item/sise.nhn?code=047310",
            "https://finance.naver.com/item/sise.nhn?code=036570",
            "https://finance.naver.com/item/sise.nhn?code=033780",
            "https://finance.naver.com/item/sise.nhn?code=009150",
            "https://finance.naver.com/item/sise.nhn?code=319660",
            "https://finance.naver.com/item/sise.nhn?code=192650",
            "https://finance.naver.com/item/sise.nhn?code=131970",
            "https://finance.naver.com/item/sise.nhn?code=097520",
            "https://finance.naver.com/item/sise.nhn?code=092130",
            "https://finance.naver.com/item/sise.nhn?code=089010"]

let finance = []
let temp


const getHtml = async(url_c) => {
    try{
        const res = await axios({
            url: url_c,
            method: "GET",
            encoding: "utf-8"
        })
        return res;
    }
    catch(error){
        console.error(error)
    }
}

const parsing = async() => {

    for(let j = 0;j<urls.length;j++){

        await getHtml(urls[j]).then((html)=>{
    
            const $ = cheerio.load(html.data);
            const table = $("table.type_tax").children("tbody");
            temp = []
            let data1
            let data1_sub
            let data2
            let data2_sub
            for(let k = 0;k<table.children().length;k++){
                switch(k){
                    case 0:
                        temp.push(table.children().eq(k).find("strong.tah").text())
                        temp.push(table.children().eq(k).find("span.tah").text())
                        break;
                    case 1:
                    case 2:
                        data1 = table.children().eq(k).find("strong span.tah").text()
                        data1_sub =  data1.substring(5,data1.length-5)
                        temp.push(data1_sub)
                        data2 = table.children().eq(k).find("span.tah").not("strong").text()
                        data2_sub = data2.substring(data1.length,)
                        temp.push(data2_sub)
                        break;
                    case 4:
                        // data1 = table.children().eq(k).find("#_amount").text()
                        // data1_sub =  data1.substring(18,data1.length-22)
                        // temp.push(data1_sub)
                        data2 = table.children().eq(k).find("#_high").text()
                        data2_sub = data2.substring(data1.length,)
                        temp.push(data2)
                        break;
                    case 5:
                        for(let i=0;i<table.children().eq(k).children().length;i++){
                            if(i===1){
                                data1 = table.children().eq(k).children().eq(i).text()
                                data1_sub = data1.substring(12,data1.length-19)
                                temp.push(data1_sub)
                            }
                            if(i===3)
                                temp.push(table.children().eq(k).children().eq(i).text())
                        }
                        break;
                    case 6:
                        break;
                    case 9:
                        data1 = table.children().eq(k).find("#_sise_per").text()
                        data1_sub =  data1.substring(17,data1.length-10)
                        temp.push(data1_sub)
                        data2 = table.children().eq(k).find("#_sise_eps").text()
                        data2_sub = data2.substring(17,data2.length-10)
                        temp.push(data2_sub)
                        break;
                    case 11:
                    case 12:
                        break;
                    default:
                        for(let i=0;i<table.children().eq(k).children().length;i++){
                            if((i===1) || (i===3))
                                temp.push(table.children().eq(k).children().eq(i).text())
                        }
                        break;
    
                }
            }
            finance.push(temp)
        });
    
    
    }
    
    return finance;
}

parsing().then((f)=>{
    console.log("real")
    console.log(f)
})


const app = express();
mongoose.connect("mongodb://localhost:27017/finance",{useMongoClient: true});
setUpPassport();
app.set("views",path.join(__dirname,"views"));
 
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret:"TKRvOIJs=HyqrvagQ#&!f!%V]Ww/4KiVs$s,<<MX",
  resave:true,
  saveUninitialized:true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.listen(80,function(){
  console.log("Server running at port 80");
});
