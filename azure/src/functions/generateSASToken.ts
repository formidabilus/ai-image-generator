import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  app,
} from "@azure/functions";
import generateSASToken from "../../lib/generateSASToken";

app.http("generateSASToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    const sasToken: any = await generateSASToken();

    return { body: sasToken };
  },
});
