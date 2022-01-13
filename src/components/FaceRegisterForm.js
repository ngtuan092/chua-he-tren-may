import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
const FaceRegisterFrom = () => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [name, setName] = useState('')
    const [valid, setValid] = useState(false)
    useEffect(() => {
        const canvas = canvasRef.current
        const height = 720 / 16 * 9
        const width = 720
        canvas.height = height
        canvas.width = width
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, 720, 720 * 9 / 16);
        ctx.beginPath();
        ctx.rect(0, 0, 720, 720 * 9 / 16);
        ctx.stroke();
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 720,
                height: 405
            }
        }).then((stream) => {
            let video = videoRef.current
            let settings = stream.getVideoTracks()[0].getSettings()
            video.height = settings.height
            video.width = settings.width
            video.srcObject = stream
            video.play()
        })
        return () => {

        }
    }, [])
    const takePhoto = () => {
        const video = videoRef.current
        const canvas = canvasRef.current
        var ctx = canvas.getContext('2d')
        const width = video.width
        const height = video.height
        canvas.width = width
        canvas.height = height
        ctx.drawImage(video, 0, 0, width, height)
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.stroke();
    }
    const onSubmit = (e) => {
        e.preventDefault()

        // let image_base64 = canvasRef.current.toDataURL().replace(/^data:image\/png;base64,/, "");
        let image_base64 = canvasRef.current.toDataURL();
        axios.post(`http://localhost:3001/image`, { name, image_base64 })
            .then(res => {
                console.log(res.status)
            }).catch(e => {
                console.log(e)
            })

    }


    const onChange = (e) => {
        setName(e.target.value)
        setValid(e.target.value !== '')
    }
    return (
        <form onSubmit={onSubmit}>
            <video ref={videoRef}></video>
            <br />
            <label htmlFor='image'>Image</label>
            <br />
            <canvas ref={canvasRef}></canvas>
            <br />
            <button type='button' onClick={takePhoto}>Chụp ảnh</button>
            <br />
            <label htmlFor='name'>Name:</label>
            <input
                id="name"
                name='name'
                type="text"
                value={name}
                onChange={onChange}
            />
            <Button type='submit' className='variant' disabled={!valid}>Submit</Button>
        </form >
    )
}
export default FaceRegisterFrom