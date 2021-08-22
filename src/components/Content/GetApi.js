
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'https://api.postalpincode.in/pincode/440027';
 
async function GetApi( {pin}) {   
    
    try{
      const result = await axios(
        `https://api.postalpincode.in/pincode/${pin}`,
      );
      if (pin !== ''){
        console.log('child',pin)
        const city = result.data[0].PostOffice[0].Block
        const state = (result.data[0].PostOffice[0].State)
        return {city ,state}
      }
    }
    catch(err){
        console.error(err);
    };
   
    
  }
export default GetApi;
