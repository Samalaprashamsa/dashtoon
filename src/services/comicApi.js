// comicApi.js
import './comicApi.css';

const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
const API_KEY = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

const headers = {
  "Accept": "image/png",
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const generateComic = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ inputs: text }),
      });
  
      const result = await response.blob();
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error: ${response.statusText}. Details: ${errorMessage}`);
        throw new Error(`Error: ${response.statusText}. Details: ${errorMessage}`);
      }
  
      return result;
    } catch (error) {
      console.error("Error generating comic:", error.message);
      throw error;
    }
  };
  

export { generateComic };
