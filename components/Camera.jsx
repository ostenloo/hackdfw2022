import { useEffect, useState } from "react";

const Camera = () => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [cameras, setCameras] = useState([]);

    const getDevices = async() => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        console.log(cameras);
        return cameras;
    }

    useEffect(() => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    setMediaRecorder(mediaRecorder);
                })
                .catch(err => console.error(err));
            setCameras(getDevices());
        }
        
    }, []);
    return (
        <div className="camera">testing</div>
    );
}

export default Camera;