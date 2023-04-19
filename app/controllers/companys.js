const db = require("../models");
var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
var token = "53c39fd794ed643eb8cc7503cac74e006249e689";

exports.get = async (req, res) => {
    try {
        const name = await db.Company.findOne({
            where: {
                inn: req.body.inn
            }
        });
        if (name) {
            res.status(200).json(name.dataValues)
        } else {
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({ query: req.body.inn })
            }
     
            await fetch(url, options)
                .then(response => response.text())
                .then(result => {
                    const data = JSON.parse(result)
                    if (data.suggestions.length != 0) {
                        console.log('correct')
                        db.Company.create({
                            inn: req.body.inn,
                            value: data.suggestions[0].value
                        })
                        console.log(data)
                        console.log(data.data)
                        res.status(200).json(data.suggestions[0])
                    } else {
                        res.status(200).json({ value: "Неверный ИНН" })
                    }

                })
                .catch(error => {
                    console.log("error", error)

                });



        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }

}