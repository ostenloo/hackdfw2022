import { useEffect, useState, useRef } from "react";

const Camera = () => {
    const [cameras, setCameras] = useState([]);
    const [mics, setMics] = useState([]);

    const videoRef = useRef(null);

    const getDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        console.log(cameras);
        const mics = devices.filter(device => device.kind === "audioinput");
        console.log(mics);
        setCameras(cameras);
        setMics(mics);
        return;
    }

    useEffect(() => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => console.error(err));
            getDevices();
        }

    }, []);

    return (
        <>
            <h1 className="text-5xl mb-4">Welcome to SafeStream</h1>
            <div className="max-w-[1280px]">
                <video ref={videoRef} autoPlay muted></video>
            </div>
            <div className="max-w-[1250px]">
                <h1 className="text-3xl mt-4 overflow-hidden">THE APP IS CURRENTLY RECORDING YOUR CAMERA AND MICROPHONE. PRESS THE BUTTON ONLY WHEN THREAT IS NO LONGER PRESENT.</h1>
            </div>
            <button className="bg-red-500 text-white text-3xl p-4 mt-4 rounded-lg">STOP</button>
        </>
    );
}

export default Camera;