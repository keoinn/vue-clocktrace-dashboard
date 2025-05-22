<script setup>
import { ref, onMounted } from 'vue'
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
import { useLocale } from 'vuetify'

// UI 狀態
const tab = ref('summary_result')
const search = ref('')
const fab = ref(false)
const showQueryModal = ref(false)
const isLoading = ref(false)
const isDataLoaded = ref(false)
const showDatePicker = ref(false)
const queryDate = ref(moment().endOf('month').format('YYYY-MM'))

// Vuetify 本地化配置
const { current } = useLocale()
current.value = 'zh-TW'

// 日期選擇器配置
const datePickerConfig = {
  firstDayOfWeek: 1,
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
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
    // TODO: 實現查詢邏輯
    await new Promise(resolve => setTimeout(resolve, 1000))
    isDataLoaded.value = true
  } catch (error) {
    console.error('查詢失敗:', error)
  } finally {
    isLoading.value = false
    closeQueryModal()
  }
}
</script>

<template>
  <v-toolbar dark color="primary" fixed>
    <v-toolbar-title>GEHC月報表</v-toolbar-title>
    <v-spacer />
    <v-btn>
      <v-icon>mdi-export</v-icon>
    </v-btn>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="搜尋"
      single-line
      hide-details
    />
  </v-toolbar>

  <v-overlay v-model="isLoading" class="align-center justify-center">
    <v-progress-circular indeterminate size="64" />
  </v-overlay>

  <v-container fluid v-if="isDataLoaded">
    <v-tabs v-model="tab">
      <v-tab value="summary_result">總表</v-tab>
      <v-tab value="leave_statistical">請假明細</v-tab>
      <v-tab value="annual_leave_usage">特休假</v-tab>
      <v-tab value="compensate_leave_usage">補休假</v-tab>
      <v-tab value="leave_detail">本月異動請假單</v-tab>
      <v-tab value="overtime_statistics">延長工時報表</v-tab>
      <v-tab value="overtime_statistics_payroll">延長工時給付清冊</v-tab>
      <v-tab value="overtime_detail">本月異動延長工時申請單</v-tab>
      <v-tab value="overtime_meal_allowance">誤餐費</v-tab>
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
              :locale="dataTableLocale"
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
              :locale="dataTableLocale"
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
              :locale="dataTableLocale"
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
              :locale="dataTableLocale"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_statistics">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-text-field
              v-model="search"
              label="搜尋"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="overtime_statistics_headers"
              :items="overtime_statistics_items"
              class="overtime_statistics_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :search="search"
              :locale="dataTableLocale"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_statistics_payroll">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-text-field
              v-model="search"
              label="搜尋"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="overtime_statistics_payroll_headers"
              :items="overtime_statistics_payroll_items"
              class="overtime_statistics_payroll_table"
              :height="tableHeight"
              :fixed-header="true"
              density="compact"
              items-per-page="500"
              :search="search"
              :locale="dataTableLocale"
            />
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
              :locale="dataTableLocale"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>

      <v-tabs-window-item value="overtime_detail">
        <ResizablePage>
          <template #table="{ tableHeight }">
            <v-text-field
              v-model="search"
              label="搜尋"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="overtime_detail_headers"
              :items="overtime_detail_items"
              :fixed-header="true"
              :height="tableHeight"
              density="compact"
              item-key="todolist_no"
              items-per-page="500"
              :search="search"
              :locale="dataTableLocale"
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
              :locale="dataTableLocale"
            />
          </template>
        </ResizablePage>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>

  <v-container v-else class="d-flex align-center justify-center" style="height: 80vh">
    <v-card class="text-center pa-4">
      <v-card-text>
        <v-icon size="64" color="grey" class="mb-4">mdi-database-search</v-icon>
        <div class="text-h6">請點擊查詢按鈕開始查詢資料</div>
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
      <v-menu activator="parent" location="top">
        <v-list>
          <v-list-item @click="openQueryModal">
            <v-list-item-title>
              <v-icon>mdi-magnify</v-icon>
              查詢條件
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-refresh</v-icon>
              重新整理
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

  <v-dialog v-model="showQueryModal" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">查詢條件</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" class="d-flex justify-center">
              <div class="d-flex align-center" style="max-width: 400px; width: 100%;">
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
                  @click="showDatePicker = true"
                  height="40"
                >
                  <v-icon class="mr-1">mdi-calendar</v-icon>
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
          @click="closeQueryModal"
          :disabled="isLoading"
        >
          取消
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="handleQuery"
          :loading="isLoading"
          :disabled="isLoading"
        >
          查詢
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showDatePicker" max-width="400px">
    <v-card>
      <v-card-title>選擇日期</v-card-title>
      <v-card-text>
        <v-date-picker
          v-model="queryDate"
          @update:model-value="handleDateSelect"
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
</style>
