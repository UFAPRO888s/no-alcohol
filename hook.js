const express = require("express");
const axios = require("axios");
const FB = require("fb");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.set("port", 9499);
app.set("verify_token", "PNCKDEVAPP");

const firebase = require("firebase-admin");

const { createCanvas, loadImage, registerFont, Image } = require("canvas");
registerFont("./fonts/NotoSansThai.ttf", { family: "Noto Sans Thai" });
registerFont("./fonts/Kanit-Bold.ttf", { family: "Kanit-Bold" });
registerFont("./fonts/Kanit-Regular.ttf", { family: "Kanit-Regular" });
registerFont("./fonts/NotoSansThai600.ttf", { family: "NotoSansThai600" });
registerFont("./fonts/NotoSansThai700.ttf", { family: "NotoSansThai700" });
registerFont("./fonts/NotoSansThai800.ttf", { family: "NotoSansThai800" });
registerFont("./fonts/Anton-Regular.ttf", { family: "AntonRegular" });

const serviceAccount = require("./serviceaccount.json");
const imagesX = require("./images")
const textim = require("./text")
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://lotto-changyed-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = firebase.database();

Array.prototype.randomEMX = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const Token = "EAAK4m1zs8o4BAGPLZC5Vqr9jZCT7ZBJAiGVGWwrA32K4YixP2dyRZAfeio93IIBdGtbkQZATSJTlJyVj3n5Gd0ZBDii1N5fJc7wzZBbneasRD5Nod0CZCZBPIZCLaqRB6AoxOP4GfCZA2ntwZADvLE6cZCEgjdyfJywstqilGdWvSzc92ffdtiVdQwPdA";

async function getData(cjxk) {
  // fs.writeFileSync("./drawn3Image.png", img64);
  //var base64Data = img64.replace(/^data:image\/png;base64,/, "");
  //require("fs").writeFile("upload.png", base64Data, "base64", function (err) {console.log(err);});
  
  if(cjxk === "KIWI_05"){
    await wiki05("KIWI_05");
  }else if(cjxk === "KIWI_10"){
    await wiki10("KIWI_10");
  }else if(cjxk === "KIWI_15"){
    await wiki15("KIWI_15");
  }else{
    return
  }
}

const pakc = ['#หวยหุ้นนิเคอิเช้า วันที่ออกจันทร์-ศุกร์ เวลาออกผล 09.20 – 09.40 น. \n(ปิดรับแทง 09.00 น. / ประกาศผล 09.40)','#หวยหุ้นจีนเช้า วันที่ออกจันทร์-ศุกร์ เวลาออกผล 10.00 – 10.40 น. \n(ปิดรับแทง 10.00 น. / ประกาศผล 10.40 น.)','#หวยหุ้นฮั่งเส็งเช้า วันที่ออกจันทร์-ศุกร์ เวลาออกผล 10.50 – 11.10 น. (ปิดรับ 10.50 น. / ประกาศผล 11.10 น.)','#หวยหุ้นไต้หวัน วันที่ออกจันทร์-ศุกร์  เวลาออกผล 12.00 – 12.40 น. \n(ปิดรับแทง 12.00 น. / ประกาศผล 12.40 น.)','#หวยหุ้นนิเคอิบ่าย วันที่ออกจันทร์-ศุกร์ เวลาออกผล 12.50 – 13.10 น. \n(ปิดรับแทง 12.50 น. / ประกาศผล 13.10 น.)','#หวยหุ้นเกาหลี วันที่ออกจันทร์-ศุกร์  เวลาออกผล 12.40 – 13.30 น. \n(ปิดรับแทง 12.40น. / ประกาศผล 13.30 น.)','#หวยหุ้นจีนบ่าย วันที่ออกจันทร์-ศุกร์ เวลาออกผล 13.30 – 14.10 น. \n(ปิดรับแทง 13.30 น. / ประกาศผล 14.10 น.)','#หวยหุ้นฮั่งเส็งบ่าย วันที่ออกจันทร์-ศุกร์ เวลาออกผล 14.50 – 15.20 น. \n(ปิดรับแทง 14.50 น. / ประกาศผล 15.20 น.)','#หวยหุ้นสิงคโปร์ วันที่ออกจันทร์-ศุกร์ เวลาออกผล 15.50 – 16.20 น. \n(ปิดรับแทง 15.50 น. / ประกาศผล 16.20 น.)','#หวยหุ้นไทยเย็น  วันที่ออกจันทร์-ศุกร์ เวลาออกผล 16.20 – 16.40 น. \n(ปิดรับแทง 16.20 น. / ประกาศผล 16.40 น.)','#หวยหุ้นอินเดีย วันที่ออกจันทร์-ศุกร์ เวลาออกผล 16.40 – 17.30 น. \n(ปิดรับแทง 16.40 น. / ประกาศผล 17.30 น.)','#หวยหุ้นอียิปต์  วันที่ออกอาทิตย์ถึงพฤหัส เวลาออกผล 18.00 – 20.00 น. \n(ปิดรับแทง 18.00 น. / ประกาศผล 20.00 น.)','#หวยหุ้นรัสเซีย วันที่ออกจันทร์-ศุกร์ เวลาออกผล 22.00 – 23.00 น. \n(ปิดรับแทง 22.00 น. / ประกาศผล  23.00 น.)','#หวยหุ้นเยอรมัน วันที่ออกจันทร์-ศุกร์ เวลาออกผล 22.00 – 23.50 น. \n(ปิดรับแทง 22.00 น. / ประกาศผล 23.50 น.)','#หวยหุ้นอังกฤษ วันที่ออกจันทร์-ศุกร์ เวลาออกผล 22.00 – 23.50 น. \n(ปิดรับแทง 22.00 น. / ประกาศผล 23.50 น.)','#หวยหุ้นดาวโจนส์ วันที่ออกจันทร์-ศุกร์ เวลาออกผล 01.00 – 04.30 น. \n(ปิดรับแทง 01.00 น. / ประกาศผล 04.30 น.)']

async function postFB(Data,cjxk){
  const Token = "EABbIvZCtXCsUBAHOu2ViOshy5OB3quSp5bxG7nrmyOUs0qKaND6qjCcSXiGYZCxLWhu505E2UwUI2jFENT7DRwdg4WXJFFaHYdzWtGWCjeY3OPvE3wpsxVXlFz4ZCq7xngGBuZA8EnehJT8ZAqEbTLZChVXStRllHWYogYHp9p4dCoiT2AwlEA";
  
  const LinkKK = await getSUrl();
  const msglotto = "หวยยี่กี่ "+Data[0]['announce_datetime_th'] +"\n"+Data[0]['title_th']+"\n3ตัวบน"+Data[0]['THREE_UP']+"\n2ตัวล่าง"+Data[0]['TWO_DOWN']+"\n #"+Data[0]['title_th']+" ลิ้งค์สมัคร "+LinkKK+"\n";
  try {
    const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
    let DataPage_access_token;
    let DataPage_id;
    for (let vc = 0; vc < res["data"].length; vc++) {
      DataPage_access_token = res["data"][vc]["access_token"];
      DataPage_id = res["data"][vc]["id"];
      FB.setAccessToken(DataPage_access_token);
      var rtextim = textim.randomEMX();
      var capt = "#ประกาศผลหวย เพจเฟสบุ๊ค กลุ่มเฟสบุ๊ค แชทFB\n"+msglotto+"\nสาระความรู้หวยยี่กี "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที\nผลหวย24ชม จับยี่กีทุก "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที เรียกอีกชื่อหนึ่งว่า หวยปิงปอง"+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+"นาที \nเป็น หวยออนไลน์ ที่มีต้นกำเนิดมาจากการ จับยี่กี ซึ่งเป็นการพนันชนิดหนึ่งของจีน แบบ "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที\nจะมี "+cjxk.replace("KIWI_05","288").replace("KIWI_10","144").replace("KIWI_15","96")+" รอบ ออกผลทุกวัน ทุกๆ "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที ตามเวลาจริง\n" + rtextim.replace(/หวย/g, " #หวยนาคราช ") +"\nโปรแกรมประกาศผลหวยยี่กี และ หวยทุกประเภท\n\nโพสต์ลงกลุ่ม "+pakc.randomEMX()+"\n\nอัตราการจ่ายหวยยี่กีนาคราช 3 ตัวบน บาทละ 960 | 3 ตัวโต๊ด บาทละ 150 | 2 ตัว บน-ล่าง บาทละ 97\n #หวย #ผลหวย #ยี่กี่ #หวย #หวยลาว #หวยรัฐบาล #หวยออนไลน์ #หวยไทย #หวยออก #หวยงวดนี้ #หวยใต้ดิน #หวยใบเขียว #หวยหุ้นหวยต่างประเทศรวยทุกวัน";
      FB.api(DataPage_id + "/photos","post",{ source: fs.createReadStream("./Gen_Image_"+cjxk+".png"), alt_text: "ประกาศผลหวย เพจเฟสบุ๊ค กลุ่มเฟสบุ๊ค หวยนาคราช" , caption: capt },function (res) {
        if (!res || res.error) {console.log(!res ? "error occurred" : res.error);return;}
          console.log("Post Id: " + res.id);
        }
      );
    }
  } catch (error) {
  }
}


async function getToken(IDX) {
  const Token =
    "EABbIvZCtXCsUBAHOu2ViOshy5OB3quSp5bxG7nrmyOUs0qKaND6qjCcSXiGYZCxLWhu505E2UwUI2jFENT7DRwdg4WXJFFaHYdzWtGWCjeY3OPvE3wpsxVXlFz4ZCq7xngGBuZA8EnehJT8ZAqEbTLZChVXStRllHWYogYHp9p4dCoiT2AwlEA";
  try {
    const { data: res } = await axios.get(
      `https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`
    );
    const resultvalue = res["data"].filter((valueX) => valueX["id"] == IDX);
    return resultvalue;
  } catch (e) {
    console.log(e);
  }
}

app.get("/", function (req, res) {
  res.send("It Works! ChangYedNook activate.");
});

app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === app.get("verify_token")) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("Error, token");
  }
});

app.post("/webhook/", function (req, res) {
  //console.log (req.body);
  if (req.body.entry[0] == "messaging") {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
      event = req.body.entry[0].messaging[i];
      sender = event.sender.id;
      if (event.message && event.message.text) {
        text = event.message.text;
        // Your Logic Replaces the following Line
        sendTextMessage(
          sender,
          "Text received, echo: " + text.substring(0, 200)
        );
      }
    }
    res.sendStatus(200);
  }
  if (req.body.entry[0]["changes"]) {
    const IDX = req.body.entry[0]["id"];
    const change = req.body.entry[0]["changes"];
    for (let ix = 0; ix < change.length; ix++) {
      const field = change[ix]["field"];
      const value = change[ix]["value"];
      //const resultvalue = value.filter(valueX => valueX['verb'] !== "add" || valueX['verb'] !== "edited"); mention
      if (
        (field == "feed" && value.item == "comment") ||
        value.item == "reaction"
      ) {
        if (value.from.id == IDX) {
          return res.sendStatus(200);
        }
        if (value.verb !== "add" || value.verb !== "edited") {
          switch (value.item) {
            case "comment":
              console.log(`item comm`);
              res.sendStatus(200);
              break;
            case "reaction":
              reaction(IDX, change[0], value.reaction_type);
              break;
            default:
              console.log(`Sorry, we are out of `);
          }
        } else {
          res.sendStatus(200);
        }
      } else if (field == "mention") {
        console.log(IDX, "mention", change[0]);
      } else {
        res.sendStatus(200);
      }
    }
  } else {
    res.sendStatus(200);
  }
});

async function reaction(IDX, change, reaction_type) {
  const ggTo = await getToken(IDX);
  const endpoint = change.value.post_id;
  const from_ID = change.value.from.id;
  const endpointX = Object.keys(change.value).filter(
    (i) => change.value[i] === "comment_id"
  );
  if (endpointX[0]) {
    endpoint = change.value.comment_id;
  }
  //console.log(reaction_type,change,endpoint,from_ID,ggTo)
  switch (reaction_type) {
    case "like":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    case "love":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    case "haha":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    case "wow":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    case "care":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    case "sad":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    case "angry":
      postReaction(IDX, reaction_type, endpoint, from_ID, ggTo);
      break;
    default:
      console.log(`Sorry, we are out of `);
  }
}

function postReaction(IDX, reaction_type, endpoint, from_id, ggTo) {
  // console.log("/"+endpoint)
  // FB.setAccessToken(ggTo[0].access_token);
  // const body = `${reaction_type} My first @[${from_id}]`;
  // FB.api("/"+endpoint, 'post', { message: body }, function (res) {
  // if(!res || res.error) {
  //     console.log(!res ? 'error occurred' : res.error);
  //     return;
  // }
  // console.log('Post Id: ' + res.id);
  // });
  if (reaction_type && endpoint !== "") {
    //const msgText = "ขอบคุณค่ะ ";
    //const pagecomments = `https://graph.facebook.com/${hooksetmap.Data_post_id}/comments?message=${encodeURI(msgText)}&access_token=${TokenFB}`;
    axios({
      method: "POST",
      url: `https://graph.facebook.com/${endpoint}/comments?access_token=${ggTo[0].access_token}`,
      data: {
        to: from_id,
        message: `${reaction_type}\n#รายงานผลหวย #หวยหุ้น #หวยลาว #ผลหวย #หวยวันนี้ #ผลหวยหุ้น @[${from_id}]`,
      },
      headers: { "Content-Type": "application/json" },
    });
    //console.log(pagecomments);
  }
}

function sendTextMessage(sender, text) {
  messageData = {
    text: text,
  };
  // request({
  //     url: 'https://graph.facebook.com/v2.6/me/messages',
  //     qs: {access_token:app.get('page_access_token')},
  //     method: 'POST',
  //     json: {
  //         recipient: {id:sender},
  //         message: messageData,
  //     }
  // }, function(error, response, body) {
  //     if (error) {
  //         console.log('Error sending message: ', error);
  //     } else if (response.body.error) {
  //         console.log('Error: ', response.body.error);
  //     }
  // });
}

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});



const DATALATTER = db.ref("Latest");

DATALATTER.child("R_LATTE_FOREIGN").on("child_changed", (snapshot) => {
   if(snapshot.val()){
    LATTE_DEF(snapshot.val())
   
   }
});
DATALATTER.child("R_STOCK_FOREIGN").on("child_changed", (snapshot) => {
  if(snapshot.val()){
    
      LATTE_DEF(snapshot.val())
     
  }
});
DATALATTER.child("R_LATTE_THAI").on("child_changed", (snapshot) => {
  if(snapshot.val()){
   // getData("KIWI_15")
   //LATTE_DEF(snapshot.val())
   LATTE_DEF_TH(snapshot.val())
  }
});

DATALATTER.child("R_LATTE_FOREIGN_HANOI").on("child_changed", (snapshot) => {
  if(snapshot.val()){
  //  LATTE_THAI(snapshot.val())
  LATTE_DEF(snapshot.val())
  }
})
DATALATTER.child("R_LATTE_FOREIGN_LAO").on("child_changed", (snapshot) => {
  if(snapshot.val()){
  //  LATTE_THAI(snapshot.val())
  LATTE_DEF(snapshot.val())
  }
})
DATALATTER.child("R_LATTE_FOREIGN_EURO").on("child_changed", (snapshot) => {
  if(snapshot.val()){
  //  LATTE_THAI(snapshot.val())
  LATTE_DEF(snapshot.val())
  }
})
DATALATTER.child("R_LATTE_FOREIGN_SAI").on("child_changed", (snapshot) => {
  if(snapshot.val()){
   // LATTE_THAI(snapshot.val())
   LATTE_DEF(snapshot.val())
  }
})
DATALATTER.child("R_LATTE_FOREIGN_HOCHI").on("child_changed", (snapshot) => {
  if(snapshot.val()){
  //  LATTE_THAI(snapshot.val())
  LATTE_DEF(snapshot.val())
  }
})

DATALATTER.child("R_STOCK_FOREIGN3RAT").on("child_changed", (snapshot) => {
  //if(snapshot.val()[0]['results'][0]['digit'] !== "-"){
    //  const STOCK_FOREIGN3RAT = DATALATTER.child("R_STOCK_FOREIGN").filter(STOCK_FO => STOCK_FO['results'][0]['digit'] != "-")
    console.log(snapshot.val())
    //  // if()
    //  // LATTE_R_STOCK3RAT(snapshot.val())
  // }
})




const LATTE_DEF = async (Data) => {
  console.log(Data)
  const width = 1440;
  const height = 1440;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "top";
  context.textAlign = "center";
  

  loadImage("https://firebasestorage.googleapis.com/v0/b/lotto-changyed.appspot.com/o/"+encodeURI(Data['template'])+"?alt=media").then((XXdata) => {
  context.drawImage(XXdata, 0, 0, width, height);

  context.fillStyle = "#191919";
  context.font = "bold 13rem NotoSansThai800";
  context.fillText(Data['results'][0]['digit'], 740, 480);
  
  context.fillStyle = "#191919";
  context.font = "bold 13rem NotoSansThai800";
  context.fillText(Data['results'][1]['digit'], 460, 950);
 
  context.fillStyle = "#191919";
  context.font = "bold 13rem NotoSansThai800";
  context.fillText(Data['results'][2]['digit'], 970, 950);

  const imgBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./Temp/Gen_Image_"+Data['sub_type']+".png", imgBuffer);
  LATTE_DEF_FB()
})
}


const LATTE_R_STOCK3RAT = async (Data) => {
  console.log(Data)
  const width = 1440;
  const height = 1440;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "top";
  context.textAlign = "center";
  

  loadImage("https://firebasestorage.googleapis.com/v0/b/lotto-changyed.appspot.com/o/"+encodeURI("17-ผลหวยหุ้น-สามรัฐ.jpeg")+"?alt=media").then((XXdata) => {
  context.drawImage(XXdata, 0, 0, width, height);
//รัสเซีย
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[0]['results'][0]['digit'], 540, 590);
  
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[0]['results'][1]['digit'], 760, 590);
 
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[0]['results'][2]['digit'], 940, 590);
//เยอรมัน
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[1]['results'][0]['digit'], 540, 900);
  
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[1]['results'][1]['digit'], 760, 900);
 
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[1]['results'][2]['digit'], 940, 900);
//อังกฤษ
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[2]['results'][0]['digit'], 540, 1220);
  
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[2]['results'][1]['digit'], 760, 1220);
 
  context.fillStyle = "#191919";
  context.font = "bold 3rem NotoSansThai800";
  context.fillText(Data[2]['results'][2]['digit'], 940, 1220);

  const imgBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./Temp/Gen_Image_Rat3.png", imgBuffer);
  // const msglotto = "#ประกาศผลหวย "+Data['announce_datetime_th'] +"\n#"+Data['title_th']+"\n3ตัวบน"+Data['results'][0]['digit']+"\n2ตัวบน"+Data['results'][1]['digit']+"\n2ตัวล่าง"+Data['results'][2]['digit']+"\n"+"\n#หวย #ผลหวย #ยี่กี่ #หวย #หวยลาว #หวยรัฐบาล #"+Data['title_th']+" #หวยออนไลน์ #หวยไทย #หวยออก #หวยงวดนี้ #หวยใต้ดิน #หวยใบเขียว #หวยหุ้นหวยต่างประเทศรวยทุกวัน\n"+Data['detail_th']+"\n"+textim.randomEMX().replace(/หวย/g," #หวย ");
  //  try {
  //    const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
  //    let DataPage_access_token;
  //    let DataPage_id;
  //    for (let vc = 0; vc < res["data"].length; vc++) {
  //      DataPage_access_token = res["data"][vc]["access_token"];
  //      DataPage_id = res["data"][vc]["id"];
  //      FB.setAccessToken(DataPage_access_token);
  //      var rtextim = textim.randomEMX();
       
  //      FB.api(DataPage_id + "/photos","post",{ source: fs.createReadStream("./Temp/Gen_Image_Rat3.png"), alt_text: "ประกาศผลหวย "+Data['title_th']+" กลุ่มเฟสบุ๊ค หวยนาคราช" , caption: msglotto },function (res) {
  //        if (!res || res.error) {console.log(!res ? "error occurred" : res.error);return;}
  //          console.log("Post Id: " + res.id);
  //        }
  //      );
  //    }
  //  } catch (error) {
  //    // Handle errors
  //  }
})
}



 const  LATTE_DEF_FB = async () => {

  // const LinkKK = await getSUrl();
   const msglotto = "#ประกาศผลหวย "+Data['announce_datetime_th'] +"\n#"+Data['title_th']+"\n3ตัวบน"+Data['results'][0]['digit']+"\n2ตัวบน"+Data['results'][1]['digit']+"\n2ตัวล่าง"+Data['results'][2]['digit']+"\n"+"\n#หวย #ผลหวย #ยี่กี่ #หวย #หวยลาว #หวยรัฐบาล #"+Data['title_th']+" #หวยออนไลน์ #หวยไทย #หวยออก #หวยงวดนี้ #หวยใต้ดิน #หวยใบเขียว #หวยหุ้นหวยต่างประเทศรวยทุกวัน\n"+Data['detail_th']+"\n"+textim.randomEMX().replace(/หวย/g," #หวย ");
   try {
     const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
     let DataPage_access_token;
     let DataPage_id;
     for (let vc = 0; vc < res["data"].length; vc++) {
       DataPage_access_token = res["data"][vc]["access_token"];
       DataPage_id = res["data"][vc]["id"];
       FB.setAccessToken(DataPage_access_token);
       var rtextim = textim.randomEMX();
       
       FB.api(DataPage_id + "/photos","post",{ source: fs.createReadStream("./Temp/Gen_Image_"+Data['sub_type']+".png"), alt_text: "ประกาศผลหวย "+Data['title_th']+" กลุ่มเฟสบุ๊ค หวยนาคราช" , caption: msglotto },function (res) {
         if (!res || res.error) {console.log(!res ? "error occurred" : res.error);return;}
           console.log("Post Id: " + res.id);
         }
       );
     }
   } catch (error) {
     // Handle errors
   }
   } 


   const LATTE_DEF_TH = async (Data) => {
    console.log(Data)
    const width = 1440;
    const height = 1440;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    context.textBaseline = "top";
    context.textAlign = "center";
    
  
    loadImage("https://firebasestorage.googleapis.com/v0/b/lotto-changyed.appspot.com/o/"+encodeURI(Data['template'])+"?alt=media").then((XXdata) => {
    context.drawImage(XXdata, 0, 0, width, height);
  
    context.fillStyle = "#191919";
    context.font = "bold 13rem NotoSansThai800";
    context.fillText(Data['results'][0]['digit'], 740, 450);
    
    context.fillStyle = "#191919";
    context.font = "bold 6rem NotoSansThai800";
    context.fillText(Data['results'][1]['digit'], 320, 900);
   
    context.fillStyle = "#191919";
    context.font = "bold 6rem NotoSansThai800";
    context.fillText(Data['results'][2]['digit'], 570, 900);

    context.fillStyle = "#191919";
    context.font = "bold 6rem NotoSansThai800";
    context.fillText(Data['results'][3]['digit'], 320, 1150);

    context.fillStyle = "#191919";
    context.font = "bold 6rem NotoSansThai800";
    context.fillText(Data['results'][4]['digit'], 570, 1150);

    context.fillStyle = "#191919";
    context.font = "bold 17rem NotoSansThai800";
    context.fillText(Data['results'][5]['digit'], 1080, 850);
  
    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./Temp/Gen_Image_"+Data['sub_type']+".png", imgBuffer);
    THslpfb(Data)
  })
  }

  async function THslpfb(Data){
  let im1 = imagesX.randomEMX();
  let im2 = imagesX.randomEMX();
  let im3 = imagesX.randomEMX();
  let im4 = imagesX.randomEMX();
  let im5 = imagesX.randomEMX();
  const msglotto = "#ประกาศผลหวย "+Data['announce_datetime_th'] +"\n#"+Data['title_th']+"\n3ตัวบน"+Data['results'][0]['digit']+"\n2ตัวบน"+Data['results'][1]['digit']+"\n2ตัวล่าง"+Data['results'][2]['digit']+"\n"+"\n#หวย #ผลหวย #ยี่กี่ #หวย #หวยลาว #หวยรัฐบาล #"+Data['title_th']+" #หวยออนไลน์ #หวยไทย #หวยออก #หวยงวดนี้ #หวยใต้ดิน #หวยใบเขียว #หวยหุ้นหวยต่างประเทศรวยทุกวัน\n"+Data['detail_th']+"\n"+textim.randomEMX();
    const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
    let DataPage_access_token;
    let DataPage_id;
    for (let vc = 0; vc < res["data"].length; vc++) {
      DataPage_access_token = res["data"][vc]["access_token"];
      DataPage_id = res["data"][vc]["id"];
      FB.setAccessToken(DataPage_access_token);
       var rtextim = textim.randomEMX();
       FB.api(DataPage_id + "/photos","post",{ source: fs.createReadStream("./Temp/Gen_Image_"+Data['sub_type']+".png"), alt_text: "ประกาศผลหวย "+Data['title_th']+" กลุ่มเฟสบุ๊ค #หวยนาคราช" , caption: msglotto.replace(/หวย/g," #หวย ")},function (res) {
         if (!res || res.error) {console.log(!res ? "error occurred" : res.error);return;}
           console.log("Post Id: " + res.id);
         }
       );
   
 
  } }
  

  // async function ptov(){
  //   const im1 = imagesX.randomEMX();let im2 = imagesX.randomEMX();let im3 = imagesX.randomEMX();let im4 = imagesX.randomEMX();let im5 = imagesX.randomEMX()
  //   const Token = "EABbIvZCtXCsUBAHOu2ViOshy5OB3quSp5bxG7nrmyOUs0qKaND6qjCcSXiGYZCxLWhu505E2UwUI2jFENT7DRwdg4WXJFFaHYdzWtGWCjeY3OPvE3wpsxVXlFz4ZCq7xngGBuZA8EnehJT8ZAqEbTLZChVXStRllHWYogYHp9p4dCoiT2AwlEA";
  //   try {
  //     const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
  //     let DataPage_access_token;
  //     let DataPage_id;
  //     for (let vc = 0; vc < res["data"].length; vc++) {
  //       DataPage_access_token = res["data"][vc]["access_token"];
  //       DataPage_id = res["data"][vc]["id"];
  //       const { data: resX } = await axios.post(`https://graph-video.facebook.com/v17.0/${DataPage_id}/videos?access_token=${DataPage_access_token}&published=true&slideshow_spec={images_urls:[ '${im1}', '${im2}', '${im3}', '${im4}', '${im5}'],duration_ms: 5000,transition_ms: 200 }`)
  //         console.log(resX);
  //     }
  //      }catch (error) {
  //       // Handle errors
  //     }
    
  // }

  // ptov()
  // async function getToken(IDX) {
  //   const Token = "EABbIvZCtXCsUBAHOu2ViOshy5OB3quSp5bxG7nrmyOUs0qKaND6qjCcSXiGYZCxLWhu505E2UwUI2jFENT7DRwdg4WXJFFaHYdzWtGWCjeY3OPvE3wpsxVXlFz4ZCq7xngGBuZA8EnehJT8ZAqEbTLZChVXStRllHWYogYHp9p4dCoiT2AwlEA";
  //   try {
  //     const { data: res } = await axios.post(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
  //     const resultvalue = res["data"].filter((valueX) => valueX["id"] == IDX);
  //     return resultvalue;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

//"https://graph-video.facebook.com/v17.0/105752732210580/videos?access_token=EAAK4m1zs8o4BADvZCNJIQSMvuFFliKU4SGdQ3Jafq7oeWDzcpiDmKwEM4ZCMpZAQzx7DmK9Ix8iQvxZA6vIEWMGhAfNMe2NZC4cnSoDuP7cmumxbZBe0nD7raSBbDmVsELuQF5iZBA3RiYyvMPlDSKPSWfHyDBwNWtYB4aNU4b6CdTieRTZADXZBs2ZCtsN6yRZCZBq3JwAMUFA5azE2oi4G9ooO&slideshow_spec={"images_urls":[ 'https://sitestep.co/wp-content/uploads/2023/06/354049968_833970001630743_7527259181319433908_n.jpg', 'https://sitestep.co/wp-content/uploads/2023/06/354172334_834495561578187_7064649465342507276_n.jpg','https://sitestep.co/wp-content/uploads/2023/06/354219679_834499841577759_3834425317370750374_n.jpg'], "duration_ms": 5000, "transition_ms": 200 }"
