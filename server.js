const express = require("express");
const fetch = require("node-fetch");
// const path = require("path");

const app = express();

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(
  "/",
  express.static("build", {
    extensions: ["html"]
  })
);

app.get("/api/seniorull", getSeniorulData);

// app.get("/api/seniorull", (req, res) => {
//   fetch(
//     "https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/aCmHaNGEpFDYaTFvUPrtUpdqhIS1dB4OrDqopMkC1ij17Zo?api_key=RGAPI-ee1c851c-4528-45e1-b8eb-f018c6c128ba"
//   )
//     .then(resp => resp.json())
//     .then(json => res.send({ data: json }));
// });

const port = 8080;

// app.listen(port, () => `Server running on port ${port}`);

app.listen(port, err => {
  if (err) console.error("There was an error starting the server.", err);
  else console.log("Server started successfully.");
});

// SERVER FUNCTIONS

async function getSeniorulData(req, res) {
  try {
    await fetch(
      "https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/aCmHaNGEpFDYaTFvUPrtUpdqhIS1dB4OrDqopMkC1ij17Zo?api_key=RGAPI-ee1c851c-4528-45e1-b8eb-f018c6c128ba"
    )
      .then(resp => resp.json())
      .then(json => res.send(json.sort((a, b) => a.queueType.localeCompare(b.queueType))));
      // .then(json => res.send({ data: json }));
  } catch (e) {
    error(res, e);
  }
}

// for sending error codes
function error(res, err) {
  res.sendStatus(500);
  console.error(err);
}
