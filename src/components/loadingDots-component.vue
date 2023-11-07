<template>
  <div class="loading-dots">
    <div class="dot-collision"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  block-size: 35px;
}

.dot-collision {
  position: relative;
  inline-size: 10px;
  block-size: 10px;
  border-radius: 5px;
  background-color: #229954;
  color: red;
}

.dot-collision::before,
.dot-collision::after {
  content: "";
  display: inline-block;
  position: absolute;
  inset-block-start: 0;
}

.dot-collision::before {
  inset-inline-start: -10px;
  inline-size: 10px;
  block-size: 10px;
  border-radius: 5px;
  background-color: #229954;
  color: #229954;
  animation: dotCollisionBefore 1s infinite ease-in;
}

.dot-collision::after {
  inset-inline-start: 10px;
  inline-size: 10px;
  block-size: 10px;
  border-radius: 5px;
  background-color: #229954;
  color: #229954;
  animation: dotCollisionAfter 1.5s infinite ease-in;
  animation-delay: 0.5s;
}

@keyframes dotCollisionBefore {
  0%,
  50%,
  75%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
}

@keyframes dotCollisionAfter {
  0%,
  50%,
  75%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(15px);
  }
}
</style>
