import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import FaceRegisterForm from './FaceRegisterForm'
import Camera from './Camera'
const Content = () => {
    const [value, setValue] = useState('1')
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={value}
            onSelect={(k) => setValue(k)}
            className="mb-3"
        >
            <Tab eventKey={1} title="Recognition" className='tab-size'>
                <Camera on={value === '1'} />
            </Tab>
            <Tab eventKey={2} title="Register" className='tab-size'>
                <FaceRegisterForm />
            </Tab>
        </Tabs>
    )
}
export default Content