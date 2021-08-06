import React, { useState } from 'react'
import TermsConditions from './TermsConditions';
import Modal from 'react-bootstrap/Modal'
import { Link, Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button'
import Index from '../../static/index.jpg'
// import  {Link} from 'react-router-dom'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Terms & Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TermsConditions />
      </Modal.Body>
      {/* <Modal.Footer>
        <small>By clicking 'Accept' you are agreeing to our terms and conditions.</small>
        <Button onClick={props.onHide}>Accept</Button>
      </Modal.Footer> */}
    </Modal>
  );
}



const Home = () => {

  function isEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (email.match(mailformat)) {

      setEmailvalid(true)
      return true;
    }
    else {
      setEmailvalid(false)
      return false;
    }
  }



  function handleSubmit(e) {
    //e.preventDefault();

    setSubmitted(true);

    if ((submitted && values.fullname) && (isEmail(values.email) && values.phone)) {
      setValid(true);
      //checkvalid();
    }

  }
  // const [phone, setPhone] = useState('');
  // const [fullname, setFullname] = useState('')
  // const [email, setEmail] = useState('')
  const [values, setValues] = useState({
    phone: "",
    fullname: "",
    email: "",
  });

  // function checkvalid(){


  //   if(isEmail(values.email.toLowerCase())){
  //     setEmailvalid(true);
  //   }


  //   if(isNaN(values.fullname)){
  //     setNamevalid(true);
  //   }
  //   else{
  //     setNamevalid(false);
  //   }
  //   if (Number(values.phone) >100000000){
  //     setPhonevalid(true);
  //   }
  //   else{
  //     setPhonevalid(false)
  //   }
  //   let t = phonevalid && namevalid && phonevalid
  //   setAllgood(t);
  // }
  const [allgood, setAllgood] = useState(true)
  const [namevalid, setNamevalid] = useState(false)
  const [phonevalid, setPhonevalid] = useState(false);
  const [emailvalid, setEmailvalid] = useState(false);
  const [check, setCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [valid, setValid] = useState(false);
  const [ticked, setTicked] = useState(false)

  const handleFullname = (event) => {
    setValues({ ...values, fullname: event.target.value })

  }

  const handlePhone = (event) => {
    setValues({ ...values, phone: event.target.value })
  }

  const handleEmail = (event) => {
    isEmail(values.email);
    setValues({ ...values, email: event.target.value })
  }
  const toggleTick = (event) => {
    let t = !ticked
    setTicked(t);
  }



  return (
    <>
      <section id='header' className='d-flex align-items-center' style={{ paddingBottom: '70px', background: `{Index}` }}>
        <div className='container-fluid nav_bg'>
          <div className='row'>

            <div className='col-12 mx-auto'>
              <div className='row'>

                <div className='col-md-3 pt-5 pt-lg-0 order-1 order-lg-1 d-flex  flex-column'><img src={Index} style={{ transform: 'scale(1)', borderRadius: '50%' }}></img></div>
                <div className='col-md-3 pt-5 pt-lg-0 order-1 order-lg-1 d-flex  flex-column' style={{ justifyContent: 'center', marginRight: '40px' }}>
                  <h1 className='brand-name'> <strong style={{ color: 'white', fontSize: '38px', marginTop: '50px', textAlign: 'left' }}>Will Creator</strong> </h1>
                  <h3 style={{ color: 'white', textAlign: 'center' }}>
                    “Secure your dear ones.Express your wishes so that your
                    loved ones stay protected.”
                  </h3>
                </div>
                <div className='col-md-1 pt-5 pt-lg-0 order-1 order-lg-1 d-flex justify-content-center flex-column'></div>
                <div className='col-lg-4 order-2 order-lg-2 d-flex flex-column justify-content-center' style={{ backgroundColor: 'white', padding: '10px 50px 50px 50px', borderRadius: '13px' }}>
                  <form onSubmit={handleSubmit} style={{ paddingTop: '40px' }}>
                    <div class="mb-3">
                      <label class="form-label">Full Name <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input type="text" class="form-control" value={values.fullname}
                        onChange={handleFullname}
                      />
                      {submitted && !values.fullname ? <span className="text-danger">please enter the fullname</span> : null}
                      {/* {submitted && !namevalid ?  <span className="text-danger">please enter only characters</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="phoneNo" class="form-label">Contact No. <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input type="tel " class="form-control required" value={values.phone}
                        onChange={handlePhone}
                      />
                      {submitted && !values.phone ? <span className="text-danger">please enter the phone number</span> : null}
                      {submitted && phonevalid ? <span className="text-danger">please enter the valid phone number</span> : null}
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label ">Email address <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input type='email' id='email' name='email' class="form-control" value={values.email}
                        onChange={handleEmail}
                      />

                      {(submitted && !emailvalid) ? <span className="text-danger">please enter the valid email</span> : null}


                    </div>

                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={() => { setTicked(true) }} />
                      <label class="form-check-label" for="exampleCheck1"> I accept all <a className='button' style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setModalShow(true)} >Terms and Conditions</a></label>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                      <div>
                        {submitted && !ticked ? <span className="text-danger">please accept terms and conditions</span> : null}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                      <button type="submit" id="next-btn" style={{ justifyContent: 'center' }} onClick={handleSubmit}>
                        Create Will

                        {valid && ticked ? <Redirect to='/will-creator-tool'></Redirect> : null}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Home
