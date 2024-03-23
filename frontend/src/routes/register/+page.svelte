<script lang="ts">
  import { interceptedFetch } from "../../helpers/helpers";
    import { CreateCartDto } from "../../models/cart";
    import CartRepository from "../../repository/cartRepository";

  let error;
  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;
  let address: string;
  let createCartDto = new CreateCartDto();

  let message: string | undefined;
  const addCart = async (createCartDto : CreateCartDto) => {
    try {
        const res = await CartRepository.createCart(createCartDto);
        if (res.ok) {
            message = "User was registered successfully and the cart was added!";
        } else {
            message = "User was registered, but failed to add cart.";
        }
    } catch (err) {
        error = "RES002: An error occurred while creating the cart.";
        console.log(err);
    }
  };
  const register = async () => {
    try {
      const res = await interceptedFetch("/users/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          fullName: firstName + " " + lastName,
          address: address,
          username: email.split("@")[0],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const userData = await res.json();
        createCartDto.userId = userData.id;
        message = "User was registered successfully!";
        email = "";
        firstName = "";
        lastName = "";
        password = "";
        address = "";
        await addCart(createCartDto);

      }
    } catch (err) {
      error = "RES001: An error occured.";
    }

  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card custom-card">
        <div class="card-body">
          <form on:submit|preventDefault={register}>
            {#if message}
              <div class="alert alert-success" role="alert">
                {message}
              </div>
            {/if}
            <h3 class="text-center mb-4">Register</h3>
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder="Enter your first name"
                bind:value={firstName}
                required
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                placeholder="Enter your last name"
                bind:value={lastName}
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter your email"
                bind:value={email}
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter your password"
                bind:value={password}
                required
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter your address"
                bind:value={address}
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Register</button
            >
            <p class="text-center mt-3">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  a {
    text-decoration: none;
  }
</style>
