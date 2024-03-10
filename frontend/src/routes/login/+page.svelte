<script lang="ts">
  // import { session } from '$app/stores';
  import { goto } from "$app/navigation";
  import { interceptedFetch, setAuthToken } from "../../helpers/helpers";
  let username: string;
  let password: string;
  let error: string | undefined;
  const login = async () => {
    error = undefined;
    try {
      const res = await interceptedFetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setAuthToken(data.token);

        // $session.user = data.user;
        // goto("/");
        window.location.href = "/";
      } else {
        const data = await res.json();
        error = `Incorrect email or password. Please try again.`;
      }
    } catch (err) {
      console.log(err);
      error = "Something went wrong. Please try again later.";
    }
  };
</script>

<div class="container mt-4 w-50">
  <div
    class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md w-full"
  >
    <form class="space-y-6" on:submit|preventDefault={login}>
      <div class="d-flex align-items-center mb-3">
        <a class="me-3" href="/"><i class="bi bi-arrow-left"></i></a>
        <h2 class="text-xl font-medium">Login</h2>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          required
          name="username"
          placeholder="Enter your username"
          bind:value={username}
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Your password</label>
        <input
          type="password"
          required
          name="password"
          placeholder="Enter your password"
          bind:value={password}
          class="form-control"
        />
      </div>
      {#if error}
        <div class="text-danger">
          {error}
        </div>
      {/if}
      <button type="submit" class="btn btn-primary">Log in</button>
      <p class="text-center mt-3">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </form>
  </div>
</div>

<svelte:head>
  <title>Login</title>
</svelte:head>
