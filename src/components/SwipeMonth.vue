<template>
    <div class="swipe">
        <button
                class="swipe__button"
                v-on:click="$emit('swipePrevMonth')"
        >
            <img src="../assets/img/left-arrow.svg">
        </button>
        <div
                class="swipe__text"
        >
            {{`${months[month]}, ${year}`}}
        </div>
        <button
                class="swipe__button"
                v-on:click="$emit('swipeNextMonth')"
        >
            <img src="../assets/img/right-arrow.svg">
        </button>
    </div>
</template>

<script>
    export default {
        props: [
            "year",
            "month",
            "months",
        ]
    }
</script>

<style lang="scss">
    @import "../css-assets/fonts";
    .swipe {
        display: flex;
        justify-content: space-between;
        width: 288px;
        padding: 18px 15px 15px;
        box-sizing: border-box;

        &__button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 23px;
            height: 23px;
            padding: 0;
            background-color: #fff;
            outline: none;
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid black;
        }

        &__text {
            font-family: PT Sans, sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
        }
    }
</style>
