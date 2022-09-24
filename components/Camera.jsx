import { useEffect, useRef } from "react";

const Camera = () => {
    const loadRef = useRef(false);

    const videoRef = useRef(null);
    const videoRef2 = useRef(null);

    async function stopRecording() {
        await screenLockApi();
        const stream = [videoRef.current.srcObject, videoRef2.current.srcObject];
        const tracks = stream.forEach((stream) => stream.getTracks().forEach((track) => track.stop()));
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
        let cameras = [];
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { min: 1280, ideal: 1920, max: 3840 }, height: { min: 720, ideal: 1080, max: 2160 } }, audio: true })
                .then(stream => {
                    console.log("first", stream);
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play().catch(err => console.log(err));
                })
                .catch(err => console.error(err))
                .finally(() => {
                    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { min: 1280, ideal: 1920, max: 3840 }, height: { min: 720, ideal: 1080, max: 2160 } }, audio: true })
                        .then(stream => {
                            console.log("second", stream);
                            let video = videoRef2.current;
                            video.srcObject = stream;
                            video.play().catch(err => console.log(err));
                        })
                        .catch(err => console.error(err));
                });
        }
    }

    useEffect(() => {
        async function pageLoad() { await startRecording(); }
        if (!loadRef.current) {
            loadRef.current = true;
        } else pageLoad();        
    }, []);

    return (
        <>
            <h1 className="text-5xl mb-4">Welcome to SafeStream</h1>
            <div className="max-w-[1280px]">
                <video ref={videoRef} autoPlay muted />
                <video className="my-4" ref={videoRef2} autoPlay muted />
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