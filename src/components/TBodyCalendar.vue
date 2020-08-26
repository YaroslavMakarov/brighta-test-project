<template>
    <div class="calendar_body">
        <div
                v-for="days of arrayDays"
                class="calendar_body__row"
        >
            <div
                    v-for="day of days"
                    v-on:click="$emit('handelClick', day.date)"
                    :class="{
                        calendar__blur_cell: day.date.getMonth() !== month,
                        calendar_body__first_filtering_date: day.firstFilterDate,
                        calendar_body__filtering_date: day.filteringDate,
                        calendar_body__last_filtering_date: day.lastFilterDate,
                        calendar_body__single_filtering_date: day.singleFilterDate,
                    }"
                    class="
                    calendar_body__cell
                    calendar__cell
                    calendar_body__cell_active"
            >
                {{day.date.getDate()}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "arrayDays",
            "month"
        ]
    }
</script>

<style lang="scss">
    @import "../css-assets/fonts";
    .calendar_body {

        & :last-child {
            margin-bottom: 0;
        }

        &__row {
           display: flex;
           justify-content: space-between;
           margin-bottom: 2px;
        }

        &__row :first-child:after {
            width: 27px;
        }

        &__row :last-child:before {
            width: 27px;
        }


        &__cell {
            position: relative;
            border-radius: 50%;
            transition: background-color 0.3s;
            box-sizing: border-box;
            cursor: pointer;
        }

        &__cell:before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            height: 100%;
            width: 19.5px;
        }

        &__cell:after {
            content: "";
            position: absolute;
            top: 0;
            right: 50%;
            height: 100%;
            width: 19.5px;
        }

        &__cell:hover {
            background-color:#DFE9F3;
        }

        &__first_filtering_date,
        &__last_filtering_date,
        &__single_filtering_date {
            background-color: #FF7439;
        }

        &__first_filtering_date:hover,
        &__last_filtering_date:hover,
        &__single_filtering_date:hover {
            background-color: #FF7439;
        }

        &__first_filtering_date:after,
        &__last_filtering_date:before,
        &__filtering_date:before,
        &__filtering_date:after {
            background-color: rgba(255, 116, 57, 0.2);
        }
    }
</style>
