import { useEffect, useRef } from "react";
import axios from "axios";
import * as faceapi from 'face-api.js'

const Camera = () => {
    const camRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    useEffect(() => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        ])
            .then(() => {
                navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 720,
                        height: 405
                    }
                }).then((stream) => {
                    let video = camRef.current
                    let settings = stream.getVideoTracks()[0].getSettings()
                    video.height = settings.height
                    video.width = settings.width
                    video.srcObject = stream
                    video.play()
                }
                )
            })
        return () => {
        }
    }, [])
    const playHandle = (e) => {
        const video = e.target
        const canvas = canvasRef.current
        canvas.height = video.height
        canvas.width = video.width
        const displaySize = { width: video.width, height: video.height }
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            if (detections.length !== 0) {
                const video = camRef.current
                const canvas = imageRef.current
                var ctx = canvas.getContext('2d')
                const width = video.width
                const height = video.height
                canvas.width = width
                canvas.height = height
                ctx.drawImage(video, 0, 0, width, height)
                const image_base64 = canvas.toDataURL()
                await axios.post('http://localhost:3001/image', {image_base64}).then((res) => {
                    console.log(res.data)
                })
            }
            // const name = await axios.post()
        }, 100)
    }
    return (
        <>
            <video ref={camRef} onPlay={playHandle} style={{ position: 'absolute' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 999 }} />
            <canvas ref={imageRef} style={{ display: "none" }} />
        </>
    )
}
export default Camera