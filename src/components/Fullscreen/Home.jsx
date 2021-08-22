import React, { useState } from 'react'
import TermsConditions from './TermsConditions';
import Modal from 'react-bootstrap/Modal'
import { Link, Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button'
import Index from '../../static/index.jpg'
import useForm from "./useForm";
import validate from './Validationrules';
import './home.css';
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
  
  const [validtick ,setValidtick] = useState(false);
  const [validName ,setValidName] = useState(false);
  const [validPhone ,setValidPhone] = useState(false);
  const [validemail ,setValidEmail] = useState(false);
  const [errName, setErrName] = useState(' ');
  const [errPhone,setErrphone] = useState('');
  const [errEmail, setErremail]= useState('   ');
  const [hemail,setEmail] =useState('')   
  const [hname,setName] =useState('')   
  const [hphone,setPhone] =useState('')   
  const [ticked, setTicked] = useState(false);
  const [tickerr,setTickerr] = useState('    ')
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const toggleTick = (event) => {
    let t = !ticked
    let errors = err
    setTicked(t);
    if (!t){
      errors.ticked = 'Please Accept Terms and Condition'
      setErr(errors)
    }
    else{
    errors.ticked =''
    setErr(errors)
    }
  }
  const [err,setErr] = useState({
    fullname:'0',
    email:'0',
    phoneno:'0',
    ticked : '0'
  })

  const handleChange =(e) => {
    e.preventDefault();
    const {name, value} = e.target
    let errors = err
    switch(name){
      case 'fullname':
        setName(value)
        errors.fullname = value.match(/^[a-zA-Z]+ [a-zA-Z]+$/)?'':'Enter Valid Full Name E.g. Ankit Verma';
        break
      case 'email':
        setEmail(value)
        errors.email = value.match(/\S+@\S+\.\S+/)? '': 'Enter Valid Email id ';
        break
      case 'phoneno':
        setPhone(value)
        errors.phoneno = value.match(/^\d{10}$/) ? '':'Enter Valid Phone no.';
        setErr(errors)
        break
      // case 'tick':
      //   let t = !ticked
      //   setTicked(t)
      //   errors.tick = t?'':'Please Accept Terms and Condition';
      default:
        break
    }
    setErr(errors)
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(err)) {
      console.info('Valid Form')
      setSubmitted(true)
    }else{
      setSubmitted(false)
      console.error('Invalid Form')
    }
  }





  // function handleName(e){
  //   e.preventDefault();
  //   let rel = ''
  //   const str = e.target.value
  //   setName(str)
  //   if(!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)){
  //     rel = 'Enter Valid Full Name E.g. Ankit Verma'
  //     setErrName(rel)
  //     setValidName(false)
  //     setSubmitted(false)
  //   }
  //   else{
  //     rel = ''
  //     setErrName(rel)
  //     setValidName(true)
  //   }

  // }
  // function handlePhone(e){
  //   e.preventDefault();
  //   let rel = ''
  //   const str = e.target.value
  //   setPhone(str)
  //   if(!phone.match(/^\d{9}$/)){
  //     rel = 'Enter Valid Phone No.'
  //     setErrphone(rel)
  //     setValidPhone(false)
  //   }
  //   else{
  //     rel = ''
  //     setErrphone(rel)
  //     setValidPhone(true)
  //   }

  // }
  // function handleEmail(e){
  //   e.preventDefault();
  //   let rel = ''
  //   const str = e.target.value
  //   setEmail(str)
  //   if(!email.match(/\S+@\S+\.\S+/)){
  //     rel = 'Enter Valid Email'
  //     setErremail(rel)
  //     setValidEmail(false)
  //   }
  //   else{
  //     rel = ''
  //     setErremail(rel)
  //     setValidEmail(true)
  //   }

  // }
  // function handleTick(e){
  //   e.preventDefault();
  //   let rel = '' 
  //   const t=  !ticked
  //   setTicked(t)
  //   if(!ticked){
  //     rel = 'Please Accept Terms and Condition'
  //     setTickerr(rel)
  //   }
  //   else{
  //     rel = ''
  //     setTickerr(rel)
  //   }
    
  // }

  // function handleSubmit(e){
  //   if ( (validName === validPhone) && (validtick === validemail)){
  //     setSubmitted(true)
  //   }
  //   else{
  //     setSubmitted(false)
  //   }
  // }
  
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
                      <input autoComplete="off" class="form-control"type="name" name="fullname" onChange={handleChange} value={hname } required />
                  {err.fullname.length >1 && (
                    <span className="text-danger">{err.fullname}</span>
                  )}
                      {/* {submitted && !values.fullname ? <span className="text-danger">please enter the fullname</span> : null} */}
                      {/* {submitted && !namevalid ?  <span className="text-danger">please enter only characters</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="phoneNo" class="form-label">Contact No. <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="phoneno" name="phoneno" onChange={handleChange} value={hphone } required />
                  {err.phoneno.length > 1 && (
                    <span className="text-danger">{err.phoneno}</span>
                  )}
                      {/* {submitted && !values.phone ? <span className="text-danger">please enter the phone number</span> : null}
                      {submitted && phonevalid ? <span className="text-danger">please enter the valid phone number</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label ">Email address <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="email" name="email" onChange={handleChange} value={hemail } required />
                  {err.email.length >1 && (
                    <span className="text-danger">{err.email}</span>
                  )}
                      {/* <input type='email' id='email' name='email' className={`input ${errors.email && 'is-danger'}`}  class="form-control" name = 'email'
                        onChange={handleChange}
                      /> */}

                      {/* {(submitted && !emailvalid) ? <span className="text-danger">please enter the valid email</span> : null} */}


                    </div>

                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={toggleTick} value={ticked} required name= 'tick' />
                      <p class="form-check-label" for="exampleCheck1"> I accept all <a className='button' style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setModalShow(true)} >Terms and Conditions</a></p>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      /> 
                      {err.ticked.length > 1 && (
                    <span className="text-danger" style = {{display:'inline-block'}}>{err.ticked}</span>
                  )} 
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                      <button type="submit" id="next-btn" style={{ justifyContent: 'center' }}  onClick={handleSubmit} >
                        Create Will

                        {submitted ? <Redirect to='/will-creator-tool'></Redirect> : null}
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
