// 「ACCESS_TOKEN」をLINE Notifyのアクセストークンに書き換え。
const ACCESS_TOKEN= "ZW5OK756fMEIfnGkb7JjNUHAEWTDEj4HRBkL4wTDQp0";

async function todayWeatherForecast() {
  const response = await UrlFetchApp.fetch("https://weather.tsukumijima.net/api/forecast/city/220040");
  const json= await JSON.parse(response.getContentText());
  const today_info = json["forecasts"][0];
  var umbrella = false;

  var Message = json["location"]["city"] + "の天気"+ "\n";
  Message = Message + " " + "\n";
  Message = Message + "今日： " + today_info["telop"] + "\n";

  if (Message.match(/晴れ/)){
    Message = Message.replace("晴れ", "☀️");
  }
  if (Message.match(/晴/)){
    Message = Message.replace("晴", "☀️");
  }
  if (Message.match(/曇り/)){
    Message = Message.replace("曇り", "☁️");
  }
  if (Message.match(/曇/)){
    Message = Message.replace("曇", "☁️");
  }
  if (Message.match(/暴風雨/)){
    Message = Message.replace("暴風雨", "🌬⛈");
    umbrella = true;
  }
  if (Message.match(/雷雨/)){
    Message = Message.replace("雷雨", "⛈");
    umbrella = true;
  }
  if (Message.match(/雷/)){
    Message = Message.replace("雷", "🌩");
    umbrella = true;
  }
  if (Message.match(/大雨/)){
    Message = Message.replace("大雨", "⛈");
    umbrella = true;
  }
  if (Message.match(/雨/)){
    Message = Message.replace("雨", "🌧");
    umbrella = true;
  }
  if (Message.match(/暴風雪/)){
    Message = Message.replace("暴風雪", "🌬🌬☃️");
    umbrella = true;
  }
  if (Message.match(/大雪/)){
    Message = Message.replace("大雪", "🌬☃️");
    umbrella = true;
  }
  if (Message.match(/雪/)){
    Message = Message.replace("雪", "☃️");
    umbrella = true;
  }
  if (Message.match(/霧/)){
    Message = Message.replace("霧", "🌫");
  }
  if (Message.match(/みぞれ/)){
    Message = Message.replace("みぞれ", "☃️");
    umbrella = true;
  }
  if (Message.match(/風/)){
    Message = Message.replace("風", "🌬");
  }
  if (umbrella){
    Message = Message + "傘が必要です☂️ " + "\n";
  }

  sendToLine(Message);
}

async function tommorowWeatherForecast() {
  const response = await UrlFetchApp.fetch("https://weather.tsukumijima.net/api/forecast/city/220040");
  const json= await JSON.parse(response.getContentText());
  const tomorrow_info = json["forecasts"][1];
  var umbrella = false;

  var Message = json["location"]["city"] + "の天気"+ "\n";
  Message = Message + " " + "\n";
  Message = Message + "明日： " + tomorrow_info["telop"] + "\n";

  if (Message.match(/晴れ/)){
    Message = Message.replace("晴れ", "☀️");
  }
  if (Message.match(/晴/)){
    Message = Message.replace("晴", "☀️");
  }
  if (Message.match(/曇り/)){
    Message = Message.replace("曇り", "☁️");
  }
  if (Message.match(/曇/)){
    Message = Message.replace("曇", "☁️");
  }
  if (Message.match(/暴風雨/)){
    Message = Message.replace("暴風雨", "🌬⛈");
    umbrella = true;
  }
  if (Message.match(/雷雨/)){
    Message = Message.replace("雷雨", "⛈");
    umbrella = true;
  }
  if (Message.match(/雷/)){
    Message = Message.replace("雷", "🌩");
    umbrella = true;
  }
  if (Message.match(/大雨/)){
    Message = Message.replace("大雨", "⛈");
    umbrella = true;
  }
  if (Message.match(/雨/)){
    Message = Message.replace("雨", "🌧");
    umbrella = true;
  }
  if (Message.match(/暴風雪/)){
    Message = Message.replace("暴風雪", "🌬🌬☃️");
    umbrella = true;
  }
  if (Message.match(/大雪/)){
    Message = Message.replace("大雪", "🌬☃️");
    umbrella = true;
  }
  if (Message.match(/雪/)){
    Message = Message.replace("雪", "☃️");
    umbrella = true;
  }
  if (Message.match(/霧/)){
    Message = Message.replace("霧", "🌫");
  }
  if (Message.match(/みぞれ/)){
    Message = Message.replace("みぞれ", "☃️");
    umbrella = true;
  }
  if (Message.match(/風/)){
    Message = Message.replace("風", "🌬");
  }
  if (umbrella){
    Message = Message + "傘が必要です☂️ " + "\n";
  }

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