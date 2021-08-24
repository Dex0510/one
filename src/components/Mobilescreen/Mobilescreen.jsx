import React from 'react'
import Mobilehome from './Mobilehome'
import Mobilecontact from './Mobilecontact'
import Mobileinfo from './Mobileinfo'
import Faq from './Faq'
import Disclaimer from './Disclaimer'
import Mobileservice from './Mobileservice'

const Mobilescreen = () => {
    return (
        <div>
            <Mobilehome/>
            <Mobileservice/>
            <Mobileinfo/>
            <Faq/>
            <Mobilecontact/>
            <Disclaimer/>
          
        </div>
    )
}

export default Mobilescreen
