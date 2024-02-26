import axios from "axios";

export async function getImageLinks(images: File[]) {

    const links = [];

    for (let index = 0; index < images.length; index++) {
                
        const formData = new FormData();
    
        formData.append("file", images[index]);
        formData.append("upload_preset", "rbquvjoy");
    
        const response = await axios.post("https://api.cloudinary.com/v1_1/dj7hqxnli/image/upload", formData);
    
        links.push(response.data.url)
        
    }


    return links;
}


