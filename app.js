const express = require("express");
const https = require("https");
const app = express();
const md5 = require("md5");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const mailchimp = require("@mailchimp/mailchimp_marketing");

const listID = process.env.LISTID;
mailchimp.setConfig({
  apiKey: process.env.APIKEY,
  server: process.env.SERVER,
});

app.get("/", async (req, res) => {
  try{
    const response = await mailchimp.ping.get();
    console.log(response);
  } catch (error){
    console.log(error);
  }
  res.render("pages/signup");
});

app.post("/", async (req, res) => {
  const { fname, lname, phoneNumber, email } = req.body;
  const newSub = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fname,
      LNAME: lname,
      PHONE: phoneNumber
    }
  };
  const subscriberHash = md5(email.toLowerCase());
  try{
    //check is subscriber
    const response = await mailchimp.lists.getListMember(listID, subscriberHash);
    if(response){
      res.redirect("/subscriber");
    } else {
      res.redirect("/failure");
    }
  } catch(error){
    // is not a subscriber, so subscribe them
    console.log("error");
    console.log(error.status);
    if (error.status === 404) {
      const responseAdd = await mailchimp.lists.addListMember(listID, newSub);
      if(responseAdd){
        res.redirect("/success");
      } else {
        res.redirect("/failure");
      }
    } 
  }
});

app.post("/return", (req, res) => {
  res.redirect("/");
});
app.get("/success", (req, res) => {
  res.render("pages/result", {header: "Success! You have signed up.", button: "Return"});
});
app.get("/failure", (req, res) => {
  res.render("pages/result", {header: "Sorry but something went wrong", button: "Try again"});
});
app.get("/subscriber", (req, res) => {
  res.render("pages/result", {header: "You already subscribed", button: "Return"});
});

app.listen(3000, () => console.log("Server is running!"));
