import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  app,
} from "@azure/functions";
import generateSASToken from "../../lib/generateSASToken";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;

const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

export async function getImages(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const imageUrls = [];
  const sasToken = await generateSASToken();

  for await (const blob of containerClient.listBlobsFlat()) {
    const imageUrl = `${blob.name}?${sasToken}`;
    const url = `https://${accountName}.blob.core.window.net/images/${imageUrl}`;

    imageUrls.push({ url, name: blob.name });
  }

  const sortedImageUrls = imageUrls.sort((a, b) => {
    const aName = a.name.split("_").pop().toString().split(".").shift();
    const bName = b.name.split("_").pop().toString().split(".").shift();

    return bName - aName;
  });

  context.log(`Http function processed request for url "${request.url}"`);

  return {
    jsonBody: {
      imageUrls: sortedImageUrls,
    },
  };
}

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getImages,
});
