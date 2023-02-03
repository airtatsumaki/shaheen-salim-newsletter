const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "3cf1fbf244eb518c2c3487d5bc5e9915-us11",
  server: "us11",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

app.get("/", async (req,res) => {
  try{
    const response = await mailchimp.ping.get();
    console.log(response);
    res.sendFile(__dirname + "/signup.html");
  } catch (error){
    console.log("error");
  }
});

// app.post("/", (req,res) => {
//   console.log(req.body.firstName);
//   console.log(req.body.lastName);
//   console.log(req.body.emailAdd);

//   const data = {
//     members : [
//       {
//         email_address : req.body.emailAdd,
//         email_type :  "html",
//         status : "subscribed",
//         merge_fields : {
//           FNAME : req.body.firstName,
//           LNAME : req.body.lastName
//         }
//       }
//     ]
//   };

//   isSubscriber(req.body.emailAdd, (result) => {
//     if (parseInt(result.exact_matches.total_items) > 0){
//       res.sendFile(__dirname + "/subscriber.html");
//     }
//     else{
//       const jsonData = JSON.stringify(data);
//       const url = "https://us11.api.mailchimp.com/3.0/lists/5e516d5aa7";
//       const options = {
//         method: "POST",
//         auth: "nazim:3cf1fbf244eb518c2c3487d5bc5e9915-us11"
//       }
//       const request = https.request(url, options, (response) => {
//         response.on("data", (data) => {
//           if (response.statusCode == "200"){
//             res.sendFile(__dirname + "/success.html");
//           }
//           else{
//             res.sendFile(__dirname + "/failure.html");
//           }
//         });
//       });
//       request.write(jsonData);
//       request.end();
//     }
//   });
// });

// app.post("/failure", (req,res) => {
//   res.redirect("/");
// });

// const isSubscriber = (query,callBack) => {
//   const url = "https://us11.api.mailchimp.com/3.0/search-members?query=" + String(query);
//   const options = {
//     auth: "nazim:3cf1fbf244eb518c2c3487d5bc5e9915-us11"
//   }
//   let body = "";
//   https.get(url, options, (response) => {
//     response.on("data", (data) => {
//       body += data;
//     })
//     response.on('end', () => {
//       let myJSONdata = JSON.parse(body);
//       callBack(myJSONdata);
//     })
//   });
// }

app.listen(3000, () => console.log("Server is running!"));

//mail chimp api key: 3cf1fbf244eb518c2c3487d5bc5e9915-us11
//mail chimp postman ping test:
// https://us11.api.mailchimp.com/3.0/ping?apikey=3cf1fbf244eb518c2c3487d5bc5e9915-us11

// mail chimp audience id: 5e516d5aa7



// "https://us11.api.mailchimp.com/3.0/lists/5e516d5aa7/members?apikey=3cf1fbf244eb518c2c3487d5bc5e9915-us11"
