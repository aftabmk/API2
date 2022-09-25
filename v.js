const ax = require("axios");
const ex = require("express");
const url= 'https://www.nseindia.com/'
const nft= 'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050'
const path = 'v1'

const hh = {"headers": {"accept": "*/*","accept-language": "en-US,en;q=0.9","sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-origin","sec-gpc": "1","Referrer-Policy": "strict-origin-when-cross-origin"},"body": null,"method": "GET"}

f();
async function f()
{
    const req = await ax.get(url);
    const data = await req;
    const head = data.headers['set-cookie']
    console.log(head)
    if(head.length==4){
    const a = head[0].split(";")[0]+";";
    const b = head[1].split(";")[0]+";";
    const c = head[2].split(";")[0]+";";
    const d= head[3].split(";")[0]+";";
    const cookie = a+b+c+d

    // console.log(l)
    const h = { ...hh,Referer: url,cookie:cookie}
    // // console.log(h)
     const r1 = await ax.get(nft,h);
     const d1 = await r1;
     const n1 = d1.data.data
    
    
    return n1
    // return h

}
else
{
    return("cookie error")
}}

//EXPRESS APP
const app= ex()
const port = process.env.PORT || 5000;

app.get(`/${path}`,async(req,res)=>
{
try
{
        const api= await f();
        return res.status(200).json(api)
}
catch(err)
{
    return res.status(500).json({
        err:err.toString(),
    })
}
})
app.listen(port, () =>
	{
		console.log(`running on port http://localhost:5000/${path}`)
	})
