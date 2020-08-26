<template>
    <div class="bar">
        <button
                v-on:click="$emit('filterFromBar', 'весь период')"
                class="bar__button"
        >
            Весь срок
        </button>
        <button
                v-on:click="$emit('filterFromBar', 'сегодня')"
                class="bar__button"
        >
            Сегодня
        </button>
        <button
                v-on:click="$emit('filterFromBar', 'вчера')"
                class="bar__button"
        >
            Вчера
        </button>
        <button
                v-on:click="$emit('filterFromBar', 'последние 7 дней')"
                class="bar__button"
        >
            Последние 7 дней
        </button>
        <button
                v-on:click="$emit('filterFromBar', 'последние 30 дней')"
                class="bar__button"
        >
            Последние 30 дней
        </button>
        <button
                class="bar__button"
                v-on:click="$emit('filterFromBar', 'в этом месяце')"
        >
            В этом месяце
        </button>
        <button
                class="bar__button"
                v-on:click="$emit('filterFromBar', 'прошлый месяц')"
        >
            Прошлый месяц
        </button>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    .bar {
        width: 176px;
        height: 100%;
        padding: 18px 10px 10px;
        box-sizing: border-box;
        margin-right: 8px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(128, 158, 191, 0.2);

        &__button {
            display: block;
            width: 100%;
            height: 40px;
            border: 2px solid #fff;
            outline: none;
            text-align: left;
            background-color: #fff;
            font-family: PT Sans, sans-serif;
            font-weight: 400;
            font-size: 15px;
            line-height: 19px;
            cursor: pointer;
            border-radius: 5px;
            transition: border 0.5s;
        }

        &__button:hover {
            border: 2px solid #EBEEF3;
        }
    }
</style>
