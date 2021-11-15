const validator =  {
  isValid :  (creditCardNumber) => {
    let contador= 0;
    let number= creditCardNumber.toString().split ("").reverse();
    for (let i = 0; i < number. length; i++){
        if (i % 2 != 0){
            number[i] *=2;
            if (number[i] >= 10){
                number[i] = (number[i] % 10)+(Math.floor (number[i]/10));
            }
        }
        contador += parseInt(number[i]);
    }
    if (contador % 10== 0) {
        return true;
    }else{
        return false
    }
  },
 maskify: (creditCardNumber) => {
     let numberHidden = '';
     for (let i= 0; i < creditCardNumber.length; i++){
         if (i <= creditCardNumber.length-5){
             numberHidden +='#';
         }else{
            numberHidden+= creditCardNumber[i];
         }
     }
return numberHidden;
 }
};
export default validator;
