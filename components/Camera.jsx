import { useEffect, useState, useRef } from "react";

const Camera = () => {
    const [cameras, setCameras] = useState([]);
    const [mics, setMics] = useState([]);
    const [screenLock, setScreenLock] = useState(null);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

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

    function stopRecording() {

    function saveRecording(stream) {
        //save the stream to file system
    }

    function stopRecording() {
        console.log(videoRef.current);
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        //stop everything
        tracks.forEach(track => {
            track.stop();
        })
        //Save video to filesystem
        saveRecording(stream);
    }

    const screenLockApi = async () => {
        const lockExists = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        console.log("check authenticator", lockExists);
        if (lockExists) {
            const serverOptions = {
                challenge: new TextEncoder().encode("skjyuhdfvbskvgb"),
                timeout: 60000,
                rp: {
                    name: "SafeStream"
                },
                user: {
                    name: "John Doe",
                    displayName: "John Doe",
                    id: new TextEncoder().encode("john.doe"),
                },
                pubKeyCredParams: [
                    {
                        type: "public-key",
                        alg: -7
                    },
                    {
                        type: "public-key",
                        alg: -257
                    }
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                },
            }
            const credential = await navigator.credentials.create({
                publicKey: serverOptions
            });
            console.log(credential);
        }
    }

    const startRecording = async () => {
        await screenLockApi();
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    let video = videoRef.current;
                    video.srcObject = stream;
                    streamRef.current = stream;
                    video.play().catch(err => console.log(err));
                })
                .catch(err => console.error(err));
            getDevices();
        }
    }

    useEffect(() => {
        startRecording();
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
            <button className="bg-red-500 text-white text-3xl p-4 mt-4 rounded-lg" onClick={stopRecording}>STOP</button>
            <button className="bg-green-500 text-white text-3xl p-4 mt-4 rounded-lg" onClick={startRecording}>START (DEBUG ONLY)</button>
        </>
    );
}

export default Camera;