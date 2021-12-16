const { getCustomer, setName, setEmail, setPassword, setPhoneNo, setAddressStreetNo, setAddressStreetName, setAddressCity, setAddressPostalCode, setAddressCountry, getSupplier} = require('../../models/mysql_queries');

function profileController(){
    return {
        async index(req, res){
            if(req.session.supplierFlag){
                const profileData = await getSupplier(req.session.username);
                console.log(profileData)
                res.render("profile", {
                    profileInfo: profileData[0]
                })
                return;
            }
            if(req.session.username){
                const profileData = await getCustomer(req.session.username);
                res.render("profile", {
                    profileInfo: profileData[0]
                })
                return;
            }
            res.redirect("/")

        },
        async update(req, res){
            if(req.body.Name){
                await setName(req.session.username, req.body.Name);
            }
            if(req.body.Email){
                await setEmail(req.session.username, req.body.Email);
            }
            if(req.body.Password){
                await setPassword(req.session.username, req.body.Password)
            }
            if(req.body.Phone){
                await setPhoneNo(req.session.username, req.body.Phone)
            }
            if(req.body.StreetNo){
                await setAddressStreetNo(req.session.username, req.body.StreetNo)
            }
            if(req.body.StreetName){
                await setAddressStreetName(req.session.username, req.body.StreetName)
            }
            if(req.body.City){
                await setAddressCity(req.session.username, req.body.City)
            }
            if(req.body.PostalCode){
                await setAddressPostalCode(req.session.username, req.body.PostalCode)
            }
            if(req.body.Country){
                await setAddressCountry(req.session.username, req.body.Country)
            }
            const profileData = await getCustomer(req.session.username);
            res.render("profile", {
                profileInfo: profileData[0]
            })
        }
    }
}
module.exports = profileController
