import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Fileupload() {

    const [Filetitle, setFiletitle] = useState(''); //This is for the title of the pdf or file we will upload


    const [File, setFile] = useState(''); // This is for hte file we upload for audio conversion 
    // functions to save tiltle

    const [Style, setStyle] = useState(false);

    const savetitle = (event) => {
        console.log(Filetitle);
        setFiletitle(event.target.value);
        console.log(Filetitle);

    }

    const savefile = async (event) => {
        if (event.target.files[0]) {
            setStyle(true);
            setFile(event.target.files[0]);
            console.log(event.target.files[0]);
            console.log(Style);
            console.log(File);
        }
    }

    const submitchange = async (event) => {
        try{
            event.preventDefault();
            const formdata = new FormData();
            formdata.append("Title", Filetitle);
            formdata.append("File", File);
    
            console.log(formdata);
            console.log(File);
            console.log(Style);
            console.log(Filetitle);
    
            const result= await axios.post("http://localhost:8091/api/rpdf/save",formdata,{
                headers:{"Content-Type":"multipart/form-data"},
            });
            console.log(result);
            if (result.status===200){
                toast.success(result.message)
            }
        }catch{
            toast.error("Uploading Failed");

        }
       
       

    }


    return (
        <div >

            <ToastContainer />
            <form onSubmit={submitchange} className="w-full h-[500px] bg-[#D9D9D9] justify-center items-center flex flex-row row-span-1 gap-14">
                <div className="w-[40%] h-[80%] rounded-lg bg-[#F2F2F2]">
                    <div className='flex flex-row justify-between'>
                        <h1 className="m-4 text-2xl font-sans">Upload file</h1>
                        <h1 className="m-4 text-2xl font-sans">
                            <FontAwesomeIcon icon={faTimes} />
                        </h1>
                    </div>

                    <div>
                        <input type='text' className='flex justify-center my-7 px-8 text-center mx-auto w-[80%] h-[40px] border-[2px] rounded-lg border-dashed border-[blue]' placeholder='File Name' onChange={savetitle} name='title' value={Filetitle.title}></input>

                        {/* this is to upload the file  */}

                        <input type='file' className={`flex flex-col mx-auto items-center justify-center w-[80%] p-6 border-2 border-dashed ${setStyle ? "border-gray-700" : "border-blue-700 bg-blue-400"} rounded-lg cursor-pointer transition duration-300`} placeholder='Select File' accept='.jpg,.png,.pdf,.jpeg' onChange={savefile} name="file" value={File.file}></input>
                    </div>


                    <button className='w-[40%] text-center bg-[#625252] font-serif h-[40px] flex justify-center mx-auto border-[2px] border-[#dba5a5]  m-8' >Upload</button>
                </div>


                {/* this will show the pdf we will upload */}
                <div className="w-[40%] h-[80%] rounded-lg bg-[#F2F2F2]">
                    <div className='flex flex-row justify-center'>
                        <h1 className="m-4 text-2xl font-sans">Uploaded file</h1>
                       
                    </div>
                </div>

            </form>

        </div>


    )
}