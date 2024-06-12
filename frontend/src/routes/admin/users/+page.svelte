<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { getUserId, interceptedFetch, isUserAdmin } from "../../../helpers/helpers";
    import type { User } from "../../../models/user";
    import { toasts } from "svelte-toasts";
    import { goto } from "$app/navigation";

    const users = writable<User[]>([]);

    async function fetchUsers() {
        const response = await interceptedFetch('/users', {});
        const data = await response.json();
        const filteredData = data.filter(user => user.id != getUserId());
        users.set(filteredData);
    }

    async function updateUserPermission(user: User) {
        const res = await interceptedFetch(`/users/${user.id}/update-permissions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        if (res.ok) {
            if (user.isAdmin) {
                toasts.success(`User ${user.fullName} now has admin permissions`);
            } else {
                toasts.warning(`User ${user.fullName} no longer has admin permissions`);
            }
        }
        await fetchUsers();
    }

    onMount(async () => {
        if (!isUserAdmin()) {
            await goto("/unauthorized")
        } else {
            await fetchUsers();
        }
    });
</script>

<style>
    .container {
        margin-top: 50px;
    }

    .card {
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        background-color: white;
    }

    .card-header {
        background-color: var(--dark-blue);
        color: var(--gray);
        border-radius: 10px 10px 0 0;
        text-align: center;
    }

    .form-check {
        display: flex;
        align-items: center;
    }

    .form-check-input {
        margin-right: 10px;
    }
</style>

<div class="container">
    <div class="card">
        <div class="card-header">
            <h3>Manage User Permissions</h3>
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Admin Permission</th>
                </tr>
                </thead>
                <tbody>
                {#each $users as user (user.id)}
                    <tr>
                        <th scope="row">{user.id}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <div class="form-check">
                                <input
                                        class="form-check-input"
                                        type="checkbox"
                                        bind:checked={user.isAdmin}
                                        on:change={() => updateUserPermission(user)}
                                />
                                <span class="form-check-label">
                                    Has admin permissions
                                </span>
                            </div>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>