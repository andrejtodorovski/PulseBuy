<script lang="ts">
  import { onMount } from "svelte";
  import { isUserLoggedIn } from "../../helpers/helpers";
  import { goto } from "$app/navigation";
  import UserRepository from "../../repository/userRepository";
  import type { User } from "../../models/user";

  let profile: User | null = null;
    let error = '';

    const loadProfile = async () => {
        try {
            if (localStorage.getItem('userId') == null) {
                return;
            }
            UserRepository.getProfile(localStorage.getItem('userId')!!).then((data) => {
                data.json().then((profileData) => {
                    profile = profileData;
                });
            });

        } catch (e) {
            error = e.message;
        }
    };
    onMount(async () => {
        if (!isUserLoggedIn()) {
            await goto("/")
        } else {
            await loadProfile();
        }
    });

</script>

{#if error}
    <p class="error-message">{error}</p>
{/if}
{#if profile}
    <div class="profile-container">
        <div class="profile-header">
            <h2>User Profile</h2>
        </div>
        <div class="profile-info">
            <p>Full name: {profile.fullName}</p>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Address: {profile.address}</p>
        </div>
    </div>
{/if}
<style>
    .profile-container {
        background-color: #f0f4f8;
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
        margin: 20px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
        text-align: center;
        margin-bottom: 20px;
    }

    .profile-header h2 {
        color: #2c3e50;
        font-size: 24px;
        margin: 0;
    }

    .profile-info p {
        color: #34495e;
        font-size: 18px;
        margin: 10px 0;
    }

    .error-message {
        color: red;
        text-align: center;
    }
</style>