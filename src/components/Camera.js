import { useEffect, useRef } from "react";
import * as faceapi from 'face-api.js'

const Camera = () => {
    const camRef = useRef(null);
    const canvasRef = useRef(null)
    useEffect(() => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),

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
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
        }, 100)
    }
    return (
        <>
            <video ref={camRef} onPlay={playHandle} style={{ position: 'absolute' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 999 }} />
            <button style={{ position: 'absolute', zIndex: '10000', top: '410px', borderRadius: '10px', backgroundImage: 'linear-gradient(to right, #16A085 0%, #F4D03F  51%, #16A085  100%)', color: 'white', fontWeight: 'bold', padding: '3px 5px', cursor: 'pointer', border: 'none' }}>Some function</button>
            <div style={{ position: 'absolute', background: 'rgba(255, 255, 255, .4)', width: '720px', textAlign: 'center', top: '440px'}}>
                Name goes here
            </div>
        </>
    )
}
export default Camera