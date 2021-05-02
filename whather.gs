// 「ACCESS_TOKEN」をLINE Notifyのアクセストークンに書き換え。
const ACCESS_TOKEN= "ZW5OK756fMEIfnGkb7JjNUHAEWTDEj4HRBkL4wTDQp0";
async function weatherForecast() {
  const response = await UrlFetchApp.fetch("https://weather.tsukumijima.net/api/forecast/city/220040");
  const json= await JSON.parse(response.getContentText());
  const today_info = json["forecasts"][0];
  const tomorrow_info = json["forecasts"][1];

  var Message = json["location"]["city"] + "の天気"+ "\n";
  Message= Message + "今日の天気： " + today_info["telop"] + "\n";
  Message =  Message + "明日の天気： " + tomorrow_info["telop"] + "\n";
  sendToLine(Message);
}
// LINE送信処理
function sendToLine(text){
  const token = ACCESS_TOKEN;
  const options =
   {
     "method"  : "post",
     "payload" : "message=" + text,
     "headers" : {"Authorization" : "Bearer "+ token}
   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}