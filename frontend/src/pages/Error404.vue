<template>
  <div class="errorpage">

    <div class="featured-panel">
      <div class="title">404</div>
      <div class="subtitle">Page not found.</div>
      <div class="cta">
        <router-link to="/" class="button primary-button">
          <span class="link-text">Go back</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>


.errorpage {
  background: rgb(247, 247, 255);
}


  #illustration-wrapper {
    position: absolute;
    top: 100px;
    right: 200px;
    display: flex;
    flex-direction: column;

    .illustration {
      position: relative;
      width: 200px;
      margin: 1rem auto;

      &:last-child {
        /* margin; */
      }

      &:nth-child(2) {
        margin-left: 100px;
      }

      &:first-child {
        /* margin-top: 400px; */
      }
    }
  }


  .featured-panel {
    width: 100%;
    background: rgb(247, 247, 255);

    height: calc(100vh - 50px);
    max-width: 90vw;
    margin: 0 auto;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 2.2rem;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 600;
      color: #5F5CFF;
    }

    .subtitle-2 {
      margin-top: 2rem;
      font-size: 1.5rem;
      font-weight: 400;
      color: #666;
    }

    .cta {
      margin-top: 2rem;


        .primary-button, .secondary-button {
          text-decoration: none;
          padding: auto 2rem;
          transition: background-color 100ms linear;
          border-radius: 4px;
        }

        .primary-button {
          background-color: #5F5CFF;
          border: 1px solid #5F5CFF;
          color: #fff;

          &:hover {
            background-color: rgb(51, 47, 255);
          }
        }

        .secondary-button {
          color: #5F5CFF;
          margin-left: 1rem;
          border: 1px solid #5F5CFF;

          &:hover {
            border: 1px solid rgb(51, 47, 255);
            color: rgb(51, 47, 255);
          }
        }
    }
  }

</style>
