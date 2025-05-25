<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
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
import ResizablePage from '@/components/utils/ResizablePage.vue'
import moment from 'moment'
import { getLeaveCalc } from '@/plugins/GEHC/requests/apis'
import { export_excel } from '@/plugins/GEHC/datatable/export_excel'

const router = useRouter()
const appStore = useAppStore()

// UI 狀態
const tab = ref('summary_result')
const search = ref('')
const fab = ref(false)
const showQueryModal = ref(false)
const isLoading = ref(false)
const isDataLoaded = ref(false)
const showDatePicker = ref(false)
const queryDate = ref(moment().endOf('month').format('YYYY-MM'))

// 数据状态
const leave_statistic_items = ref([])
const leave_detail_items = ref([])
const overtime_detail_items = ref([])
const summary_result_items = ref([])
const annual_leave_usage_items = ref([])
const compensate_leave_usage_items = ref([])
const overtime_statistics_items = ref([])
const overtime_statistics_payroll_items = ref([])
const overtime_meal_allowance_items = ref([])

// 日期選擇器配置
const datePickerConfig = {
  firstDayOfWeek: 1,
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ],
  monthNamesShort: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
  selectDate: '選擇日期',
  ok: '確定',
  cancel: '取消',
  today: '今天',
  clear: '清除'
}

// DataTable 本地化配置
const dataTableLocale = {
  locale: 'zh-TW',
  itemsPerPageText: '每頁顯示',
  itemsPerPageAll: '全部',
  nextPage: '下一頁',
  prevPage: '上一頁',
  firstPage: '第一頁',
  lastPage: '最後一頁',
  pageText: '{0}-{1} 共 {2} 筆',
  noDataText: '沒有資料',
  loadingText: '載入中...',
  searchText: '搜尋',
  selectAllText: '全選',
  sortByText: '排序',
  sortDescText: '降序',
  sortAscText: '升序',
  clearText: '清除',
  filterText: '篩選'
}

// 生命週期鉤子
onMounted(() => {
  // 检查登录状态
  if (!appStore.checkLoginStatus()) {
    appStore.setLoginState(false)
    router.push({ path: '/', query: { expired: 'true' } })
    return
  }
  showQueryModal.value = true
})

// 事件處理函數
const openQueryModal = () => {
  showQueryModal.value = true
}

const closeQueryModal = () => {
  showQueryModal.value = false
}

const handleDateSelect = (date) => {
  queryDate.value = moment(date).format('YYYY-MM')
  showDatePicker.value = false
}

const handleQuery = async () => {
  try {
    isLoading.value = true
    const queryDateEnd = moment(queryDate.value).endOf('month').format('YYYY-MM-DD')
    const res = await getLeaveCalc(queryDateEnd)
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
    isDataLoaded.value = true
  } catch (error) {
    console.error('查詢失敗:', error)
  } finally {
    isLoading.value = false
    closeQueryModal()
  }
}

const clearData = () => {
  leave_detail_items.value = []
  overtime_detail_items.value = []
  summary_result_items.value = []
  leave_statistic_items.value = []
  annual_leave_usage_items.value = []
  compensate_leave_usage_items.value = []
  overtime_statistics_items.value = []
  overtime_statistics_payroll_items.value = []
  overtime_meal_allowance_items.value = []
  isDataLoaded.value = false
  search.value = ''
}

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
    overtime_statistics_payroll_items.value,
    queryDate.value
  )
}
</script>

<template>
  <v-toolbar
    dark
    color="primary"
    fixed
  >
    <v-toolbar-title>GEHC月報表</v-toolbar-title>
    <v-spacer />
    <v-btn
      v-if="isDataLoaded"
      prepend-icon="mdi-export"
      @click="export_excel_btn"
    >
      匯出Excel
    </v-btn>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="搜尋特定員工、延長工時申請單號、請假單號"
      single-line
      hide-details
      @click:append-inner="search = ''"
    />
  </v-toolbar>

  <v-overlay
    v-model="isLoading"
    class="align-center justify-center"
  >
    <v-progress-circular
      indeterminate
      size="64"
    />
  </v-overlay>

  <v-container
    v-if="isDataLoaded"
    fluid
  >
    <v-tabs v-model="tab">
      <v-tab value="summary_result">
        總表
      </v-tab>
      <v-tab value="leave_statistical">
        請假明細
      </v-tab>
      <v-tab value="annual_leave_usage">
        特休假
      </v-tab>
      <v-tab value="compensate_leave_usage">
        補休假
      </v-tab>
      <v-tab value="leave_detail">
        本月異動請假單
      </v-tab>
      <v-tab value="overtime_statistics">
        延長工時報表
      </v-tab>
      <v-tab value="overtime_statistics_payroll">
        延長工時給付清冊
      </v-tab>
      <v-tab value="overtime_detail">
        本月異動延長工時申請單
      </v-tab>
      <v-tab value="overtime_meal_allowance">
        誤餐費
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="summary_result">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="summary_result_headers"
              :items="summary_result_items"
              class="summary_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="leave_statistical">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="leave_statistic_headers"
              :items="leave_statistic_items"
              class="leave_statistic_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              item-key="name"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="annual_leave_usage">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="annual_leave_usage_headers"
              :items="annual_leave_usage_items"
              class="annual_leave_usage_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="compensate_leave_usage">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="compensate_leave_usage_headers"
              :items="compensate_leave_usage_items"
              class="compensate_leave_usage_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_statistics">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="overtime_statistics_headers"
              :items="overtime_statistics_items"
              class="overtime_statistics_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_statistics_payroll">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="overtime_statistics_payroll_headers"
              :items="overtime_statistics_payroll_items"
              class="overtime_statistics_payroll_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            >
              <template #item.note="{ item }">
                <span v-if="item.note.merage_todolist !== null">
                  給付合併({{ item.note.merage_todolist }});
                </span>
                <span v-if="item.note.leave_info !== null">
                  當日請特休({{ item.note.leave_info }})費率變更為{{ item.note.date_type_str }};
                </span>
                <span
                  v-if="item.note.overflow_hours !== null"
                  class="datatable-danger-text"
                >
                  <span
                    v-for="(overflow_hour, index) in item.note.overflow_hours"
                    :key="index"
                  >
                    {{ overflow_hour }};
                  </span>
                </span>
                <br>
              </template>
            </v-data-table>
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="leave_detail">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="leave_detail_headers"
              :items="leave_detail_items"
              class="todolist_detail_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              item-key="name"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_detail">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="overtime_detail_headers"
              :items="overtime_detail_items"
              :fixed-header="true"
              :height="tableHeight"
              density="compact"
              item-key="todolist_no"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_meal_allowance">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-data-table
              :headers="overtime_meal_allowance_headers"
              :items="overtime_meal_allowance_items"
              class="overtime_meal_allowance_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :items-per-page-options="[10, 20, 50, 100, 500]"
              :items-per-page-text="dataTableLocale.itemsPerPageText"
              :items-per-page-all="dataTableLocale.itemsPerPageAll"
              :next-page="dataTableLocale.nextPage"
              :prev-page="dataTableLocale.prevPage"
              :first-page="dataTableLocale.firstPage"
              :last-page="dataTableLocale.lastPage"
              :page-text="dataTableLocale.pageText"
              :no-data-text="dataTableLocale.noDataText"
              :loading-text="dataTableLocale.loadingText"
              :search-text="dataTableLocale.searchText"
              :select-all-text="dataTableLocale.selectAllText"
              :sort-by-text="dataTableLocale.sortByText"
              :sort-desc-text="dataTableLocale.sortDescText"
              :sort-asc-text="dataTableLocale.sortAscText"
              :clear-text="dataTableLocale.clearText"
              :filter-text="dataTableLocale.filterText"
              :search="search"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>

  <v-container
    v-else
    class="d-flex align-center justify-center"
    style="height: 80vh"
  >
    <v-card class="text-center pa-4">
      <v-card-text>
        <v-icon
          size="64"
          color="grey"
          class="mb-4"
        >
          mdi-database-search
        </v-icon>
        <div class="text-h6 mb-4">
          請點擊查詢按鈕開始查詢資料
        </div>
        <v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          @click="openQueryModal"
        >
          查詢資料
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>

  <v-fab-transition>
    <v-btn
      v-model="fab"
      color="primary"
      icon="mdi-cog"
      size="large"
      class="fab-button"
    >
      <v-icon>mdi-cog</v-icon>
      <v-menu
        activator="parent"
        location="top"
      >
        <v-list>
          <v-list-item @click="openQueryModal">
            <v-list-item-title>
              <v-icon>mdi-magnify</v-icon>
              查詢條件
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="export_excel_btn">
            <v-list-item-title>
              <v-icon>mdi-export</v-icon>
              匯出Excel
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="clearData">
            <v-list-item-title>
              <v-icon>mdi-delete</v-icon>
              清除資料
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-help-circle</v-icon>
              說明
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-fab-transition>

  <v-dialog
    v-model="showQueryModal"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">查詢條件</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col
              cols="12"
              class="d-flex justify-center"
            >
              <div
                class="d-flex align-center"
                style="max-width: 400px; width: 100%"
              >
                <v-text-field
                  v-model="queryDate"
                  label="報表月份"
                  readonly
                  class="mr-2"
                  hide-details
                  density="comfortable"
                />
                <v-btn
                  color="success"
                  height="40"
                  @click="showDatePicker = true"
                >
                  <v-icon class="mr-1">
                    mdi-calendar
                  </v-icon>
                  設定日期
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          variant="text"
          :disabled="isLoading"
          @click="closeQueryModal"
        >
          取消
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleQuery"
        >
          查詢
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showDatePicker"
    max-width="400px"
  >
    <v-card>
      <v-card-title>選擇日期</v-card-title>
      <v-card-text>
        <v-date-picker
          v-model="queryDate"
          :max="moment().endOf('month').format('YYYY-MM-DD')"
          :locale="current"
          :first-day-of-week="datePickerConfig.firstDayOfWeek"
          :month-names="datePickerConfig.monthNames"
          :month-names-short="datePickerConfig.monthNamesShort"
          :day-names="datePickerConfig.dayNames"
          :day-names-short="datePickerConfig.dayNamesShort"
          :day-names-min="datePickerConfig.dayNamesMin"
          :title="datePickerConfig.selectDate"
          :ok-text="datePickerConfig.ok"
          :cancel-text="datePickerConfig.cancel"
          :today-text="datePickerConfig.today"
          :clear-text="datePickerConfig.clear"
          @update:model-value="handleDateSelect"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.fab-button {
  position: fixed;
  bottom: 24px;
  left: 24px;
}

:deep(.v-date-picker-header) {
  font-size: 1.2rem;
}

:deep(.v-date-picker-table) {
  font-size: 1rem;
}

:deep(.v-date-picker-table .v-btn) {
  font-size: 1rem;
}

:deep(.v-data-table-footer) {
  font-size: 0.875rem;
}

:deep(.v-data-table-footer__items-per-page) {
  font-size: 0.875rem;
}

:deep(.v-data-table-footer__pagination) {
  font-size: 0.875rem;
}

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
  tbody tr td:nth-child(8) {
    color: #a94442;
    font-weight: bold;
  }
}
</style>
