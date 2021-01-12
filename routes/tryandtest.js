const bcrypt=require('bcryptjs');
let text1 = "123456";
let text2 = "123456";

console.log(bcrypt.compare(text1,text2));