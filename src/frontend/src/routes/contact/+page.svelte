<script lang="ts">
  import { goto } from "$app/navigation";
  import { SendContact } from "../../models/contact";
  import ContactRepository from "../../repository/contactRepository";
  import { toasts } from "svelte-toasts";

  let contact = new SendContact();
  let message: string | undefined;
  let error: string | undefined;

  const sendContact = async () => {
    try {
      const res = await ContactRepository.sendContact(contact);

      if (res.ok) {
        message = "The mail was sent successfully!";
        toasts.success("The mail was sent successfully!");
        goto("/");
      } else {
        message = "Failed to send mail.";
        toasts.error("Failed to send mail.");
      }
    } catch (err) {
      toasts.error("There was a problem with the application");
      console.log(err);
    }
  };
</script>

<div class="container my-5">
  <div class="row">
    <div class="col-md-6 min-height-35vh">
      <div class="card custom-card">
        <div class="card-body p-5">
          <h3 class="card-title">Contact Us</h3>
          <p class="card-text">
            <strong>Address:</strong> 123 Main Street, Anytown, AN 12345
          </p>
          <p class="card-text"><strong>Phone:</strong> (123) 456-7890</p>
          <p class="card-text"><strong>Email:</strong> info@example.com</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card custom-card">
        <div class="card-body">
      <form on:submit|preventDefault={sendContact}>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            bind:value={contact.email}
            required
          />
        </div>
        <div class="mb-3">
          <label for="subject" class="form-label">Subject</label>
          <input
            type="text"
            class="form-control"
            id="subject"
            bind:value={contact.subject}
            required
          />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea
            class="form-control"
            id="message"
            rows="3"
            bind:value={contact.message}
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
      {#if message}
        <p>{message}</p>
      {/if}
      {#if error}
        <p class="text-danger">{error}</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .card-body {
    min-height: 52vh;
  }
</style>
