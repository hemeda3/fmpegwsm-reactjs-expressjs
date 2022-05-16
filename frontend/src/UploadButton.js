import * as React from 'react';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {AudioFile, UploadFile, VideoFile} from "@mui/icons-material";
import {createFFmpeg} from '@ffmpeg/ffmpeg';

const Input = styled('input')({
    display: 'none',
});

export default function UploadButtons({childToParent}) {


    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [videoSrc, setVideoSrc] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [message, setMessage] = useState('Click Start to transcode');

    const changeHandler = (event) => {
         console.log('onClick1');
        setSelectedFile(event.target.files[0]);
        console.log(event)
        setIsFilePicked(true);
    };




    const doTranscode = async () => {
        const ffmpeg = createFFmpeg({
            log: true,
        });
        setMessage('Loading ffmpeg-core.js');
        await ffmpeg.load();
         setMessage('Start transcoding');

        const array = new Uint8Array(await selectedFile.arrayBuffer());
        const fileName = await selectedFile.name;

        const fileNameMp3 = await selectedFile.name + '.mp3';
        console.log(fileName + " " + fileNameMp3);
        ffmpeg.FS('writeFile', fileName, array);

        await ffmpeg.run( '-i',  fileName, '-ar', '16000','-vcodec', 'libmp3lame', fileNameMp3);

        setMessage('Complete transcoding');
        const mp3Data = ffmpeg.FS('readFile', fileNameMp3);

         setAudioSrc(URL.createObjectURL(new Blob([mp3Data.buffer], { type: 'audio/mpeg' })));

    };
    const doPayment = async () => {

    };

    const doRequestSas = async () => {

    };
    const doUploadToSas = async () => {

    };


    return (
        <Stack color={"whitesmoke"} direction="column" alignItems="center" spacing={2}>

            <label htmlFor="icon-button-file">
                <Input accept="*/*" id="icon-button-file" type="file"  onChange={changeHandler}/>
                <IconButton onClick={() => { console.log('onClick'); }} color="primary" aria-label="upload picture" component="span">
                    <AudioFile />
                    <VideoFile/>
                    <UploadFile/>
                </IconButton>

            </label>
            <div>

                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                        <p>
                            <audio src={audioSrc} controls/><br/>

                            <button onClick={doTranscode}>Start</button>
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
                </div>
        </Stack>
    );
}
