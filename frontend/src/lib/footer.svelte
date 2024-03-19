<script>
  import { isUserLoggedIn, removeAuthToken } from "../helpers/helpers";
  import "../styles/global.css";
</script>

<footer class="text-center text-white p-4 mt-5">
  <div class="container pb-3">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4 pt-2">
        <img
          src="https://i.ibb.co/1sYbSM7/image-2024-03-04-224316654.png"
          class="logo"
          alt="logo"
          width="250"
        />
      </div>
      <div class="col-md-4 pt-2">
        <p class="d-flex justify-content-center align-items-center">
          <a href="/about-us"> About us </a>
        </p>
        <p class="d-flex justify-content-center align-items-center">
          <a href="/contact">Contact</a>
        </p>
      </div>
      <div class="col-md-4 pt-2">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <h5>Subscribe to our Newsletter</h5>
          <form class="d-flex">
            <input
              type="email"
              placeholder="Enter your email"
              class="form-control me-2"
            />
            <button type="submit" class="btn btn-light">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center p-1">© 2024 Copyright: PulseBuy</div>
</footer>

<style>
  footer {
    background-color: #232327;
  }
  a {
    color: white;
  }
</style>
