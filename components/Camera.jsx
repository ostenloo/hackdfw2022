import { useEffect, useRef, useState } from "react";

const Camera = () => {
    const videoRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    async function stopRecording() {
        await screenLockApi();
        mediaRecorder.stop();
        const stream = [videoRef.current.srcObject];
        stream.forEach((stream) => stream.getTracks().forEach((track) => track.stop()));
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

    const handleDataAvailable = (e) => {
        console.log("data is available");
        if (e.data.size > 0) {
            const dataArr = [e.data];
            const blob = new Blob(dataArr, { type: "video/webm" });
            uploadAWS(blob);
            const url = URL.createObjectURL(blob);
            const download = document.createElement("a");
            document.body.appendChild(download);
            download.style = "display: none";
            download.href = url;
            download.download = `SafeStream-${new Date(Date.now()).toISOString()}.webm`;
            download.click();
            window.URL.revokeObjectURL(url);
        }
    }

    const uploadAWS = async (blob) => {
        const url = await fetch("/api/aws", {
            method: "GET"
        }).then((res) => res.json()).then((data) => data.uploadURL);
        console.log(url);
        const response = await fetch(url, {
            method: "PUT",
            body: blob,
            headers: {
                "Content-Type": "video/webm"
            }
        }).then((res) => res.text());
        console.log(response);
    }

    const startRecording = async () => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { min: 1280, ideal: 1920, max: 3840 }, height: { min: 720, ideal: 1080, max: 2160 } }, audio: true })
                .then(stream => {
                    console.log("first", stream);
                    const recordingOptions = { mimeType: "video/webm; codecs=vp9" };
                    const r = new MediaRecorder(stream, recordingOptions)
                    setMediaRecorder(r);
                    r.ondataavailable = handleDataAvailable;
                    r.start();
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play().catch(err => console.log(err));
                })
                .catch(err => console.error(err));
            // .finally(() => {
            //     navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { min: 1280, ideal: 1920, max: 3840 }, height: { min: 720, ideal: 1080, max: 2160 } }, audio: true })
            //         .then(stream => {
            //             console.log("second", stream);
            //             let video = videoRef2.current;
            //             video.srcObject = stream;
            //             video.play().catch(err => console.log(err));
            //         })
            //         .catch(err => console.error(err));
            // });
        }
    }

    useEffect(() => {
        async function pageLoad() { await startRecording(); }
        pageLoad();
    }, []);

    return (
        <>
            <h1 className="text-5xl mb-4">Welcome to SafeStream</h1>
            <div className="max-w-[1280px]">
                <video ref={videoRef} autoPlay muted />
                {/* <video className="my-4" ref={videoRef2} autoPlay muted /> */}
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