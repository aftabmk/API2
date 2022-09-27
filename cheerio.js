const pup = require('puppeteer-extra')
const ex = require("express");
const cheerio = require("cheerio")
const stealth = require('puppeteer-extra-plugin-stealth')

pup.use(stealth())

const url = 'https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%2050'

// scrape()
async function scrape() {
    try {
        const browser = await pup.launch()
        const page = await browser.newPage()

        await page.goto(url)
        await page.waitForTimeout(500)

        let pageData = await page.evaluate(() => (document.documentElement.innerHTML))
        const $ = cheerio.load(pageData)

        await browser.close()
        const data = []
        const headers =[]
        // const headers = ['SYMBOL', 'OPEN', 'HIGH', 'LOW', 'PREV', 'CLOSE', 'LTP', 'CHNG', '%CHNG', 'VOLUME', 'VALUE', "52W H", '52W L']
        const getHeader = $('#equityStockTable > thead > tr > th').each((index, element) => 
        {
            const getHead = $(element).text()
            headers.push(getHead)
        })
        const table = $('#equityStockTable > tbody > tr').each((index, element) => {
        const val ={}
        const row = $(element)
            row.find('td').each((i, e) => {
                const col = $(e)
                const header = headers[i]
                val[header] = col.text()
            })
            data.push(val)
        })
        // console.log(data)
        return data
    }

    catch (e) { console.log(e) }
}

const app = ex()

const port = process.env.PORT || 5000;
const path = 'nifty'

app.get(`/${path}`, async (req, res) => {

	try {

		const api = await scrape();

		return res.status(200).json(api)
	}
	catch (err) {
		return res.status(500).json({
			err: err.toString(),
		})
	}
})

app.listen(port, () => {
	console.log(`running on port http://localhost:5000/${path}`)

})