<template>
    <div class="filter">
        <button
                v-on:click="$emit('cancelFiltering', null)"
                class="filter__button filter__cancel-button"
        >
            Отмена
        </button>
        <button
                v-on:click="$emit('filteringArrayDays')"
                :class="{filter__accept_disabled: isDisabledAcceptButton}"
                class="
                filter__button
                filter__accept-button"
                :disabled="isDisabledAcceptButton"
        >
            Обновить
        </button>
    </div>
</template>

<script>
    export default {
        props: [
            "isDisabledAcceptButton",
        ]
    }
</script>

<style lang="scss">
    @import "../css-assets/fonts";

    .filter {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 288px;
        height: 65px;
        padding: 10px;

        &__button {
            width: 130px;
            height: 45px;
            border-radius: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            font-family: Montserrat, sans-serif;
            font-weight: 600;
            font-size: 12px;
            line-height: 150%;
            cursor: pointer;
            outline: none;
        }

        &__cancel-button {
            background-color: #fff;
            border: 2px solid black
        }

        &__accept-button {
            background-color: #FF7439;
            color: #fff;
            border: none;
        }

        &__accept_disabled {
            background-color: rgba(255, 116, 57, 0.5);
        }
    }
</style>
