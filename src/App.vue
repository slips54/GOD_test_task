<template>
  <div id="app">
    <nav id="nav">
      <router-link class="nav-link" to="/">Prizelist</router-link>
      <router-link class="nav-link" to="/free-pass">Free Pass</router-link>
      <router-link class="nav-link" to="/pvp-stat">PvP Stat</router-link>
      <router-link class="nav-link" to="/progress">Progeress</router-link>
      <router-link class="nav-link" to="/shop">Shop</router-link>
    </nav>
    <router-view/>
  </div>
</template>