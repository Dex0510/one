import React from 'react'
import Assets from '../../static/formsmall.png'
import Benificiary from '../../static/beneficiarysmall.png';
import Will from '../../static/emailsmall.png'
const Mobileservice = () => {
  return (
    <div style={{borderBottom:'2px solid gray'}}>
      <div className='my-5' >
        <h1 className='text-center' style = {{fontSize:'24px', color :'#0072bc', marginLeft:'10%', marginRight:'10%'}}> Create Your Online Will in 3 Easy Steps</h1>
      </div>
              <div style = {{height:'30%'}}>
      
                  <div style = {{height:'25%'}}>
                    <img src={Assets} alt=""  style ={{justifyContent:'center', transform:'scale(0.8)', marginLeft:'35%'}}/>
                  </div>
                  <h6  style={{ fontSize: '17 px',color:'grey',textAlign:'center', marginLeft:'10%', marginRight:'10%' }}>Fill-in your Personal & Asset Details</h6>
                  </div>
                  <div style = {{height:'30%'}}>
      
                  <div style = {{height:'25%'}}>
                    <img src={Benificiary} alt=""  style ={{justifyContent:'center', transform:'scale(0.8)', marginLeft:'33%', marginTop:'10%'}}/>
                    <h6  style={{ fontSize: '17 px',color:'grey',textAlign:'center',  }}>Allocate Your Beneficiary</h6>
                  </div>
                  </div>
      
                  <div style = {{height:'30%'}}>
      
      <div style = {{height:'25%'}}>
        <img src={Will} alt=""  style ={{justifyContent:'center', transform:'scale(0.8)', marginLeft:'33%',marginTop:'10%'}}/>
        <h6  style={{ fontSize: '17 px',color:'grey',textAlign:'center', marginLeft:'10%', marginRight:'10%' }}>Get your Will on Email</h6>
      </div>
      
      </div>

      

  

            </div>


         
    
  )
}

export default Mobileservice
