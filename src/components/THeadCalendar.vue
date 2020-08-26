<template>
      <div class="calendar-head">
        <div class="calendar-head__row">
            <div
                    class="calendar-head__cell calendar__cell"
                    v-for="weekDay of weekDays"
                    :key="weekDay"
            >
                {{weekDay}}
            </div>
        </div>
      </div>
</template>

<script>
    export default {
        props:[
            'weekDays',
        ]
        }

</script>

<style lang="scss">
    .calendar-head {
        &__row {
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;
        }

        &__cell {
            font-weight: bold;
        }
    }
</style>
