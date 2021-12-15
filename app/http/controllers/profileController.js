const { getCustomer, setName} = require('../../models/mysql_queries');

function profileController(){
    return {
        async index(req, res){
            if(req.session.username){
                const profileData = await getCustomer(req.session.username);
                console.log(profileData)
                res.render("profile", {
                    profileInfo: profileData[0]
                })
            }

        },
        async update(req, res){
            if(req.body.Name){
                await setName(req.session.username);
            }
            if(req.body.Email){
                await setName(req.session.username);
            }
            if(req.body.Password){
                await setName(req.session.username);
            }
            if(req.body.Phone){
                console.log(req.session.username)
            }
            if(req.body.StreetNo){
                console.log(req.session.username)
            }
            if(req.body.StreetName){
                console.log("StreetName")
            }
            if(req.body.City){
                console.log("City")
            }
            if(req.body.PostalCode){
                console.log("PostalCode")
            }
            if(req.body.Country){
                console.log("Country")
            }
            // console.log("hi")
        }
    }
}
module.exports = profileController
