const span = document.querySelector(".pname")

let info = `{
  "links": {
    "INT18R371": "//meet.google.com/gyt-mxao-vyu?pli=1&authuser=1",
    "CSE18R173": "//meet.google.com/evq-cbvd-rhj?pli=1&authuser=1",
    "CSE18R273": "//meet.google.com/aoi-gsxw-nki?pli=1&authuser=1",
    "CSE18R379": "//meet.google.com/erjgzfikpf?pli=1&authuser=1",
    "MAT18R207": "//meet.google.com/donmwzg7nf?pli=1&authuser=1",
    "BIT18R101": "//meet.google.com/ekv-gdky-asm?authuser=1",
    "NONE": "index.html"
  },
  "1": {
    "Day": "Monday",
    "1": "INT18R371"
    "2": "CSE18R173",
    "3": "CSE18R173",
    "4": "CSE18R173",
    "5": "MAT18R207",
    "6": "NONE",
    "7": "NONE"
  },
  "2": {
    "Day": "Tuesday",
    "1": "INT18R371",
    "2": "BIT18R101",
    "3": "CSE18R273",
    "4": "CSE18R273",
    "5": "CSE18R273",
    "6": "CSE18R273",
    "7": "CSE18R173"
  },
  "3": {
    "Day": "Wednesday",
    "1": "CSE18R173",
    "2": "CSE18R173",
    "3": "MAT18R207",
    "4": "CSE18R173",
    "5": "CSE18R379",
    "6": "CSE18R379",
    "7": "CSE18R273"
  },
  "4": {
    "Day": "Thrusday",
    "1": "CSE18R379",
    "2": "BIT18R101",
    "3": "CSE18R207",
    "4": "NONE",
    "5": "INT18R371",
    "6": "INT18R371",
    "7": "CSE18R273"
  },
  "5": {
    "Day": "Friday",
    "1": "BIT18R101",
    "2": "CSE18R379",
    "3": "INT18R371",
    "4": "MAT18R207",
    "5": "CSE18R379",
    "6": "CSE18R273",
    "7": "MAT18R207"
  },
  "6": {
      "Day": "Saturday",
      "1": "NONE",
      "2": "NONE",
      "3": "NONE",
      "4": "NONE",
      "5": "NONE",
      "6": "NONE",
      "7": "NONE"
  }
}
`


function parseTime(n) {
  var e = new Date();
  R = n.split(":");
  e.setHours(Number(R[0]), Number(R[1]), 0, 0)
  return e;
}


function parseText(n) {
  return n.getHours() + ":" + n.getMinutes();
}


const timetable = JSON.parse(info);


// Saturday Tiemtable Set here
timetable["6"] = timetable["1"];


const tstart = [
  "8:57",
  "9:53",
  "10:53",
  "11:48",
  "13:28",
  "14:18",
  "15:18",
]

tend = [
  "9:50",
  "10:43",
  "11:43",
  "12:38",
  "14:17",
  "15:10",
  "16:10",
];


var cclass, clink, forhtml,currentVariable;

function changeClass() {
  var xyz = new Date();
  for (i = 0; i < tstart.length; i++) {
    if (xyz > parseTime(tstart[i]) && xyz < parseTime(tend[i])) {
      cclass = timetable[xyz.getDay()][i + 1]
      if (cclass === "NONE") return
      clink = timetable.links[cclass];
      forhtml = `<a href="${clink}" target="_blank">${cclass}</a>`;
      span.innerHTML = forhtml;
    }
  }
}

let timenow = new Date();
changeClass();
7 != timenow.getDay() && setInterval(changeClass, 1000);


function showDateTime() {
  const uuuu = new Date();
  document.querySelector(".current-container h3").innerHTML = (uuuu.toDateString() + " &nbsp; " + uuuu.toLocaleTimeString());
}

showDateTime();
setInterval(showDateTime, 1000);



// ============================= Adding Notification ==========================


const SW = navigator.serviceWorker.register('sw.js')
Notification.permission === "default" && Notification.requestPermission().then(() => {
  Notification.permission === "denied" && alert('You gona miss Push Message at the Start of CLass')
})


function notify(className) {
  SW.then((worker) => worker.showNotification('Class Alert', {
    body: `You have ${className} in minutes`,
    icon: './favicon.png',
    image: 'https://9to5google.com/wp-content/uploads/sites/4/2020/05/google-meet-cover.jpg?quality=82&strip=all'
  }));
}


function senClassNotification() {
  const xyz = parseText(new Date());
  if (cclass === 'NONE') return;
  for (i = 0; i < tstart.length; i++){
    if (xyz === tstart[i]) notify(cclass);
    console.log("Hello");
    console.log(xyz);
  }
}


senClassNotification()
setInterval(senClassNotification, 60000);


// ----------------------------------------------------------------------------
