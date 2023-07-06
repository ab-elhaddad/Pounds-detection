const axios = require("axios");
const fs = require("fs");


const endpoint = async (req, res) => {
    try {
        const imagePath = req.files[0].path;
        const image = fs.readFileSync(imagePath, {
            encoding: "base64"
        });

        axios({
            method: "POST",
            url: "https://detect.roboflow.com/pounds-detection/6",
            params: {
                api_key: "YoUT5yEVqsSXsOYxijOv"
            },
            data: image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(function (response) {
                console.log(response.data);
                fs.rm(imagePath, () => { });
                res.json({ Data: response.data, Flag: true });
            })
            .catch(function (error) {
                console.log(error.message);
                fs.rm(imagePath, () => { });
                res.json({ Flag: false });
            });
    }
    catch (error) {
        console.log(error.message);
        res.json({ Flag: false });
    }
}

module.exports = { endpoint };