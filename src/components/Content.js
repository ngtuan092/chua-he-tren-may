import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import FaceRegisterForm from './FaceRegisterForm'
import Camera from './Camera'
import './Content.css'

const Content = () => {
    const [value, setValue] = useState('1')
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={value}
            onSelect={(k) => setValue(k)}
            className="mb-3"
            style={{ justifyContent: 'flex-end', paddingRight: '5%', paddingLeft: '5%', background: 'rgba(255, 255, 255, .4)' }}
        >
            <Tab eventKey={1} title="Recognition" className='tab-size justify-content-center'>
                <Camera />
            </Tab>
            <Tab eventKey={2} title="Register" className='tab-size justify-content-center'>
                <FaceRegisterForm />
            </Tab>
        </Tabs>
    )
}
export default Content