

// Функция для преобразования объекта с вложенностью в плоский объект
function flattenObject(obj) {
   let result = {};
   for (const key in JSON.parse(JSON.stringify(obj))) {
     const value = String(obj[key]);
     result[key] = value;
 
     if (key === "phone") {
       result[key] = "tel: " + value;
     }
     if (key === "daysVolunteer") {
       let str = "";
       const arrDays = obj[key];
       for (let item of arrDays) {
         str += `${item.day} ${item.timeStart} - ${item.timeFinish}`;
         if (arrDays[arrDays.length - 1]._id !== item._id) {
           str += "\n";
         }
       }
       result[key] = str;
     }
     if (key === "languages") {
       let str = "";
       const arrDays = obj[key];
       for (let item of arrDays) {
         str += `${item.language} - ${item.level}`;
         if (arrDays[arrDays.length - 1]._id !== item._id) {
           str += "\n";
         }
       }
       result[key] = str;
     }
     if (key === "mailing") {
       if (obj[key] === true) {
         result[key] = "Allowed";
       } else {
         result[key] = "Not allowed";
       }
     }
     if(key === "skills"){
       let str = "";
       const skills = obj[key];
       for (let item of skills) {
         str += `${item},`;
         if (skills[skills.length - 1] !== item) {
           str += "\n";
         }
       }
       result[key] = str;
     }
   }
   return result;
}

module.exports = { flattenObject }