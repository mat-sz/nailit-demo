import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import nailIt from 'nailit';

import './App.scss';

function App() {
    const [ file, setFile ] = useState(null);
    const [ fileURL, setFileURL ] = useState(null);
    const [ thumbnailURL, setThumbnailURL ] = useState(null);

    const [ maxSize, setMaxSize ] = useState(250);
    const [ cover, setCover ] = useState(false);

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        setFileURL(reader.result);
    }, false);

    useEffect(() => {
        if (file) {
            reader.readAsDataURL(file);
        }
    }, [ file, reader ]);

    useEffect(() => {
        if (fileURL) {
            nailIt(fileURL, maxSize, cover).then((url) => setThumbnailURL(url));
        }
    }, [ fileURL, maxSize, cover ]);

    return (
        <div className="app">
            <header>
                <h1>nailit demo</h1>
                <span>Generate thumbnails on the fly within the browser. <a href="https://github.com/mat-sz/nailit/">GitHub project.</a></span>
            </header>
            <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} accept="image/jpeg, image/png" />
                        <p>Drag and drop an image file here</p>
                        <p className="dropzone__or">
                            <span>or</span>
                        </p>
                        <p>click on this area to open a file selection dialog.</p>
                    </div>
                </section>
                )}
            </Dropzone>
            <section className="settings">
                <h2>Settings:</h2>
                <table className="settings__table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>maxSize</td>
                            <td><input type="number" value={maxSize} onChange={(e) => setMaxSize(+e.target.value)} min={50} max={500}/></td>
                            <td>Maximum width or height (px). Default: 250.</td>
                        </tr>
                        <tr>
                            <td>cover</td>
                            <td><input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} /></td>
                            <td>When true this will cause the thumbnail to be a square and image will be centered with its smallest dimension becoming as large as maxDimension and the overflow being cut off. Default: false.</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="output">
                <h2>Output:</h2>
                {thumbnailURL ? 
                    <img className="output__image"
                        src={thumbnailURL}
                        alt="The thumbnail generated with nailit." />
                :
                    <span>Upload an image first.</span>
                }
            </section>
        </div>
    );
}

export default App;
