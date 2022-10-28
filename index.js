const express = require('express');
const app = express();
const port = 2288
const puppeteer = require('puppeteer');
app.get("/cotacaoFuturas", function (req, res) {
    (async () => {
        var aDados = []
        var value = 1
        var param = "tr.BdT:nth-child(" + value.toString() + ") > td:nth-child(3) > fin-streamer:nth-child(1)"
        var param2 = "tr.BdT:nth-child(" + value.toString() + ") > td:nth-child(1) > fin-streamer:nth-child(1)"
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://finance.yahoo.com/quote/KC%3DF/futures?p=KC%3DF')
        //const name = await page.$eval('tr.BdT:nth-child(10) > td:nth-child(3) > fin-streamer:nth-child(1)', el => el.innerText)
        while (value <= 14) {
            param = "tr.BdT:nth-child(" + value.toString() + ") > td:nth-child(3) > fin-streamer:nth-child(1)"
            param2 = "tr.BdT:nth-child(" + value.toString() + ") > td:nth-child(1) > a:nth-child(1)"
            aDados.push({fix: await page.$eval(param2, el => el.innerText),valor:await page.$eval(param, el => el.innerText)})
            value++
        }
        await browser.close()
        res.json(aDados)
    })()
})
app.listen(port, function () {
    console.log("Servidor rodando...")
})
