import championListData from "../../assets/en_US/champion.json";
let championObject = {};
const championArray = championListData.data;
for (let champion in championArray) {
  let championData = require("./champion/" + champion + ".json").data;
  championObject[champion] = championData;
}

export default championObject;
