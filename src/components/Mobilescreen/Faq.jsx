import React, { Component } from 'react';
import Faq from 'react-faq-component';
import './faq.css';
const data = {
  
  rows: [
    {
      title: "Who can be named as Executor in the Will?",
      content: "An executor can be the beneficiary or any person whom the person making a Will trusts viz. Friends, relatives, etc. An executor is responsible to carry out the wishes of the person making a WILL after he passes away. "
    },
    {
      title: "What is the difference between beneficiary and nominee?",
      content: "Nominee is a Trustee of the property and does not get title over the property, whereas a beneficiary is a person who becomes the owner and is entitled to the property bequeathed to him under WILL"
    },
    {
      title: "Who are the parties to a Will?",
      content: ` i) Testator - A person who makes Will
      ii)Executor/s - A person/s appointed by the testator, to ensure that the assets are distributed as desired by him/ her in the WILL.
      iii)Witnesses - There has to be two witnesses who shall sign the Will of the testator in front of him and the testator shall sign in front of these witnesses. These witnesses can be friends, relatives except family members or beneficiaries.
      iv) Benificiary/s - The person who will get property of the Testator.
      `
    },
    {
      title: "Who can be witnesses to a Will?",
      content: "Any relative, friend or any person whom you know and trust can be a Witness to your Will. The beneficiary of a Will cannot be a Witness to the same Will."
    },
    {
      title: "Can joint properties be included under the Will?",
      content: "Yes, a person owning a joint property can bequeath his share in the joint property in his WILL."
    },
    {
      title: "Can beneficiaries in a Will sign as witnesses?",
      content: "No. The witnesses to a Will cannot get any benefits out of the Will."
    },
    {
      title: "Can a person cancel or change his Will?",
      content: "Yes. At anytime a person can amend his Will during his lifetime either by executing a codicil or by making a new one. By making a new Will shall revoke the earlier one. The person&#39;s last WILL shall be considered."
    },
    {
      title: "Can rented property be included in a Will?",
      content: "No. Rented property cannot be disposed of by a Will."
    }]
}

const styles = {
  // bgColor: 'white',
  titleTextColor: "#0072bc",
  rowTitleColor: "#0072bc",
   rowContentColor: 'grey',
   arrowColor: "#0072bc",
   rowTitleAlign:'center',
   fontSize:'19px',
};

const config = {
   animate: true,
   arrowIcon: "+",
  tabFocus: true
};
export default class App extends Component {
  render() {
    return (
      <>
      <div className = 'my-5'>
      <h1 className = 'text-center'> <strong style={{color:'#0072bc'}}>  Frequently Asked Questions</strong></h1>
      </div>
      <div className = 'container-fluid mb-5' style = {{borderBottom:'2px solid grey', paddingBottom:'50px'}}>
          <div className = 'row'>
              <div className = 'col-8 mx-auto'>
                  <div className = 'row justify-content-center'>
                  <Faq data={data} styles={styles}
                config={config}/>
                  <div className = 'col-md-7 col-10 mx-auto'>
                  
        <div class="row ">
          <div class="col-xl-10">
          
          </div>
        </div>
</div>
</div>
</div>
   </div>
   </div>
   </>
    )
  }
}


{/* <Faq data={data}/> */}