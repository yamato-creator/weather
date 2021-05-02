// 「ACCESS_TOKEN」をLINE Notifyのアクセストークンに書き換え。
const ACCESS_TOKEN= "アクセストークン";

async function todayWeatherForecast() {
  const response = await UrlFetchApp.fetch("https://weather.tsukumijima.net/api/forecast/city/220040");
  const json= await JSON.parse(response.getContentText());
  const today_info = json["forecasts"][0];

  var Message = json["location"]["city"] + "の天気"+ "\n";
  Message = Message + " " + "\n";
  Message = Message + "今日： " + today_info["telop"] + "\n";

  umbrella(Message);
}

async function tommorowWeatherForecast() {
  const response = await UrlFetchApp.fetch("https://weather.tsukumijima.net/api/forecast/city/220040");
  const json= await JSON.parse(response.getContentText());
  const tomorrow_info = json["forecasts"][1];

  var Message = json["location"]["city"] + "の天気"+ "\n";
  Message = Message + " " + "\n";
  Message = Message + "明日： " + tomorrow_info["telop"] + "\n";

  umbrella(Message);
}

function umbrella(newMessage){
  var umbrella = false;
  if (newMessage.match(/雨/)){
    umbrella = true;
  }else if (newMessage.match(/雷/)){
    umbrella = true;
  }else if (newMessage.match(/雪/)){
    umbrella = true;
  }else if (newMessage.match(/みぞれ/)){
    umbrella = true;
  }
  if (umbrella){
    newMessage = newMessage + "傘が必要です☂️ " + "\n";
  }
  emoji(newMessage)
}

function emoji(newMessage){
  if (newMessage.match(/晴れ/)){
    newMessage = newMessage.replace("晴れ", "☀️");
  }
  if (newMessage.match(/晴/)){
    newMessage = newMessage.replace("晴", "☀️");
  }
  if (newMessage.match(/曇り/)){
    newMessage = newMessage.replace("曇り", "☁️");
  }
  if (newMessage.match(/曇/)){
    newMessage = newMessage.replace("曇", "☁️");
  }
  if (newMessage.match(/暴風雨/)){
    newMessage = newMessage.replace("暴風雨", "🌬⛈");
  }
  if (newMessage.match(/雷雨/)){
    newMessage = newMessage.replace("雷雨", "⛈");
  }
  if (newMessage.match(/雷/)){
    newMessage = newMessage.replace("雷", "🌩");
  }
  if (newMessage.match(/大雨/)){
    newMessage = newMessage.replace("大雨", "⛈");
  }
  if (newMessage.match(/雨/)){
    newMessage = newMessage.replace("雨", "🌧");
  }
  if (newMessage.match(/暴風雪/)){
    newMessage = newMessage.replace("暴風雪", "🌬🌬☃️");
  }
  if (newMessage.match(/大雪/)){
    newMessage = newMessage.replace("大雪", "🌬☃️");
  }
  if (newMessage.match(/雪/)){
    newMessage = newMessage.replace("雪", "☃️");
  }
  if (newMessage.match(/みぞれ/)){
    newMessage = newMessage.replace("みぞれ", "☃️");
  }

  sendToLine(newMessage);
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