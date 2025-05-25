<script setup>
import { getLeaveCalc } from '@/plugins/GEHC/requests/apis'
import { onMounted, ref } from 'vue'
import { 
  leave_statistic_headers,
  leave_detail_headers,
  overtime_detail_headers,
  summary_result_headers,
  annual_leave_usage_headers,
  compensate_leave_usage_headers,
  overtime_statistics_headers,
  overtime_statistics_payroll_headers,
  overtime_meal_allowance_headers
} from '@/plugins/GEHC/datatable/headers'
import moment from 'moment'
import { export_excel } from '@/plugins/GEHC/datatable/export_excel'

const tab = ref('overtime_statistics_payroll')
const datatable_height = ref('75vh')
const query_date = ref('2025-03-31')
const query_date_startMon = moment(query_date.value).startOf('month').format('YYYY-MM-DD HH:mm:ss')
const query_date_endMon = moment(query_date.value).endOf('month').format('YYYY-MM-DD HH:mm:ss')

const leave_statistic_items = ref([])
const leave_detail_items = ref([])
const overtime_detail_items = ref([])
const summary_result_items = ref([])
const annual_leave_usage_items = ref([])
const compensate_leave_usage_items = ref([])
const overtime_statistics_items = ref([])
const overtime_statistics_payroll_items = ref([])
const overtime_meal_allowance_items = ref([])
const search = ref('')

onMounted(async () => {
  const res = await getLeaveCalc()
  console.log('查詢紀錄：', res.data)
  leave_detail_items.value = res.data.leave_detail
  overtime_detail_items.value = res.data.overtime_detail
  summary_result_items.value = Object.values(res.data.summary_result)
  leave_statistic_items.value = Object.values(res.data.leave_statistical)
  annual_leave_usage_items.value = Object.values(res.data.annual_leave_usage)
  compensate_leave_usage_items.value = Object.values(res.data.compensate_leave_usage)
  overtime_statistics_items.value = Object.values(res.data.overtime_statistics)
  overtime_statistics_payroll_items.value = res.data.overtime_payroll_detail
  overtime_meal_allowance_items.value = Object.values(res.data.overtime_meal_allowance)
})

const export_excel_btn = () => {
  export_excel(
    summary_result_items.value,
    leave_statistic_items.value,
    annual_leave_usage_items.value,
    compensate_leave_usage_items.value,
    leave_detail_items.value,
    overtime_statistics_items.value,
    overtime_detail_items.value,
    overtime_meal_allowance_items.value,
    overtime_statistics_payroll_items.value
  )
}
</script>
<template>
  <v-container fluid class="pa-0">
    <v-btn @click="export_excel_btn"> 匯出 </v-btn>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="summary_result"> 總表 </v-tab>
      <v-tab value="leave_statistical"> 請假明細 </v-tab>
      <v-tab value="annual_leave_usage"> 特休假 </v-tab>
      <v-tab value="compensate_leave_usage"> 補休假 </v-tab>
      <v-tab value="leave_detail"> 本月異動請假單 </v-tab>
      <v-tab value="overtime_statistics"> 延長工時報表 </v-tab>
      <v-tab value="overtime_statistics_payroll"> 延長工時給付清冊 </v-tab>
      <v-tab value="overtime_detail"> 本月異動延長工時申請單 </v-tab>
      <v-tab value="overtime_meal_allowance"> 誤餐費 </v-tab>
      
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="summary_result">
        <v-data-table
          :headers="summary_result_headers"
          :items="summary_result_items"
          class="summary_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          items-per-page="500"
        />
      </v-tabs-window-item>

      <v-tabs-window-item value="leave_statistical">
        <v-data-table
          :headers="leave_statistic_headers"
          :items="leave_statistic_items"
          class="leave_statistic_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          item-key="name"
          items-per-page="500"
        />
      </v-tabs-window-item>

      <v-tabs-window-item value="annual_leave_usage">
        <v-data-table
          :headers="annual_leave_usage_headers"
          :items="annual_leave_usage_items"
          class="annual_leave_usage_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          items-per-page="500"
        />
      </v-tabs-window-item>

      <v-tabs-window-item value="compensate_leave_usage">
        <v-data-table
          :headers="compensate_leave_usage_headers"
          :items="compensate_leave_usage_items"
          class="compensate_leave_usage_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          items-per-page="500"
        />
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_statistics">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="overtime_statistics_headers"
          :items="overtime_statistics_items"
          class="overtime_statistics_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          items-per-page="500"
          :search="search"
        />
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_statistics_payroll">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="overtime_statistics_payroll_headers"
          :items="overtime_statistics_payroll_items"
          class="overtime_statistics_payroll_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          items-per-page="500"
          :search="search"
        >
          <template #item.note="{ item }">
            <span v-if="item.note.merage_todolist !== null">
              給付合併({{ item.note.merage_todolist }});
            </span>
            <span v-if="item.note.leave_info !== null">
              當日請特休({{ item.note.leave_info }})費率變更為{{ item.note.date_type_str }};
            </span>
            <span class="datatable-danger-text" v-if="item.note.overflow_hours !== null">
              <span v-for="(overflow_hour, index) in item.note.overflow_hours" :key="index">
                {{ overflow_hour }};
              </span>
            </span>
            <br>
          </template>
        </v-data-table>
      </v-tabs-window-item>

      <v-tabs-window-item value="leave_detail">
        <v-data-table
          :headers="leave_detail_headers"
          :items="leave_detail_items"
          class="todolist_detail_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          item-key="name"
          items-per-page="500"
        >
          <template #item="{ item }">
            <tr
              v-if="
                moment(item.start_date).isBefore(moment(query_date_startMon)) &&
                  moment(item.end_date).isBefore(moment(query_date_startMon))
              "
              style="color: red"
            >
              <td>{{ item.todolist_no }}</td>
              <td>{{ item.employee_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.leave_category_name }}</td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.create_desc }}</td>
              <td>{{ item.apply_hour }}</td>
              <td>{{ item.create_date }}</td>
            </tr>

            <tr
              v-if="
                moment(item.start_date).isBefore(moment(query_date_startMon)) &&
                  moment(item.end_date).isAfter(moment(query_date_startMon))
              "
              style="color: orangered"
            >
              <td>{{ item.todolist_no }}</td>
              <td>{{ item.employee_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.leave_category_name }}</td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.create_desc }}</td>
              <td>{{ item.apply_hour }}</td>
              <td>{{ item.create_date }}</td>
            </tr>

            <tr
              v-else-if="
                moment(item.start_date).isBefore(moment(query_date_endMon)) &&
                  moment(item.end_date).isAfter(moment(query_date_endMon))
              "
              style="color: green"
            >
              <td>{{ item.todolist_no }}</td>
              <td>{{ item.employee_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.leave_category_name }}</td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.create_desc }}</td>
              <td>{{ item.apply_hour }}</td>
              <td>{{ item.create_date }}</td>
            </tr>

            <tr
              v-else-if="
                moment(item.start_date).isAfter(moment(query_date_endMon))
              "
              style="color: blue"
            >
              <td>{{ item.todolist_no }}</td>
              <td>{{ item.employee_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.leave_category_name }}</td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.create_desc }}</td>
              <td>{{ item.apply_hour }}</td>
              <td>{{ item.create_date }}</td>
            </tr>

            <tr v-else>
              <td>{{ item.todolist_no }}</td>
              <td>{{ item.employee_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.leave_category_name }}</td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ item.create_desc }}</td>
              <td>{{ item.apply_hour }}</td>
              <td>{{ item.create_date }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_detail">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="overtime_detail_headers"
          :items="overtime_detail_items"
          :fixed-header="true"
          :height="datatable_height"
          density="compact"
          item-key="todolist_no"
          items-per-page="500"
          :search="search"
        />
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_meal_allowance">
        <v-data-table
          :headers="overtime_meal_allowance_headers"
          :items="overtime_meal_allowance_items"
          class="overtime_meal_allowance_table"
          :height="datatable_height"
          :fixed-header="true"
          density="compact"
          items-per-page="500"
        />
      </v-tabs-window-item>
    </v-tabs-window>

    <v-fab
        :key="fabPosition"
        :absolute="fabPosition === 'absolute'"
        :app="fabPosition === 'fixed'"
        :color="open ? '' : 'primary'"
        :location="fabLocation"
        size="large"
        icon
      >
        <v-icon>{{ open ? 'mdi-close' : 'mdi-crown' }}</v-icon>
        <v-speed-dial v-model="open" :location="menuLocation" :transition="transition" activator="parent">
          <v-btn key="1" color="success" icon>
            <v-icon size="24">$success</v-icon>
          </v-btn>

          <v-btn key="2" color="info" icon>
            <v-icon size="24">$info</v-icon>
          </v-btn>

          <v-btn key="3" color="warning" icon>
            <v-icon size="24">$warning</v-icon>
          </v-btn>

          <v-btn key="4" color="error" icon>
            <v-icon size="24">$error</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
  </v-container>
</template>


<style lang="scss">
tbody tr:nth-child(odd) {
  background-color: #e6eaed;
}
.datatable-font-bold {
  font-weight: bold;
}
.datatable-danger-text {
  color: #a94442;
}
.datatable-highlight-text {
  color: #337ab7;
}

.leave_statistic_table {
  thead tr th:nth-child(3),
  thead tr th:nth-child(6),
  tbody tr td:nth-child(3),
  tbody tr td:nth-child(6) {
    color: #337ab7;
    font-weight: bold;
  }

  thead tr th:nth-child(7),
  tbody tr td:nth-child(7) {
    color: #a94442;
    font-weight: bold;
  }
}

.summary_table {
  thead tr th:nth-child(3),
  thead tr th:nth-child(4),
  thead tr th:nth-child(6),
  thead tr th:nth-child(8),
  tbody tr td:nth-child(3),
  tbody tr td:nth-child(4),
  tbody tr td:nth-child(6),
  tbody tr td:nth-child(8)
  {
    color: #a94442;
    font-weight: bold;
  }
  
}


.todolist_detail_table {
}
</style>
