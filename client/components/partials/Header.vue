<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Ingredients Driven Cook Book</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="nav navbar-nav ml-auto w-100 justify-content-end ">
                <router-link to="/" tag="li" active-class="active" exact><a class="nav-link">Home</a></router-link>
                <router-link to="/manager" tag="li" active-class="active" exact><a class="nav-link">Manager</a></router-link>
            </ul>
        </div>
    </nav>

</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style scoepd>
    h3 {
        float: right;
    }
</style>
