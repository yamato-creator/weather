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

function umbrella(Message){
  var umbrella = false;
  if (Message.match(/雨/)){
    umbrella = true;
  }else if (Message.match(/雷/)){
    umbrella = true;
  }else if (Message.match(/雪/)){
    umbrella = true;
  }else if (Message.match(/みぞれ/)){
    umbrella = true;
  }
  if (umbrella){
    Message = Message + "傘が必要です☂️ " + "\n";
  }
  emoji(Message)
}

function emoji(Message){
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
  }
  if (Message.match(/雷雨/)){
    Message = Message.replace("雷雨", "⛈");
  }
  if (Message.match(/雷/)){
    Message = Message.replace("雷", "🌩");
  }
  if (Message.match(/大雨/)){
    Message = Message.replace("大雨", "⛈");
  }
  if (Message.match(/雨/)){
    Message = Message.replace("雨", "🌧");
  }
  if (Message.match(/暴風雪/)){
    Message = Message.replace("暴風雪", "🌬🌬☃️");
  }
  if (Message.match(/大雪/)){
    Message = Message.replace("大雪", "🌬☃️");
  }
  if (Message.match(/雪/)){
    Message = Message.replace("雪", "☃️");
  }
  if (Message.match(/みぞれ/)){
    Message = Message.replace("みぞれ", "☃️");
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