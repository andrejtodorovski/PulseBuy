<script>
  import { isUserLoggedIn, removeAuthToken } from "../helpers/helpers";
  import "../styles/global.css";
</script>

<div class="footer">
  <div class="container pb-3">
    <section>
      <footer class="text-center text-white">
        <div class="container p-5 pb-1">
          <div class="row d-flex justify-content-center">
            <div class="col-md-4">
              <img
                src="https://i.ibb.co/1sYbSM7/image-2024-03-04-224316654.png"
                class="logo"
                alt="logo"
                width="250"
              />
            </div>
            <div class="col-md-4">
              <p class="d-flex justify-content-center align-items-center">
                <a href="/"> About us </a>
              </p>
              <p class="d-flex justify-content-center align-items-center">
                <a href="/">Contact</a>
              </p>
            </div>
            <div class="col-md-4">
              {#if isUserLoggedIn()}
                <p class="d-flex justify-content-center align-items-center">
                  <span class="me-3">View my profile</span>
                  <a href="/profile" class="btn btn-outline-light">
                    My profile
                  </a>
                </p>
                <p class="d-flex justify-content-center align-items-center">
                  <span class="me-3">Log out of your account</span>
                  <button class="btn btn-warning" on:click={removeAuthToken}
                    >Logout</button
                  >
                </p>
              {:else}
                <p class="d-flex justify-content-center align-items-center">
                  <span class="me-3">Register for free</span>
                  <a href="/register" class="btn btn-warning"> Sign up! </a>
                </p>
                <p class="d-flex justify-content-center align-items-center">
                  <span class="me-3">Already have an account?</span>
                  <a href="/login" class="btn btn-outline-light"> Sign in! </a>
                </p>
              {/if}
            </div>
          </div>
        </div>
        <div class="text-center p-1">© 2024 Copyright: PulseBuy</div>
      </footer>
    </section>
  </div>
</div>

<style>
  .footer {
    background-color: #232327;
  }
  a {
    color: white;
  }
</style>
