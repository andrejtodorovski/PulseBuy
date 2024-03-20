import { interceptedFetch } from "../helpers/helpers";
import type { CreateNewsletterDto } from "../models/newsletter";

class NewsletterRepository {
  subscribeToNewsletter = (newsletter: CreateNewsletterDto): Promise<Response> => {
    return interceptedFetch("http://localhost:3000/newsletter", {
      method: "POST",
      body: JSON.stringify(newsletter),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
export default new NewsletterRepository();
