function homeController(axios) {

    return {
        async index(req, res) {
            const resp = await axios.get("http://localhost:3000/api/products")
            const foundProducts = resp.data;
            let sendToIndex = {
                "Top Picks" : [],
                "Healthy" : []
            }
            for(let i =0; i <4; i++){
                sendToIndex["Top Picks"].push(foundProducts[i]);
            }
            let j = 0;
            for(let i =0; i <foundProducts.length; i++){
                if(j == 4){
                    break;
                }
                if(foundProducts[i].product_category == "Veggies"){
                    sendToIndex["Healthy"].push(foundProducts[i]);
                    j++;
                }
            }
            res.render('index', {
                products: sendToIndex
            });
        }
    }
}

module.exports = homeController