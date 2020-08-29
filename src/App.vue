<template>
  <div class="app">
      <div class="app__content">
          <FiltersButtonBar
                  @filterFromBar="setButtonBarFilter"
          />
          <div class="app__calendar">
              <SwipeMonth
                      :year="year"
                      :month="month"
                      :months="months"
                      @swipeNextMonth="nextMonthClick"
                      @swipePrevMonth="prevMonthClick"
              />
              <Calendar
                      :weekDays="weekDays"
                      :arrayDays="arrayDays"
                      :month="month"
                      @handelClick="handleCellClick"
              />
              <AcceptFiltering
                      :isDisabledAcceptButton="isDisabledAcceptButton"
                      @cancelFiltering="setButtonBarFilter"
                      @filteringArrayDays="filteringWithButtonBar"
              />
          </div>
      </div>
  </div>
</template>

<script>

import { weekDays, months } from "./assets/arrays";
import Calendar from "./components/Calendar";
import SwipeMonth from "./components/SwipeMonth";
import AcceptFiltering from "./components/AcceptFiltering"
import FiltersButtonBar from "./components/FiltersButtonBar"
import { intermediateFiltration, singleFiltration } from "./assets/helpers/filteringWithButtonBarHelper";

export default {
  name: 'App',
  data() {
    return {
      weekDays: weekDays,
      months: months,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      firstDayCurrentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      firstDayNextMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      currentDate: new Date(),
      arrayDays: [],
      //variable for filtering with button bar
      buttonBarFilter: null,
      filterDatesArr: [],
    }
  },
  methods: {

    fillArrayDays: function () {
      let arr = [];
      let fullArr = [];

      if (this.firstDayCurrentMonth.getDay() !== 1) {
        while (this.firstDayCurrentMonth.getDay() !== 1) {
            this.firstDayCurrentMonth.setDate(this.firstDayCurrentMonth.getDate() - 1);
        }
      }

      while (this.firstDayCurrentMonth < this.firstDayNextMonth) {

        for (let i = 0; i < 7; i++) {
          arr = [
                  ...arr,
            {
              date: new Date(this.firstDayCurrentMonth.getFullYear(), this.firstDayCurrentMonth.getMonth(), this.firstDayCurrentMonth.getDate()),
              filteringDate: false,
              firstFilterDate: false,
              lastFilterDate: false,
              singleFilterDate: false,
            }
          ];
            this.firstDayCurrentMonth.setDate(this.firstDayCurrentMonth.getDate() + 1)
        }

        fullArr = [...fullArr, arr];
        arr = [];
      }
      this.arrayDays = [...fullArr];
    },

    prevMonthClick: function () {
        if (this.month === 0) {
            this.year = this.year - 1;
            this.month = 11;
            this.firstDayCurrentMonth = new Date(this.year, 11, 1);
            this.firstDayNextMonth = new Date(this.year + 1, 0, 1);
            this.fillArrayDays();
            this.filteringWithButtonBar();
        } else {
            this.month = this.month - 1;
            this.firstDayCurrentMonth = new Date(this.year, this.month, 1);
            this.firstDayNextMonth = new Date(this.year, this.month + 1, 1);
            this.fillArrayDays();
            this.filteringWithButtonBar();
        }
    },

    nextMonthClick: function () {
        if (this.month === 11) {
            this.year = this.year + 1;
            this.month = 0;
            this.firstDayCurrentMonth = new Date(this.year, 0, 1);
            this.firstDayNextMonth = new Date(this.year, 1, 1);
            this.fillArrayDays();
            this.filteringWithButtonBar();
        } else {
            this.month = this.month + 1;
            this.firstDayCurrentMonth = new Date(this.year, this.month, 1);
            this.firstDayNextMonth = new Date(this.year, this.month + 1, 1);
            this.fillArrayDays();
            this.filteringWithButtonBar();
        }
    },

    clearFilteringParams: function () {
        this.buttonBarFilter = null;
        this.filterDatesArr = [];
        this.arrayDays = this.arrayDays.map(week => (
            week.map(day => (
                {
                    ...day,
                    filteringDate: false,
                    firstFilterDate: false,
                    lastFilterDate: false,
                    singleFilterDate: false,
                }
            ))
        ))
    },

    filteringWithButtonBar: function () {
        switch(this.buttonBarFilter) {
            case "весь период":
                this.arrayDays = this.arrayDays.map(week => (
                    week.map(day =>
                    {
                        if (
                            this.currentDate.getFullYear() === day.date.getFullYear()
                            && this.currentDate.getMonth() === day.date.getMonth()
                            && this.currentDate.getDate() === day.date.getDate()
                        ) {
                            return {
                                ...day,
                                firstFilterDate: true,
                            }
                        } else if (this.currentDate > day.date) {

                            return {
                                ...day,
                                filteringDate: true,
                            }
                        } else {

                            return day;
                        }
                    }
            )
                ));
                break;
            case "сегодня":
                this.arrayDays = this.arrayDays.map(week => (
                    week.map(day => {
                        return singleFiltration(day, this.currentDate);
                    })
                ));
                break;
            case "вчера":
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1);
                this.arrayDays = this.arrayDays.map(week => (
                    week.map(day => {
                        return singleFiltration(day, this.currentDate);
                    })
                ));
                this.currentDate = new Date();
                break;
            case "последние 7 дней":
                this.arrayDays = this.arrayDays.map(week =>
                    week.map(day => {
                        return intermediateFiltration(day, this.filterDatesArr);
                    })
                );
                break;
            case "последние 30 дней":

                this.arrayDays = this.arrayDays.map(week =>
                    week.map(day => {
                        return intermediateFiltration(day, this.filterDatesArr);
                    })
                );
                break;
            case "в этом месяце":

                this.arrayDays = this.arrayDays.map(week =>
                    week.map(day => {
                        return intermediateFiltration(day, this.filterDatesArr);
                    })
                );
                break;
            case "прошлый месяц":

                this.arrayDays = this.arrayDays.map(week =>
                    week.map(day => {
                        return intermediateFiltration(day, this.filterDatesArr);
                    })
                );
                break;
            case "ручная фильтрация":

                this.arrayDays = this.arrayDays.map(week =>
                    week.map(day => {
                        return intermediateFiltration(day, this.filterDatesArr);
                    })
                );
                break;

            default: return this.arrayDays;
        }
    },

    setButtonBarFilter: function (filter) {
        this.clearFilteringParams();
        this.buttonBarFilter = filter;
        if (filter === "последние 7 дней") {
            for (let i = 7; i > 0; i--) {
                this.filterDatesArr.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()));
                this.currentDate.setDate(this.currentDate.getDate() - 1);
            }
            this.currentDate = new Date();
        } else if (filter === "последние 30 дней") {
            for (let i = 30; i > 0; i--) {
                this.filterDatesArr.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()));
                this.currentDate.setDate(this.currentDate.getDate() - 1);
            }
            this.currentDate = new Date();
        } else if (filter === "в этом месяце") {
            this.filterDatesArr.push(this.currentDate);
            this.filterDatesArr.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1));
        } else if (filter === "прошлый месяц") {
            this.filterDatesArr.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0));
            this.filterDatesArr.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1));
        }
        this.filteringWithButtonBar();
    },

    handleCellClick: function (date) {
        if (this.filterDatesArr.length === 0) {
            this.filterDatesArr.push(date);
            this.arrayDays = this.arrayDays.map(week =>
                week.map(day =>
                    singleFiltration(day, date)
                )
            );
            this.buttonBarFilter = null;
        } else if (this.filterDatesArr.length === 1) {
            if (this.filterDatesArr[0] < date
                && this.filterDatesArr[0] !== date
            ) {
                this.filterDatesArr.unshift(date);
                this.buttonBarFilter = "ручная фильтрация";
                this.filteringWithButtonBar();
            } else if (
                this.filterDatesArr[0] > date
                && this.filterDatesArr[0] !== date
            ) {
                this.filterDatesArr.push(date);
                this.buttonBarFilter = "ручная фильтрация";
                this.filteringWithButtonBar();
            }
        } else if (this.filterDatesArr.length >= 2) {
            this.clearFilteringParams();
            this.filterDatesArr.push(date);
            this.arrayDays = this.arrayDays.map(week =>
                week.map(day =>
                    singleFiltration(day, date)
                )
            );
            this.buttonBarFilter = null;
        }
    }
  },
  components: {
      Calendar,
      SwipeMonth,
      AcceptFiltering,
      FiltersButtonBar,
  },
  created() {
      this.fillArrayDays();
  },
  computed: {
      isDisabledAcceptButton: function () {
          return !this.buttonBarFilter;
      }
  }
}
</script>

<style lang="scss">
.app {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 60px;

    &__content {
        display: flex;
    }

    &__calendar {
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(128, 158, 191, 0.2);
    }
}
</style>
