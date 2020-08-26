<template>
    <div
            class="calendar"
    >
        <THeadCalendar
                :weekDays="weekDays"
        />
        <TBodyCalendar
                :arrayDays="arrayDays"
                :month="month"
                @handelClick="handelClick"
        />
    </div>
</template>

<script>
    import THeadCalendar from "./THeadCalendar";
    import TBodyCalendar from "./TBodyCalendar";
    export default {
        props: [
            'weekDays',
            'arrayDays',
            'month'
        ],
        components: {
            THeadCalendar,
            TBodyCalendar,
        },
        methods: {
            handelClick: function (day) {
                this.$emit('handelClick', day)
            }
        }
    }
</script>

<style lang="scss">
    .calendar {
        border-spacing: 11px 1px;
        width: 288px;
        padding: 13px;
        box-sizing: border-box;
        background-color: #F3F8FD;

        &__cell {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            font-family: Montserrat, sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            color: #000000;
        }

        &__blur_cell {
            color: rgba(0, 0, 0, 0.2);
        }
    }
</style>
