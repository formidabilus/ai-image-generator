import { HttpRequest, HttpResponseInit, app } from "@azure/functions";
import openai from "../../lib/openai";
import axios from "axios";
import generateSASToken from "../../lib/generateSASToken";
import { BlobServiceClient } from "@azure/storage-blob";

const accountName = process.env.accountName;

const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    const { prompt }: any = await request.json();

    console.log(`Prompt is ${prompt}`);

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data.data[0].url!;

    //  Download the image and return it as an arraybuffer
    const res = await axios.get(image_url, { responseType: "arraybuffer" });
    const arraybuffer = res.data;

    const sasToken = await generateSASToken();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arraybuffer);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }

    return { body: "Successfully Uploaded Image!" };
  },
});
