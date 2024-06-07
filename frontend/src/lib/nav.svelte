<script lang="ts">
  import { getUserId, isUserAdmin, isUserLoggedIn, removeAuthToken } from "../helpers/helpers";
  import "../styles/global.css";
  import { onMount } from "svelte";
  import NotificationManagerRepository from "../repository/notificationManagerRepository.js";
  import { type InAppNotification, InAppNotificationStatus } from "../models/inAppNotification";
  import { io } from "$lib/webSocketConnection";
  import { toasts } from "svelte-toasts";

  let showSearch = false;
  let search = "";
  let showNotifications = false;
  let notifications: InAppNotification[] = [];

  function showSearchInput() {
    showSearch = !showSearch;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchProducts();
    }
  }

  async function searchProducts() {
    // TODO() - implement
  }

  function toggleNotifications() {
    showNotifications = !showNotifications;
  }

  function markAsRead(notificationId) {
    NotificationManagerRepository.markNotificationAsRead(notificationId);
  }

  function markAllAsRead() {
    const userId = getUserId();
    NotificationManagerRepository.markAllNotificationsAsRead(userId);
  }

  function formatDate(dateString) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  async function fetchNotifications() {
    const res = await NotificationManagerRepository.getNotificationsForUser(getUserId()!);
    const nots = await res.json();

    if (res.ok) {
      notifications = nots;
    }
  }

  onMount(() => {
    if (isUserLoggedIn()) {
      const roomId = `NotificationManager/${getUserId()}`;

      io.emit("joinRoom", roomId);

      io.on("NotificationManager.NotificationAddedToManagerEvent", (event) => {
        fetchNotifications();
        toasts.success(event.message);
      });

      io.on("NotificationManager.NotificationMarkedAsReadEvent", (event) => {
        fetchNotifications();
      });

      io.on("NotificationManager.AllNotificationsMarkedAsReadForManagerEvent", (event) => {
        fetchNotifications();
      });

      fetchNotifications();
    }
  });

  $: unreadCount = notifications.filter(n => n.status === InAppNotificationStatus.UNREAD).length;
</script>

<header class="header-container">
  <nav class="container d-flex align-items-center">
    <div>
      <a href="/">
        <img
          src="https://i.ibb.co/Nx37JfH/image-2024-03-22-004420115.png"
          class="logo"
          alt="logo"
          width="250"
        />
      </a>
      <span>
        <input type="text" class="form-control w-40 d-inline-block" placeholder="Search products..." bind:value={search}
               on:keydown={handleKeyDown}>
        <a href="" class="cursor-pointer" on:click={searchProducts}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
               viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </a>
      </span>
    </div>
    <div class="links">
      <a href="/">Home</a>
      <a href="/about-us">About Us</a>
      {#if isUserLoggedIn()}
        <a href="/products">Products</a>
        {#if isUserAdmin()}
          <a href="/admin/orders">Orders</a>
          <a href="/admin">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
              <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
              <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
            </svg>
          </a>
        {:else}
          <a href="/orders">Orders</a>
          <a href="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </a>
        <a href="/wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>
        </a>
        <a href="/cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-cart-fill" viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </a>

        <a href="" class="cursor-pointer" on:click={toggleNotifications} style="position: relative;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill"
               viewBox="0 0 16 16">
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
          </svg>
          {#if unreadCount > 0}
            <span class="notification-badge">{unreadCount}</span>
          {/if}
          {#if showNotifications}
            <div class="notifications-dropdown">
              <button class="mark-all-read" on:click={markAllAsRead}>Mark all as read</button>
              <ul>
                {#each notifications as notification}
                  <li class:unread={notification.status === "UNREAD"}>
                    <div>{notification.body}</div>
                    <div class="notification-date">{formatDate(notification.createdAt)}</div>
                    {#if notification.status === "UNREAD"}
                      <button class="mark-read" on:click={() => markAsRead(notification.id)}>Mark as read</button>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </a>
        {/if}
        <a on:click={removeAuthToken} href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
            <path fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
          </svg>
        </a>
      {:else}
        <a href="/login">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </a>
      {/if}
    </div>
  </nav>
</header>

<style>
    .links {
        margin-left: auto;
        position: relative;
    }

    a {
        margin-left: 10px;
        font-weight: normal;
    }

    .header-container {
        background-color: var(--darkest-blue);
    }

    .logo {
        display: inline-block;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .w-40 {
        width: 40%;
    }

    .notifications-dropdown {
        position: absolute;
        top: 30px;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 300px;
        z-index: 1000;
        color: #1e293b !important;
    }

    .notifications-dropdown ul {
        list-style: none;
        padding: 10px;
        margin: 0;
    }

    .notifications-dropdown li {
        padding: 8px 12px;
        border-bottom: 1px solid #eee;
    }

    .notifications-dropdown li:last-child {
        border-bottom: none;
    }

    .notifications-dropdown li:hover {
        background-color: #f5f5f5;
    }

    .notifications-dropdown .notification-date {
        font-size: 0.8em;
        color: rgb(128, 128, 128);
    }

    .notifications-dropdown .mark-read {
        font-size: 0.8em;
        background: none;
        border: none;
        color: blue;
        cursor: pointer;
    }

    .notifications-dropdown .mark-read:hover {
        text-decoration: underline;
    }

    .notifications-dropdown .mark-all-read {
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        color: blue;
        cursor: pointer;
        padding: 8px 12px;
        border-bottom: 1px solid #eee;
    }

    .notifications-dropdown .mark-all-read:hover {
        text-decoration: underline;
    }

    .notification-badge {
        background: red;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.6em;
        position: absolute;
        top: -5px;
        right: -5px;
    }

    .unread {
        font-weight: bold;
    }
</style>
