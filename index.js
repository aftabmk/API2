const ax = require("axios");
const ex = require("express");
const cors = require('cors')

const url = 'https://kf8gy9csr0.execute-api.ap-south-1.amazonaws.com/webapi/index/nifty50Stock/'

const path = 'nifty50'

async function f()

{
	try{
		const req = await ax.get(url);
		const data = req.data.resultData
		const val = data.trim
		return data
		// console.log(data)
	}
	catch(e)
	{
		console.log(e)
	}

}

//EXPRESS APP

const app = ex()
app.use(cors())

const port = process.env.PORT || 5000;

app.get(`/${path}`, async (req, res) => {

	try {

		const api = await f();

		return res.status(200).send(api)
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
