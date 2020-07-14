module.exports={
    publicPath:"",

    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000/api",
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}