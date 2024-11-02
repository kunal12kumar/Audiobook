import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
export default function Uploadsection() {

    // To handel the drag or drop 
    const [isDragging, setisDragging] = useState(false);
    const [uploadedfile, setuploadedfile] = useState([]);

    // We are creating a state function which will track of uploading the file
    const [uploadtrack, setuploadtrack] = useState(0);

    // This event fires when a file is being dragged over the upload area. Here, event.preventDefault() is called to allow a drop action (by default, files cannot be dropped on elements in the browser). Additionally, setIsDragging(true) is called to set the dragging state to true, which helps in changing the style to indicate that the area is ready to accept a drop.

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setuploadedfile(file);
            console.log("Selected file:", file);
            // Call a function to handle the file upload here
        }
    };

    //to check the upload progress


    const handelChange = async (event) => {
        try {



            // if  file is not uploaded then it will show 0 progress



            if (!uploadedfile) {
                setuploadtrack(0);
            }
            // creating a new in which the file will get stored as a object
            const formData = new FormData();
            formData.append("file", uploadedfile);


            // creating a api to get the progess how much file get uploaded

            // in this we are also sending the object in form of object named formData

            const response = await axios.post("/upload", formData, {
                onuploadtrack: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setuploadtrack(percentage); // Update the progress state
                },
            })
                .then((response) => {
                    toast.success("File uploaded successfully");
                    console.log('file uploaded successfully', response.data);
                    setuploadtrack(0);

                })
                .catch((err) => {
                    toast.erro('File uploaded failed');
                    console.log(err);
                })


        }
        catch {
            toast.error("Wrong Attemp! Try Again")

        }




    }


    const handleDragOver = (event) => {
        event.preventDefault();
        setisDragging(true);


    };

    const handleDragLeave = () => {
        setisDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setisDragging(false);
        const file = event.dataTransfer.files[0];
        // The dataTransfer property of the event object contains information about the files that were dragged and dropped by the user. This object is available when handling drag-and-drop events like onDrop.
        if (file) {
            setuploadedfile(file);
            console.log("Dropped file:", file);
            // Handle file upload here
        }
    };

    // this is when we click on the overspace then file get uploaded by the input when.

    const handleClick = () => {
        document.getElementById("fileInput").click();
    };








    // "drag and drop" is a feature that allows users to upload files by simply dragging them from their computer and dropping them onto a designated area in the application, rather than having to click and manually select the file through a dialog box.

    return (


        // outer part of the uploader page
        <div className="w-full h-[500px] bg-[#D9D9D9] justify-center items-center flex flex-row row-auto">
            {/* this will contain two part in which user will upload the pdf part and also see what they had upoad  */}
            <ToastContainer></ToastContainer>

            <div className=" w-[40%] h-[80%] rounded-lg bg-[#F2F2F2]">

                {/* this will contain the head section  */}

                <div className='flex flex-row justify-between'>
                    <h1 className="m-4 text-2xl font-sans ">Upload file</h1>
                    {/* this is to create the cross to delete that */}

                    <h1 className="m-4 text-2xl font-sans">
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </h1>
                </div>

                {/* uploader section */}
                <div className='flex justify-center flex-col gap-4 items-center'>
                    <div className={`flex flex-col  items-center border-2 ${!isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        } border-dashed rounded-lg p-6 w-80 text-center cursor-pointer transition duration-300`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClick}>

                        {/* here we are doing hidden to show the line  */}
                        <input id='fileInput' onChange={onFileChange} type='file' name='file' accept=".pdf,.jpeg,.jpg,.png" required className='hidden' ></input>

                        <div className="mb-4">
                            {/* <img src="upload-icon.png" alt="Upload Icon" className="w-16 h-16" /> */}
                            <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                        </div>

                        {/* text to show in the place of input */}
                        <p className="text-gray-600">
                            Drag and Drop file here or{" "}
                            <span className="text-blue-500 underline cursor-pointer hover:text-blue-700">
                                Choose file
                            </span>
                        </p>


                    </div>


                    {/* showing the uploading tracker bar */}
                    <div>
                        <button onClick={handelChange} disabled={!uploadedfile}>
                            Upload
                        </button>

                        {uploadtrack > 0 && (
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${uploadtrack}%` }}
                                >
                                    {uploadtrack}%
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* this will contain the pdf showing part */}

            <div className="">

            </div>


        </div>
    )
}