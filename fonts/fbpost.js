
const axios = require('axios');
const FB = require("fb");
const fs = require("fs");
const firebase = require("firebase-admin");

const { createCanvas, loadImage, registerFont, Image } = require("canvas");
registerFont("./facebook/NotoSansThai.ttf", { family: "Noto Sans Thai" });
registerFont("./facebook/Kanit-Bold.ttf", { family: "Kanit-Bold" });
registerFont("./facebook/Kanit-Regular.ttf", { family: "Kanit-Regular" });
registerFont("./facebook/NotoSansThai600.ttf", { family: "NotoSansThai600" });
registerFont("./facebook/NotoSansThai700.ttf", { family: "NotoSansThai700" });
registerFont("./facebook/NotoSansThai800.ttf", { family: "NotoSansThai800" });
registerFont("./facebook/Anton-Regular.ttf", { family: "AntonRegular" });

const serviceAccount = require("./serviceaccount.json");
const imagesX = require("./images")
const textim = require("./text")
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://naka-lotto-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = firebase.database();

Array.prototype.randomEMX = function () {
  return this[Math.floor(Math.random() * this.length)];
};


async function getSUrl() {
  try {
    const {data:response} = await axios.get('http://tinyurl.com/api-create.php?url=https://portal.huaynakaraj.com/agent/6d8c4RBt');
    return response
  } catch (error) {
    console.error(error);
  }
}

async function getPostSHSUrl() {
  try {
    const {data:response} = await axios.get('http://localhost:5555/run');
    return response
  } catch (error) {
    console.error(error);
  }
}

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
  const Token = "EAAK4m1zs8o4BAOoTNcykjr87mwfxQbxSEwBwrip12K3H4j0ccrLeKkOCmip1I6DH1csoKNfFf6WVbv7MNOEIQ3b3AOE8jHZAnjDYSRCNDZCwUV7wWQHYHJynuAWOJhyfE5UP5M39FfH0yZAYE1WVXgevie2JZC92jzPX5WrkZAEdIm7QuxNdm";
  
  const LinkKK = await getSUrl();
  const msglotto = "หวยยี่กี่ "+Data[0]['announce_datetime_th'] +"\n"+Data[0]['title_th']+"\n3ตัวบน"+Data[0]['THREE_UP']+"\n2ตัวล่าง"+Data[0]['TWO_DOWN']+"\n #"+Data[0]['title_th']+" ลิ้งค์สมัคร "+LinkKK+"\n";
  try {
    const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
    let DataPage_access_token;
    let DataPage_id;
    for (let vc = 0; vc < res["data"].length; vc++) {
      DataPage_access_token = res["data"][vc]["access_token"];
      DataPage_id = res["data"][vc]["id"];
     // console.log("POST", DataPage_id);
      FB.setAccessToken(DataPage_access_token);
      var rtextim = textim.randomEMX();
      var capt = "#ประกาศผลหวย เพจเฟสบุ๊ค กลุ่มเฟสบุ๊ค แชทFB\n"+msglotto+"\nสาระความรู้หวยยี่กี "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที\nผลหวย24ชม จับยี่กีทุก "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที เรียกอีกชื่อหนึ่งว่า หวยปิงปอง"+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+"นาที \nเป็น หวยออนไลน์ ที่มีต้นกำเนิดมาจากการ จับยี่กี ซึ่งเป็นการพนันชนิดหนึ่งของจีน แบบ "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที\nจะมี "+cjxk.replace("KIWI_05","288").replace("KIWI_10","144").replace("KIWI_15","96")+" รอบ ออกผลทุกวัน ทุกๆ "+cjxk.replace("KIWI_05","5").replace("KIWI_10","10").replace("KIWI_15","15")+" นาที ตามเวลาจริง\n" + rtextim.replace(/หวย/g, " #หวยนาคราช ") +"\nโปรแกรมประกาศผลหวยยี่กี และ หวยทุกประเภท\n\nโพสต์ลงกลุ่ม "+pakc.randomEMX()+"\n\nอัตราการจ่ายหวยยี่กีนาคราช 3 ตัวบน บาทละ 960 | 3 ตัวโต๊ด บาทละ 150 | 2 ตัว บน-ล่าง บาทละ 97\n #หวย #ผลหวย #ยี่กี่ #หวย #หวยลาว #หวยรัฐบาล #หวยออนไลน์ #หวยไทย #หวยออก #หวยงวดนี้ #หวยใต้ดิน #หวยใบเขียว #หวยหุ้นหวยต่างประเทศรวยทุกวัน";
      FB.api(DataPage_id + "/photos","post",{ source: fs.createReadStream("./Gen_Image_"+cjxk+".png"), alt_text: "ประกาศผลหวย เพจเฟสบุ๊ค กลุ่มเฟสบุ๊ค หวยนาคราช" , caption: capt },function (res) {
        if (!res || res.error) {console.log(!res ? "error occurred" : res.error);return;}
          console.log("Post Id: " + res.id);
        }
      );
    }
   // getPostSHSUrl()
  } catch (error) {
    // Handle errors
  }
}

const Kiwi05Ref = db.ref("trigger_KIWI_05");
const Kiwi10Ref = db.ref("trigger_KIWI_10");
const Kiwi15Ref = db.ref("trigger_KIWI_15");

const huaynakarajLATTERef = db.ref("huaynakaraj");

Kiwi05Ref.on("child_changed", (snapshot) => {
   if(snapshot.val()){
    getData("KIWI_05")
   }
});
Kiwi10Ref.on("child_changed", (snapshot) => {
  if(snapshot.val()){
    getData("KIWI_10")
  }
});
Kiwi15Ref.on("child_changed", (snapshot) => {
  if(snapshot.val()){
    getData("KIWI_15")
  }
});

huaynakarajLATTERef.on("child_changed", (snapshot) => {
  if(snapshot.val()){
    LATTE_THAI(snapshot.val())
  }
})

async function getDATAX(chal) {
  try {
    const {data:response} = await axios.get("https://naka-lotto-default-rtdb.asia-southeast1.firebasedatabase.app/"+chal+".json");
    return response
  } catch (error) {
    console.error(error);
  }
}


const LATTE_THAI = async (Data) => {
  console.log("LOTTO")
  const width = 1548;
  const height = 980;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "top";
  context.textAlign = "center";
  loadImage("./facebook/bg-lotto.jpg").then((XXdata) => {
  context.drawImage(XXdata, 0, 0, width, height);
  context.arc(50, 50, 50, 0, 2 * Math.PI, true);
  })
  context.shadowColor = "#DAC96C";
  context.shadowBlur = 10;
  loadImage(Data['img_fg']).then((Xdata) => {
  context.drawImage(Xdata, 475, 580, 600, 580);
  context.shadowColor = "blue";
  //context.shadowBlur = 0;
  context.fillStyle = "#FFFFFFcc";
  context.font = "50pt NotoSansThai800";
  context.fillText("" + Data['title_th'], 760, 50);
  
  context.fillStyle = "#FFFFFFcc";
  context.font = "bold 25pt NotoSansThai800";
  context.fillText("" + Data['announce_datetime_th'], 765, 150);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 25pt NotoSansThai600";
  context.fillText(Data['title_th']+"หวยยี่กี3ตัวบน", 380, 255);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 25pt NotoSansThai600";
  context.fillText(Data['title_th']+"หวยยี่กี2ตัวล่าง", 1180, 255);

  /////////////////////////////3ตัว////////////////////////////////////////
  context.shadowColor = "#F1E17D";
  context.shadowBlur = 10;
  context.fillStyle = "#FFFFFF";
  context.font = "12rem NotoSansThai800";
  context.fillText("" + Data["THREE_UP"], 400, 250);

  //////////////////////////////2ตัว/////////////////////////////////////////////////
  context.shadowColor = "#F1E17D";
  context.shadowBlur = 10;
  context.fillStyle = "#FFFFFF";
  context.font = "12rem NotoSansThai800";
  context.fillText("" + Data["TWO_DOWN"], 1150, 250);
  
  /////////////////////////////////////////////////////////////////////////////////
  
  context.fillStyle = "#F1E17D";
  context.font = "1.2rem Noto Sans Thai";
  context.fillText(
    "สร้างอัตโนมัติและโพสต์อัตโนมัติ\nfacebook | line oa | selfbot\nติดต่อสอบถามได้ที่ข้อความ",
    1350,
    820
  );
  const imgBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./Gen_Image_"+Data['sub_type']+".png", imgBuffer);
  
  });
  const Token = "EAAK4m1zs8o4BAOoTNcykjr87mwfxQbxSEwBwrip12K3H4j0ccrLeKkOCmip1I6DH1csoKNfFf6WVbv7MNOEIQ3b3AOE8jHZAnjDYSRCNDZCwUV7wWQHYHJynuAWOJhyfE5UP5M39FfH0yZAYE1WVXgevie2JZC92jzPX5WrkZAEdIm7QuxNdm";
  
  const LinkKK = await getSUrl();
  const msglotto = "ผลหวย "+Data['announce_datetime_th'] +"\n"+Data['title_th']+"\n3ตัวบน"+Data['THREE_UP']+"\n2ตัวล่าง"+Data['TWO_DOWN']+"\nลิ้งค์สมัคร "+LinkKK+"\n";
  // try {
  //   const { data: res } = await axios.get(`https://graph.facebook.com/v17.0/me/accounts?access_token=${Token}`);
  //   let DataPage_access_token;
  //   let DataPage_id;
  //   for (let vc = 0; vc < res["data"].length; vc++) {
  //     DataPage_access_token = res["data"][vc]["access_token"];
  //     DataPage_id = res["data"][vc]["id"];
  //     FB.setAccessToken(DataPage_access_token);
  //     var rtextim = textim.randomEMX();
  //     var capt = "#ประกาศผลหวย "+Data['title_th']+"\n #"+ Data[0]['title_th'] +" "+Data['announce_datetime_th'] +"\nเพจเฟสบุ๊ค กลุ่มเฟสบุ๊ค แชทFB\n"+msglotto+"\nสาระความรู้"+Data['title_th']+"\nผลหวย24ชม\n" + rtextim.replace(/หวย/g, " #หวยนาคราช ") +"\nโปรแกรมประกาศผลหวยยี่กี และ หวยทุกประเภท\nโพสต์ลงกลุ่ม เพจ หรือหน้า feed\nหรือต้องการแบบเคลื่อนไหวเป็น reels \nสมัครแทงหวย "+LinkKK+"\nอัตราการจ่ายหวยยี่กีนาคราช 3 ตัวบน บาทละ 960 | 3 ตัวโต๊ด บาทละ 150 | 2 ตัว บน-ล่าง บาทละ 97\n #หวย #ผลหวย #ยี่กี่ #หวย #หวยลาว #หวยรัฐบาล #หวยออนไลน์ #หวยไทย #หวยออก #หวยงวดนี้ #หวยใต้ดิน #หวยใบเขียว #หวยหุ้นหวยต่างประเทศรวยทุกวัน";
  //     FB.api(DataPage_id + "/photos","post",{ source: fs.createReadStream("./Gen_Image_"+Data['sub_type']+".png"), alt_text: "ประกาศผลหวย "+Data['title_th']+" กลุ่มเฟสบุ๊ค หวยนาคราช" , caption: capt },function (res) {
  //       if (!res || res.error) {console.log(!res ? "error occurred" : res.error);return;}
  //         console.log("Post Id: " + res.id);
  //       }
  //     );
  //   }
  // } catch (error) {
  //   // Handle errors
  // }
  }

const wiki05 = async (chal) => {
const Data = await getDATAX(chal)
console.log("WIKI05")
  const width = 1920;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "top";
  context.textAlign = "center";
  loadImage("./facebook/6191107.jpg").then((XXdata) => {
  context.drawImage(XXdata, 0, 0, width, height);
  context.arc(50, 50, 50, 0, 2 * Math.PI, true);
  })
  context.shadowColor = "#B5874C";
  context.shadowBlur = 15;
  loadImage(Data[0]['img_fg']).then((Xdata) => {
  context.drawImage(Xdata, 30, 30, 200, 200);
  //context.shadowColor = "blue";
  context.shadowBlur = 0;
  context.fillStyle = "#B5874C";
  context.font = "45pt NotoSansThai800";
  context.fillText("" + Data[0]['title_th'], 620, 90);
  context.strokeStyle = "#B5874Ccc";
  context.strokeText("" + Data[0]['title_th'], 620, 89);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 25pt NotoSansThai800";
  context.fillText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 620, 170);
  context.font = "bold 25pt NotoSansThai800";
  context.strokeText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 620, 170);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 25pt NotoSansThai800";
  context.fillText("ผลหวยยี่กีย้อนหลัง ", 320, 620);
  context.font = "bold 25pt NotoSansThai800";
  context.strokeText("ผลหวยยี่กีย้อนหลัง ", 320, 620);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  context.fillStyle = "#ffffff";
  context.font = "bold 20pt NotoSansThai800";
  context.fillText(""+Data[1]['title_th'], 320, 785);
  context.font = "bold 20pt NotoSansThai800";
  context.strokeText(""+Data[1]['title_th'], 320, 785);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[1]['THREE_UP'], 250, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[1]['THREE_UP'], 250, 720);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[1]['TWO_DOWN'], 380, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[1]['TWO_DOWN'], 380, 720);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  
  /////////////////////////////LAST////////////////////////////////////////
  context.fillStyle = "#ffffff";
  context.font = "bold 20pt NotoSansThai800";
  context.fillText(""+Data[2]['title_th'], 660, 785);
  context.font = "bold 20pt NotoSansThai800";
  context.strokeText(""+Data[2]['title_th'], 660, 785);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[2]['THREE_UP'], 610, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[2]['THREE_UP'], 610, 720);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[2]['TWO_DOWN'], 720, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[2]['TWO_DOWN'], 720, 720);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  
  /////////////////////////////LAST////////////////////////////////////////
  context.fillStyle = "#ffffff";
  context.font = "bold 20pt NotoSansThai800";
  context.fillText(""+Data[3]['title_th'], 1000, 785);
  context.font = "bold 20pt NotoSansThai800";
  context.strokeText(""+Data[3]['title_th'], 1000, 785);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[3]['THREE_UP'], 940, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[3]['THREE_UP'], 940, 720);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[3]['TWO_DOWN'], 1070, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[3]['TWO_DOWN'], 1070, 720);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  
  context.fillStyle = "#ffffff";
  context.font = "bold 50pt NotoSansThai700";
  context.fillText("รอบที่ "+Data[0]['display_round'], 400, 250);
  context.font = "bold 50pt NotoSansThai700";
  context.strokeText("รอบที่ "+Data[0]['display_round'], 400, 250);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 30pt NotoSansThai600";
  context.fillText("หวยยี่กี3ตัวบน", 400, 330);
  context.font = "bold 30pt NotoSansThai600";
  context.strokeText("หวยยี่กี3ตัวบน", 400, 330);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 30pt NotoSansThai600";
  context.fillText("หวยยี่กี2ตัวล่าง", 900, 330);
  context.font = "bold 30pt NotoSansThai600";
  context.strokeText("หวยยี่กี2ตัวล่าง", 900, 330);
  
  /////////////////////////////3ตัว////////////////////////////////////////
  context.shadowColor = "yellow";
  context.shadowBlur = 15;
  context.fillStyle = "#FFF5DC";
  context.font = "12rem NotoSansThai800";
  context.fillText("" + Data[0]["THREE_UP"], 400, 320);
  
  context.font = "12.1rem NotoSansThai800";
  context.strokeText("" + Data[0]["THREE_UP"], 400, 320);
  context.fillStyle = "#ffffff";
  //////////////////////////////2ตัว/////////////////////////////////////////////////
  context.shadowColor = "yellow";
  context.shadowBlur = 15;
  context.fillStyle = "#FFF5DC";
  context.font = "12rem NotoSansThai800";
  context.fillText("" + Data[0]["TWO_DOWN"], 900, 320);
  
  context.font = "12.1rem NotoSansThai800";
  context.strokeText("" + Data[0]["TWO_DOWN"], 900, 320);
  context.fillStyle = "#ffffff";
  /////////////////////////////////////////////////////////////////////////////////
  
  context.fillStyle = "#FFF5DC";
  context.font = "1.2rem Noto Sans Thai";
  context.fillText(
    "สร้างอัตโนมัติและโพสต์อัตโนมัติ facebook | line oa | selfbot ติดต่อสอบถามได้ที่ข้อความ",
    900,
    950
  );
  
  loadImage(imagesX.randomEMX()).then((dataX) => {
    context.drawImage(dataX, 1200, 200, 500, 650);
    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./Gen_Image_"+chal+".png", imgBuffer);
    //postFB(Data,chal)
  });
  });
  }

const wiki10 = async (chal) => {
const Data = await getDATAX(chal)
console.log("WIKI10")
const width = 1920;
const height = 1080;
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");
context.textBaseline = "top";
context.textAlign = "center";
loadImage("./facebook/bg-red.jpg").then((XXdata) => {
context.drawImage(XXdata, 0, 0, width, height);
context.arc(50, 50, 50, 0, 2 * Math.PI, true);
})
context.shadowColor = "#F6BA29";
context.shadowBlur = 15;
loadImage(Data[0]['img_fg']).then((Xdata) => {
context.drawImage(Xdata, 30, 30, 200, 200);
//context.shadowColor = "blue";
context.shadowBlur = 0;
context.fillStyle = "#B5874C";
context.font = "45pt NotoSansThai800";
context.fillText("" + Data[0]['title_th'], 1220, 90);
context.strokeStyle = "#B5874Ccc";
context.strokeText("" + Data[0]['title_th'], 1220, 89);

context.fillStyle = "#F6BA29";
context.font = "bold 25pt NotoSansThai800";
context.fillText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 1220, 170);
context.font = "bold 25pt NotoSansThai800";
context.strokeText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 1220, 170);
context.strokeStyle = "#70B673";

context.fillStyle = "#F6BA29";
context.font = "bold 25pt NotoSansThai800";
context.fillText("ผลหวยยี่กีย้อนหลัง ", 850, 620);
context.font = "bold 25pt NotoSansThai800";
context.strokeText("ผลหวยยี่กีย้อนหลัง ", 850, 620);
context.strokeStyle = "#70B673";
/////////////////////////////LAST////////////////////////////////////////
context.fillStyle = "#ffffff";
context.font = "bold 20pt NotoSansThai800";
context.fillText(""+Data[1]['title_th'], 920, 785);
context.font = "bold 20pt NotoSansThai800";
context.strokeText(""+Data[1]['title_th'], 920, 785);
context.strokeStyle = "#70B673";

context.fillStyle = "#ffffff";
context.font = "bold 40pt NotoSansThai800";
context.fillText(""+Data[1]['THREE_UP'], 850, 720);
context.font = "bold 40pt NotoSansThai800";
context.strokeText(""+Data[1]['THREE_UP'], 850, 720);
context.strokeStyle = "#70B673";

context.fillStyle = "#ffffff";
context.font = "bold 40pt NotoSansThai800";
context.fillText(""+Data[1]['TWO_DOWN'], 980, 720);
context.font = "bold 40pt NotoSansThai800";
context.strokeText(""+Data[1]['TWO_DOWN'], 980, 720);
context.strokeStyle = "#70B673";
/////////////////////////////LAST////////////////////////////////////////

/////////////////////////////LAST////////////////////////////////////////
context.fillStyle = "#ffffff";
context.font = "bold 20pt NotoSansThai800";
context.fillText(""+Data[2]['title_th'], 1260, 785);
context.font = "bold 20pt NotoSansThai800";
context.strokeText(""+Data[2]['title_th'], 1260, 785);
context.strokeStyle = "#70B673";

context.fillStyle = "#ffffff";
context.font = "bold 40pt NotoSansThai800";
context.fillText(""+Data[2]['THREE_UP'], 1210, 720);
context.font = "bold 40pt NotoSansThai800";
context.strokeText(""+Data[2]['THREE_UP'], 1210, 720);
context.strokeStyle = "#70B673";

context.fillStyle = "#ffffff";
context.font = "bold 40pt NotoSansThai800";
context.fillText(""+Data[2]['TWO_DOWN'], 1320, 720);
context.font = "bold 40pt NotoSansThai800";
context.strokeText(""+Data[2]['TWO_DOWN'], 1320, 720);
context.strokeStyle = "#70B673";
/////////////////////////////LAST////////////////////////////////////////

/////////////////////////////LAST////////////////////////////////////////
context.fillStyle = "#ffffff";
context.font = "bold 20pt NotoSansThai800";
context.fillText(""+Data[3]['title_th'], 1600, 785);
context.font = "bold 20pt NotoSansThai800";
context.strokeText(""+Data[3]['title_th'], 1600, 785);
context.strokeStyle = "#70B673";

context.fillStyle = "#ffffff";
context.font = "bold 40pt NotoSansThai800";
context.fillText(""+Data[3]['THREE_UP'], 1540, 720);
context.font = "bold 40pt NotoSansThai800";
context.strokeText(""+Data[3]['THREE_UP'], 1540, 720);
context.strokeStyle = "#70B673";

context.fillStyle = "#ffffff";
context.font = "bold 40pt NotoSansThai800";
context.fillText(""+Data[3]['TWO_DOWN'], 1670, 720);
context.font = "bold 40pt NotoSansThai800";
context.strokeText(""+Data[3]['TWO_DOWN'], 1670, 720);
context.strokeStyle = "#70B673";
/////////////////////////////LAST////////////////////////////////////////

context.fillStyle = "#ffffff";
context.font = "bold 50pt NotoSansThai700";
context.fillText("รอบที่ "+Data[0]['display_round'], 1600, 250);
context.font = "bold 50pt NotoSansThai700";
context.strokeText("รอบที่ "+Data[0]['display_round'], 1600, 250);

context.fillStyle = "#ffffff";
context.font = "bold 30pt NotoSansThai600";
context.fillText("หวยยี่กี3ตัวบน", 900, 330);
context.font = "bold 30pt NotoSansThai600";
context.strokeText("หวยยี่กี3ตัวบน", 900, 330);

context.fillStyle = "#ffffff";
context.font = "bold 30pt NotoSansThai600";
context.fillText("หวยยี่กี2ตัวล่าง", 1600, 330);
context.font = "bold 30pt NotoSansThai600";
context.strokeText("หวยยี่กี2ตัวล่าง", 1600, 330);

/////////////////////////////3ตัว////////////////////////////////////////
context.shadowColor = "#F6BA29";
context.shadowBlur = 10;
context.fillStyle = "#9E100E";
context.font = "12rem NotoSansThai800";
context.fillText("" + Data[0]["THREE_UP"], 900, 320);

context.font = "12.1rem NotoSansThai800";
context.strokeText("" + Data[0]["THREE_UP"], 900, 320);
context.fillStyle = "#9E100E";
//////////////////////////////2ตัว/////////////////////////////////////////////////
context.shadowColor = "#F6BA29";
context.shadowBlur = 10;
context.fillStyle = "#9E100E";
context.font = "12rem NotoSansThai800";
context.fillText("" + Data[0]["TWO_DOWN"], 1600, 320);

context.font = "12.1rem NotoSansThai800";
context.strokeText("" + Data[0]["TWO_DOWN"], 1600, 320);
context.fillStyle = "#9E100E";
/////////////////////////////////////////////////////////////////////////////////

context.fillStyle = "#FFF5DC";
context.font = "1.2rem Noto Sans Thai";
context.fillText(
"สร้างอัตโนมัติและโพสต์อัตโนมัติ facebook | line oa | selfbot ติดต่อสอบถามได้ที่ข้อความ",
1300,
950
);

loadImage(imagesX.randomEMX()).then((dataX) => {
context.drawImage(dataX, 40, 350, 500, 650);
const imgBuffer = canvas.toBuffer("image/png");
fs.writeFileSync("./Gen_Image_"+chal+".png", imgBuffer);
//postFB(Data,chal)
});
});
}

const wiki15 = async (chal) => {
  const Data = await getDATAX(chal)
  console.log("WIKI15")
  const width = 1920;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "top";
  context.textAlign = "center";
  loadImage("./facebook/blue-bg.jpg").then((XXdata) => {
  context.drawImage(XXdata, 0, 0, width, height);
  context.arc(50, 50, 50, 0, 2 * Math.PI, true);
  })
  context.shadowColor = "#DAC96C";
  context.shadowBlur = 15;
  loadImage(Data[0]['img_fg']).then((Xdata) => {
  context.drawImage(Xdata, 30, 30, 200, 200);
  //context.shadowColor = "blue";
  context.shadowBlur = 0;
  context.fillStyle = "#B5874C";
  context.font = "45pt NotoSansThai800";
  context.fillText("" + Data[0]['title_th'], 600, 90);
  context.strokeStyle = "#B5874Ccc";
  context.strokeText("" + Data[0]['title_th'], 600, 89);
  
  context.fillStyle = "#F6BA29";
  context.font = "bold 25pt NotoSansThai800";
  context.fillText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 600, 170);
  context.font = "bold 25pt NotoSansThai800";
  context.strokeText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 600, 170);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#F6BA29";
  context.font = "bold 25pt NotoSansThai800";
  context.fillText("ผลหวยยี่กีย้อนหลัง ", 850, 620);
  context.font = "bold 25pt NotoSansThai800";
  context.strokeText("ผลหวยยี่กีย้อนหลัง ", 850, 620);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  context.fillStyle = "#ffffff";
  context.font = "bold 20pt NotoSansThai800";
  context.fillText(""+Data[1]['title_th'], 920, 785);
  context.font = "bold 20pt NotoSansThai800";
  context.strokeText(""+Data[1]['title_th'], 920, 785);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[1]['THREE_UP'], 850, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[1]['THREE_UP'], 850, 720);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[1]['TWO_DOWN'], 980, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[1]['TWO_DOWN'], 980, 720);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  
  /////////////////////////////LAST////////////////////////////////////////
  context.fillStyle = "#ffffff";
  context.font = "bold 20pt NotoSansThai800";
  context.fillText(""+Data[2]['title_th'], 1260, 785);
  context.font = "bold 20pt NotoSansThai800";
  context.strokeText(""+Data[2]['title_th'], 1260, 785);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[2]['THREE_UP'], 1210, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[2]['THREE_UP'], 1210, 720);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[2]['TWO_DOWN'], 1320, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[2]['TWO_DOWN'], 1320, 720);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  
  /////////////////////////////LAST////////////////////////////////////////
  context.fillStyle = "#ffffff";
  context.font = "bold 20pt NotoSansThai800";
  context.fillText(""+Data[3]['title_th'], 1600, 785);
  context.font = "bold 20pt NotoSansThai800";
  context.strokeText(""+Data[3]['title_th'], 1600, 785);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[3]['THREE_UP'], 1540, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[3]['THREE_UP'], 1540, 720);
  context.strokeStyle = "#70B673";
  
  context.fillStyle = "#ffffff";
  context.font = "bold 40pt NotoSansThai800";
  context.fillText(""+Data[3]['TWO_DOWN'], 1670, 720);
  context.font = "bold 40pt NotoSansThai800";
  context.strokeText(""+Data[3]['TWO_DOWN'], 1670, 720);
  context.strokeStyle = "#70B673";
  /////////////////////////////LAST////////////////////////////////////////
  
  context.fillStyle = "#ffffff";
  context.font = "bold 50pt NotoSansThai700";
  context.fillText("รอบที่ "+Data[0]['display_round'], 1600, 250);
  context.font = "bold 50pt NotoSansThai700";
  context.strokeText("รอบที่ "+Data[0]['display_round'], 1600, 250);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 30pt NotoSansThai600";
  context.fillText("หวยยี่กี3ตัวบน", 900, 330);
  context.font = "bold 30pt NotoSansThai600";
  context.strokeText("หวยยี่กี3ตัวบน", 900, 330);
  
  context.fillStyle = "#ffffff";
  context.font = "bold 30pt NotoSansThai600";
  context.fillText("หวยยี่กี2ตัวล่าง", 1600, 330);
  context.font = "bold 30pt NotoSansThai600";
  context.strokeText("หวยยี่กี2ตัวล่าง", 1600, 330);
  
  /////////////////////////////3ตัว////////////////////////////////////////
  context.shadowColor = "#F1E17D";
  context.shadowBlur = 10;
  context.fillStyle = "#FFFFFF";
  context.font = "12rem NotoSansThai800";
  context.fillText("" + Data[0]["THREE_UP"], 900, 320);
  
  context.font = "12.1rem NotoSansThai800";
  context.strokeText("" + Data[0]["THREE_UP"], 900, 320);
  context.fillStyle = "#F1E17D";
  //////////////////////////////2ตัว/////////////////////////////////////////////////
  context.shadowColor = "#F1E17D";
  context.shadowBlur = 10;
  context.fillStyle = "#FFFFFF";
  context.font = "12rem NotoSansThai800";
  context.fillText("" + Data[0]["TWO_DOWN"], 1600, 320);
  
  context.font = "12.1rem NotoSansThai800";
  context.strokeText("" + Data[0]["TWO_DOWN"], 1600, 320);
  context.fillStyle = "#F1E17D";
  /////////////////////////////////////////////////////////////////////////////////
  
  context.fillStyle = "#F1E17D";
  context.font = "1.2rem Noto Sans Thai";
  context.fillText(
    "สร้างอัตโนมัติและโพสต์อัตโนมัติ facebook | line oa | selfbot ติดต่อสอบถามได้ที่ข้อความ",
    1300,
    950
  );
  
  loadImage(imagesX.randomEMX()).then((dataX) => {
    context.drawImage(dataX, 40, 350, 500, 650);
    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./Gen_Image_"+chal+".png", imgBuffer);
    //postFB(Data,chal)
  });
  });
  }

// async function yeekeeIMG(chal) {
// const Data = await getDATAX(chal)
// console.log("Data")
// const width = 1920;
// const height = 1080;
// const canvas = createCanvas(width, height);
// const context = canvas.getContext("2d");
// context.textBaseline = "top";
// context.textAlign = "center";
// loadImage("./facebook/6191107.jpg").then((XXdata) => {
// context.drawImage(XXdata, 0, 0, width, height);
// context.arc(50, 50, 50, 0, 2 * Math.PI, true);
// })
// context.shadowColor = "#B5874C";
// context.shadowBlur = 15;
// loadImage(Data[0]['img_fg']).then((Xdata) => {
// context.drawImage(Xdata, 30, 30, 200, 200);
// //context.shadowColor = "blue";
// context.shadowBlur = 0;
// context.fillStyle = "#B5874C";
// context.font = "45pt NotoSansThai800";
// context.fillText("" + Data[0]['title_th'], 620, 90);
// context.strokeStyle = "#B5874Ccc";
// context.strokeText("" + Data[0]['title_th'], 620, 89);

// context.fillStyle = "#ffffff";
// context.font = "bold 25pt NotoSansThai800";
// context.fillText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 620, 170);
// context.font = "bold 25pt NotoSansThai800";
// context.strokeText("ประจำวันที่ " + Data[0]['announce_datetime_th'], 620, 170);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 25pt NotoSansThai800";
// context.fillText("ผลหวยยี่กีย้อนหลัง ", 320, 620);
// context.font = "bold 25pt NotoSansThai800";
// context.strokeText("ผลหวยยี่กีย้อนหลัง ", 320, 620);
// context.strokeStyle = "#70B673";
// /////////////////////////////LAST////////////////////////////////////////
// context.fillStyle = "#ffffff";
// context.font = "bold 20pt NotoSansThai800";
// context.fillText(""+Data[1]['title_th'], 320, 785);
// context.font = "bold 20pt NotoSansThai800";
// context.strokeText(""+Data[1]['title_th'], 320, 785);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 40pt NotoSansThai800";
// context.fillText(""+Data[1]['THREE_UP'], 250, 720);
// context.font = "bold 40pt NotoSansThai800";
// context.strokeText(""+Data[1]['THREE_UP'], 250, 720);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 40pt NotoSansThai800";
// context.fillText(""+Data[1]['TWO_DOWN'], 380, 720);
// context.font = "bold 40pt NotoSansThai800";
// context.strokeText(""+Data[1]['TWO_DOWN'], 380, 720);
// context.strokeStyle = "#70B673";
// /////////////////////////////LAST////////////////////////////////////////

// /////////////////////////////LAST////////////////////////////////////////
// context.fillStyle = "#ffffff";
// context.font = "bold 20pt NotoSansThai800";
// context.fillText(""+Data[2]['title_th'], 660, 785);
// context.font = "bold 20pt NotoSansThai800";
// context.strokeText(""+Data[2]['title_th'], 660, 785);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 40pt NotoSansThai800";
// context.fillText(""+Data[2]['THREE_UP'], 610, 720);
// context.font = "bold 40pt NotoSansThai800";
// context.strokeText(""+Data[2]['THREE_UP'], 610, 720);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 40pt NotoSansThai800";
// context.fillText(""+Data[2]['TWO_DOWN'], 720, 720);
// context.font = "bold 40pt NotoSansThai800";
// context.strokeText(""+Data[2]['TWO_DOWN'], 720, 720);
// context.strokeStyle = "#70B673";
// /////////////////////////////LAST////////////////////////////////////////

// /////////////////////////////LAST////////////////////////////////////////
// context.fillStyle = "#ffffff";
// context.font = "bold 20pt NotoSansThai800";
// context.fillText(""+Data[3]['title_th'], 1000, 785);
// context.font = "bold 20pt NotoSansThai800";
// context.strokeText(""+Data[3]['title_th'], 1000, 785);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 40pt NotoSansThai800";
// context.fillText(""+Data[3]['THREE_UP'], 940, 720);
// context.font = "bold 40pt NotoSansThai800";
// context.strokeText(""+Data[3]['THREE_UP'], 940, 720);
// context.strokeStyle = "#70B673";

// context.fillStyle = "#ffffff";
// context.font = "bold 40pt NotoSansThai800";
// context.fillText(""+Data[3]['TWO_DOWN'], 1070, 720);
// context.font = "bold 40pt NotoSansThai800";
// context.strokeText(""+Data[3]['TWO_DOWN'], 1070, 720);
// context.strokeStyle = "#70B673";
// /////////////////////////////LAST////////////////////////////////////////

// context.fillStyle = "#ffffff";
// context.font = "bold 50pt NotoSansThai700";
// context.fillText("รอบที่ "+Data[0]['display_round'], 400, 250);
// context.font = "bold 50pt NotoSansThai700";
// context.strokeText("รอบที่ "+Data[0]['display_round'], 400, 250);

// context.fillStyle = "#ffffff";
// context.font = "bold 30pt NotoSansThai600";
// context.fillText("หวยยี่กี3ตัวบน", 400, 330);
// context.font = "bold 30pt NotoSansThai600";
// context.strokeText("หวยยี่กี3ตัวบน", 400, 330);

// context.fillStyle = "#ffffff";
// context.font = "bold 30pt NotoSansThai600";
// context.fillText("หวยยี่กี2ตัวล่าง", 900, 330);
// context.font = "bold 30pt NotoSansThai600";
// context.strokeText("หวยยี่กี2ตัวล่าง", 900, 330);

// /////////////////////////////3ตัว////////////////////////////////////////
// context.shadowColor = "yellow";
// context.shadowBlur = 15;
// context.fillStyle = "#FFF5DC";
// context.font = "12rem NotoSansThai800";
// context.fillText("" + Data[0]["THREE_UP"], 400, 320);

// context.font = "12.1rem NotoSansThai800";
// context.strokeText("" + Data[0]["THREE_UP"], 400, 320);
// context.fillStyle = "#ffffff";
// //////////////////////////////2ตัว/////////////////////////////////////////////////
// context.shadowColor = "yellow";
// context.shadowBlur = 15;
// context.fillStyle = "#FFF5DC";
// context.font = "12rem NotoSansThai800";
// context.fillText("" + Data[0]["TWO_DOWN"], 900, 320);

// context.font = "12.1rem NotoSansThai800";
// context.strokeText("" + Data[0]["TWO_DOWN"], 900, 320);
// context.fillStyle = "#ffffff";
// /////////////////////////////////////////////////////////////////////////////////

// context.fillStyle = "#FFF5DC";
// context.font = "1.2rem Noto Sans Thai";
// context.fillText(
//   "สร้างอัตโนมัติและโพสต์อัตโนมัติ facebook | line oa | selfbot ติดต่อสอบถามได้ที่ข้อความ",
//   900,
//   950
// );

// loadImage(imagesX.randomEMX()).then((dataX) => {
//   context.drawImage(dataX, 1200, 200, 500, 650);
//   const imgBuffer = canvas.toBuffer("image/png");
//   fs.writeFileSync("./Image_"+chal+".png", imgBuffer);
//  getData(Data,chal)
// });
// });
// }
  //http://tinyurl.com/api-create.php?url=

 
  

  // GET request for remote image in node.js
// axios({
//     method: 'get',
//     url: 'https://naka-lotto-default-rtdb.asia-southeast1.firebasedatabase.app/Kiwi05Huaynakaraj.json'
//   })
//     .then(function (response) {
//         yeekeeIMG(response['data'])
//     });
