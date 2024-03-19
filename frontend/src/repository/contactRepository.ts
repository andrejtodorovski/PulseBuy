import { interceptedFetch } from "../helpers/helpers";
import type { SendContact } from "../models/contact";

class ContactRepository {
  sendContact = (contact: SendContact): Promise<Response> => {
    return interceptedFetch("http://localhost:3000/contact", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
export default new ContactRepository();