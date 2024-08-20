import { useEffect } from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import { uploadData } from "aws-amplify/storage";


const DefaultStorageManagerExample = () => {
    useEffect(() => {

        const file = document.getElementById("file");
        const upload = document.getElementById("upload");

        if (upload) {
            upload.addEventListener("click", () => {
                const fileReader = new FileReader();
                const fileInput = file as HTMLInputElement;
                const selectedFile = fileInput.files?.[0];
            
                if (selectedFile) {
                    fileReader.readAsArrayBuffer(selectedFile);
            
                    fileReader.onload = async (event) => {
                        if (event.target) {
                            console.log("Complete File read successfully!", event.target.result);
                            try {
                                await uploadData({
                                    data: event.target.result as ArrayBuffer,
                                    path: selectedFile.name
                                });
                            } catch (e) {
                                console.log("error", e);
                            }
                        }
                    };
                }            });
        }
            
    }, []);

    return (
        <StorageManager
            acceptedFileTypes={['image/*']}
            path="public/"
            maxFileCount={1}
            isResumable
        />
    );
};

export default DefaultStorageManagerExample;