import { useEffect, useRef, useState } from "react";

const Camera = () => {
    const videoRef = useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    async function stopRecording() {
        var R = document.getElementById("R");
        var G = document.getElementById("G");
        R.style.display = "none";
        G.style.display = "block";
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
        var R = document.getElementById("R");
        var G = document.getElementById("G");
        R.style.display = "block";
        G.style.display = "none";
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
        }
    }

    useEffect(() => {
        async function pageLoad() { await startRecording(); }
        pageLoad();
    }, []);

    return (
        <div className="w-[100%]">
            <h1 className="text-6xl font-bold mb-6 text-spacecadet mx-auto relative text-center">SafeStream (Press Shift to Switch back)</h1>
            <div className="relative max-w-[1280px] border-8 mx-2 md:mx-auto md:w-1/2 md:p-2 rounded-[16px] overflow-hidden bg-white border-queenblue"> 
                <video ref={videoRef} autoPlay muted className="rounded-[8px]"/>
                <button id="R" className="absolute right-0 left-0 mx-auto top-[25%] md:top-[40%] bg-red-500 text-white font-bold text-6xl py-8 max-w-[15rem] max-h-[15rem] md:max-w-[20rem] md:max-h-[20rem] rounded-full" onClick={stopRecording}>STOP</button>
                <button id="G" className="absolute right-0 left-0 mx-auto top-[25%] md:top-[40%] bg-green-500 text-white font-bold text-6xl py-8 max-w-[15rem] max-h-[15rem] md:max-w-[20rem] md:max-h-[20rem] rounded-full" onClick={startRecording}>START</button>
                {/* <video className="my-4" ref={videoRef2} autoPlay muted /> */}
            </div>
            <div className="">
                <p className="text-md mt-2 mb-4 overflow-hidden text-spacecadet text-center"> This is the secret page of SafeStream which you can access by pressing 
                Shift on the Keyboard. SafeStream is currently recording your video and audio. The default landing page for SafeStream is disguised as Google, to act as a decoy. 
                Your video will automatically begin recording the moment you load SafeStream. Press STOP to upload the recording. In the disguised Google page, 
                the Sign in button will act as the STOP button. </p>
            </div>
            {/* <button className="bg-green-500 text-white text-3xl p-4 mt-4 rounded-lg" onClick={startRecording}>START (DEBUG ONLY)</button> */}
        </div>
    );
}

export default Camera;