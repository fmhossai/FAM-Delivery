
const {getProducts} = require("../../models/mysql_queries")
function homeController(axios) {

    return {
        async index(req, res) {
            //link model to controller
            const foundProducts = await getProducts();
            let sendToIndex = {
                "Top Picks" : [],
                "Healthy" : []
            }
            for(let i =0; i <4; i++){
                sendToIndex["Top Picks"].push(foundProducts[i]);
            }
            let j = 0;
            let fruitsFound = 0;
            let veggiesFound = 0;
            for(let i =0; i <foundProducts.length; i++){
                if(j == 4){
                    break;
                }
                if((foundProducts[i].category == "Fruits")&&(fruitsFound < 2)){
                    sendToIndex["Healthy"].push(foundProducts[i]);
                    fruitsFound++;
                    j++;
                }
                if((foundProducts[i].category == "Veggies")&&(veggiesFound < 2)){
                    sendToIndex["Healthy"].push(foundProducts[i]);
                    veggiesFound++;
                    j++;
                }
            }

            res.render('index', {
                products: sendToIndex, login: true
            });
        }
    }
}

module.exports = homeController