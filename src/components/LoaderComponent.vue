<template>
    <div class="loader container">
          <div class="spinner"></div>
          <span class="px-2">apetta un attimino...</span>
        </div>
</template>

<script>
    export default {
        name:'LoaderComponent',
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *; 

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.spinner{
  border: 5px solid #f3f3f3;
  border-top: 5px solid $redTitle;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
} 

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>