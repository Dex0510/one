import React, { useState } from 'react'
import TermsConditions from './TermsConditions';
import Modal from 'react-bootstrap/Modal'
import { Link, Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button'
import Index from '../../static/index.jpg'
import useForm from "./useForm";
import validate from './Validationrules';
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
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  function login() {
    console.log('No errors, submit callback called!')
    setSubmitted(true)
     }

  const [ticked, setTicked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toggleTick = (event) => {
    let t = !ticked
    setTicked(t);
    values.ticked = t;
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
                      <input autoComplete="off" class="form-control"type="name" name="fullname" onChange={handleChange} value={values.fullname || ''} required />
                  {errors.fullname && (
                    <span className="text-danger">{errors.fullname}</span>
                  )}
                      {/* {submitted && !values.fullname ? <span className="text-danger">please enter the fullname</span> : null} */}
                      {/* {submitted && !namevalid ?  <span className="text-danger">please enter only characters</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="phoneNo" class="form-label">Contact No. <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="phoneno" name="phoneno" onChange={handleChange} value={values.phoneno || ''} required />
                  {errors.phoneno && (
                    <span className="text-danger">{errors.phoneno}</span>
                  )}
                      {/* {submitted && !values.phone ? <span className="text-danger">please enter the phone number</span> : null}
                      {submitted && phonevalid ? <span className="text-danger">please enter the valid phone number</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label ">Email address <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                      {/* <input type='email' id='email' name='email' className={`input ${errors.email && 'is-danger'}`}  class="form-control" name = 'email'
                        onChange={handleChange}
                      /> */}

                      {/* {(submitted && !emailvalid) ? <span className="text-danger">please enter the valid email</span> : null} */}


                    </div>

                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={toggleTick} value={values.ticked} required />
                      <p class="form-check-label" for="exampleCheck1"> I accept all <a className='button' style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setModalShow(true)} >Terms and Conditions</a></p>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      /> 
                      {errors.ticked && (
                    <span className="text-danger" style = {{display:'inline-block'}}>{errors.ticked}</span>
                  )} 
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                      <button type="submit" id="next-btn" style={{ justifyContent: 'center' }}  >
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
