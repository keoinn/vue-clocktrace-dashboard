import ExcelJS from 'exceljs'
import {
  general_border_style,
  general_alignment_n,
  general_alignment_nWT,
  header_bg,
  text_style_normal,
  text_style_bold,
  general_cell_text_b
} from './export_excel_format'

let srs_col_range, srs_row_range, srs_header_text, srs_worksheet_name
let lss_col_range, lss_row_range, lss_header_text, lss_worksheet_name
let alss_col_range, alss_row_range, alss_header_text, alss_worksheet_name
let ctss_col_range, ctss_row_range, ctss_header_text, ctss_worksheet_name
let lds_col_range, lds_row_range, lds_header_text, lds_worksheet_name
let otss_col_range, otss_row_range, otss_header_text, otss_worksheet_name
let otds_col_range, otds_row_range, otds_header_text, otds_worksheet_name
let mal_col_range, mal_row_range, mal_header_text, mal_worksheet_name
let otprsge_col_range, otprsge_row_range, otprsge_header_text, otprsge_worksheet_name
let file_name = ''

const generate_table_settings = (label_text) => {
  file_name = `GEHC_${label_text}月報表`
  srs_worksheet_name = `總表`
  srs_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  srs_row_range = ['1', '2', '3', '4']
  srs_header_text = srs_header_text = {
    A: {
      1: `${label_text} 總表`,
      2: '',
      3: '給(扣)薪比例',
      4: '員工編號'
    },
    B: {
      1: '',
      2: '',
      3: '',
      4: '員工姓名'
    },
    C: {
      1: '',
      2: '請假扣薪天數\n(不含特休.補休假)',
      3: '100%',
      4: ''
    },
    D: {
      1: '',
      2: '特休假本月異動',
      3: '',
      4: ''
    },
    E: {
      1: '',
      2: '特休假本月結轉',
      3: '',
      4: ''
    },
    F: {
      1: '',
      2: '補休假本月異動',
      3: '',
      4: ''
    },
    G: {
      1: '',
      2: '補休假本月結轉',
      3: '',
      4: ''
    },
    H: {
      1: '',
      2: '延長工時本年結轉',
      3: '',
      4: ''
    },
    I: {
      1: '',
      2: '延長工時本月結轉',
      3: '',
      4: ''
    }
  }

  lss_worksheet_name = `請假明細`
  lss_col_range = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W'
  ]
  lss_row_range = ['1', '2', '3', '4', '5']
  lss_header_text = {
    A: {
      1: `${label_text} 請假明細`,
      2: '請假假別',
      3: '給薪比例',
      4: '應休天數',
      5: '員工編號'
    },
    B: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '員工姓名'
    },
    C: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '請假總天數'
    },
    D: {
      1: '',
      2: '特休假',
      3: '100%',
      4: '-',
      5: ''
    },
    E: {
      1: '',
      2: '補休假',
      3: '100%',
      4: '-',
      5: ''
    },
    F: {
      1: '',
      2: '請假總天數(不含特休補休)',
      3: '',
      4: '',
      5: ''
    },
    G: {
      1: '',
      2: '請假扣薪天數(不含特休補休)',
      3: '100%',
      4: '',
      5: ''
    },
    H: {
      1: '',
      2: '全薪事假',
      3: '100%',
      4: '5',
      5: ''
    },
    I: {
      1: '',
      2: '全薪病假',
      3: '100%',
      4: '20',
      5: ''
    },
    J: {
      1: '',
      2: '公假',
      3: '100%',
      4: '30',
      5: ''
    },
    K: {
      1: '',
      2: '公傷病假',
      3: '100%',
      4: '30',
      5: ''
    },
    L: {
      1: '',
      2: '半薪病假',
      3: '50%',
      4: '10',
      5: ''
    },
    M: {
      1: '',
      2: '員工旅遊假',
      3: '100%',
      4: '1',
      5: ''
    },
    N: {
      1: '',
      2: '喪假',
      3: '100%',
      4: '17',
      5: ''
    },
    O: {
      1: '',
      2: '婚假',
      3: '100%',
      4: '8',
      5: ''
    },
    P: {
      1: '',
      2: '家庭照顧假',
      3: '0%',
      4: '7',
      5: ''
    },
    Q: {
      1: '',
      2: '無薪事假',
      3: '0%',
      4: '9',
      5: ''
    },
    R: {
      1: '',
      2: '無薪病假',
      3: '0%',
      4: '365',
      5: ''
    },
    S: {
      1: '',
      2: '生理假',
      3: '50%',
      4: '12',
      5: ''
    },
    T: {
      1: '',
      2: '產假/分娩(受僱工作在六個月以上者)',
      3: '100%',
      4: '56',
      5: ''
    },
    U: {
      1: '',
      2: '產假/妊娠流產',
      3: '100%',
      4: '40',
      5: ''
    },
    V: {
      1: '',
      2: '產檢假',
      3: '100%',
      4: '5',
      5: ''
    },
    W: {
      1: '',
      2: '陪產檢及陪產假',
      3: '100%',
      4: '7',
      5: ''
    }
  }

  alss_worksheet_name = `特休假`
  alss_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  alss_row_range = ['1', '2']
  alss_header_text = {
    A: {
      1: `${label_text} 特休假報表`,
      2: '員工編號'
    },
    B: {
      1: '',
      2: '員工姓名'
    },
    C: {
      1: '',
      2: '年度應休'
    },
    D: {
      1: '',
      2: '已請天數'
    },
    E: {
      1: '',
      2: '本月異動'
    },
    F: {
      1: '',
      2: '本月結轉'
    },
    G: {
      1: '',
      2: '剩餘天數(未結轉)'
    }
  }

  ctss_worksheet_name = `補休假`
  ctss_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  ctss_row_range = ['1', '2']
  ctss_header_text = {
    A: {
      1: `${label_text} 補休假報表`,
      2: '員工編號'
    },
    B: {
      1: '',
      2: '員工姓名'
    },
    C: {
      1: '',
      2: '當年累積時數'
    },
    D: {
      1: '',
      2: '未休時數'
    },
    E: {
      1: '',
      2: '本月異動'
    },
    F: {
      1: '',
      2: '剩餘時數 (未結轉)'
    },
    G: {
      1: '',
      2: '本月結轉'
    }
  }

  lds_worksheet_name = `本月異動請假單`
  lds_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  lds_row_range = ['1', '2']
  lds_header_text = {
    A: {
      1: `${label_text} 月異動請假單`,
      2: '申請編號'
    },
    B: {
      1: '',
      2: '員工編號'
    },
    C: {
      1: '',
      2: '員工姓名'
    },
    D: {
      1: '',
      2: '假別名稱'
    },
    E: {
      1: '',
      2: '申請起日'
    },
    F: {
      1: '',
      2: '申請訖日'
    },
    G: {
      1: '',
      2: '申請事由'
    },
    H: {
      1: '',
      2: '申請時數'
    },
    I: {
      1: '',
      2: '申請時間'
    }
  }

  otss_worksheet_name = `延長工時報表`
  otss_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'F', 'G', 'H']
  otss_row_range = ['1', '2', '3', '4']
  otss_header_text = {
    A: {
      1: `${label_text} 延長工時報表`,
      2: '員工編號',
      3: '',
      4: ''
    },
    B: {
      1: '',
      2: '員工姓名',
      3: '',
      4: ''
    },
    C: {
      1: '',
      2: '當年\n累積\n時數',
      3: '',
      4: ''
    },
    D: {
      1: '',
      2: '本月結轉',
      3: '平日',
      4: '1.5'
    },
    E: {
      1: '',
      2: '',
      3: '休息日',
      4: '2'
    },
    F: {
      1: '',
      2: '',
      3: '國定假日',
      4: '2'
    },
    G: {
      1: '',
      2: '',
      3: '例假日',
      4: '2'
    },
    H: {
      1: '',
      2: '',
      3: '合計',
      4: ''
    }
  }

  otds_worksheet_name = `本月異動延長工時申請單`
  otds_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
  otds_row_range = ['1', '2']
  otds_header_text = {
    A: {
      1: `${label_text} 月異動延長工時申請單`,
      2: '申請編號'
    },
    B: {
      1: '',
      2: '聘僱類別'
    },
    C: {
      1: '',
      2: '員工編號'
    },
    D: {
      1: '',
      2: '員工姓名'
    },
    E: {
      1: '',
      2: '申請時數 (A)'
    },
    F: {
      1: '',
      2: '休息時數 (B)'
    },
    G: {
      1: '',
      2: '延長工時總時數 (C)'
    },
    H: {
      1: '',
      2: '打卡起時'
    },
    I: {
      1: '',
      2: '打卡訖時'
    },
    J: {
      1: '',
      2: '打卡工時 (D)'
    },
    K: {
      1: '',
      2: '給付工時 (E)'
    },
    L: {
      1: '',
      2: '應稅工時 (F)'
    },
    M: {
      1: '',
      2: '誤餐次數'
    },
    N: {
      1: '',
      2: '給付方式'
    },
    O: {
      1: '',
      2: '申請核可時間'
    },
    P: {
      1: '',
      2: '打卡建立時間'
    }
  }

  mal_worksheet_name = `誤餐費`
  mal_col_range = ['A', 'B', 'C', 'D']
  mal_row_range = ['1', '2']
  mal_header_text = {
    A: {
      1: `${label_text} 誤餐費`,
      2: `員工編號`
    },
    B: {
      1: '',
      2: `員工姓名`
    },
    C: {
      1: '',
      2: `聘僱類別`
    },
    D: {
      1: '',
      2: `誤餐次數`
    }
  }

  otprsge_worksheet_name = `延長工時給付清冊`
  otprsge_col_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
  otprsge_row_range = ['1', '2', '3']
  otprsge_header_text = {
    A: {
      1: `${label_text} 延長工時給付清冊`,
      2: '申請編號',
      3: ''
    },
    B: {
      1: '',
      2: '員工編號',
      3: ''
    },
    C: {
      1: '',
      2: '員工姓名',
      3: ''
    },
    D: {
      1: '',
      2: '加班日',
      3: ''
    },
    E: {
      1: '',
      2: '打卡\n工時',
      3: ''
    },
    F: {
      1: '',
      2: '補休\n時數',
      3: ''
    },
    G: {
      1: '',
      2: '基礎\n時數',
      3: ''
    },
    H: {
      1: '',
      2: '給付\n費率',
      3: ''
    },
    I: {
      1: '',
      2: '平日',
      3: '1.5'
    },
    J: {
      1: '',
      2: '休息日',
      3: '2.0'
    },
    K: {
      1: '',
      2: '國定假日',
      3: '2.0'
    },
    L: {
      1: '',
      2: '例假日',
      3: '2.0'
    },
    M: {
      1: '',
      2: '備註',
      3: ''
    }
  }
}

const fill_header_text = (worksheet_id, worksheet) => {
  switch (worksheet_id) {
    case 'srs':
      srs_col_range.map((col_key) => {
        srs_row_range.map((row_key) => {
          worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value = srs_header_text[col_key][row_key]
        })
      })

      worksheet.columns = [
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: '0_minus_by_leave'
        },
        {
          key: '1_monthly_annual_leave_used'
        },
        {
          key: '2_monthly_annual_leave_carried_over'
        },
        {
          key: '3_monthly_compensate_leave'
        },
        {
          key: '4_monthly_compensate_leave_carried_over'
        },
        {
          key: '5_yearly_overtime_used'
        },
        {
          key: '6_monthly_overtime_used'
        }
      ]
      break

    case 'lss':
      lss_col_range.map((col_key) => {
        lss_row_range.map((row_key) => {
          if (row_key == '1') {
            worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['white']
            worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['black']
          } else {
            worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
            worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          }
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            lss_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: '0_total_leave'
        },
        {
          key: '1_annual_leave'
        },
        {
          key: '2_compensation_leave'
        },
        {
          key: '3_total_except_1_2'
        },
        {
          key: '4_minus_except_1_2'
        },
        {
          key: '5_personal_leave_full'
        },
        {
          key: '6_sick_leave_full'
        },
        {
          key: '7_public_leave'
        },
        {
          key: '8_occupational_sickness_leave'
        },
        {
          key: '9_sick_leave_half'
        },
        {
          key: '10_company_outing'
        },
        {
          key: '11_funeral_leave'
        },
        {
          key: '12_wedding_leave'
        },
        {
          key: '13_family_care_leave'
        },
        {
          key: '14_personal_leave_no'
        },
        {
          key: '15_sick_leave_no'
        },
        {
          key: '16_menstrual_leave'
        },
        {
          key: '17_maternity_leave'
        },
        {
          key: '18_maternity_miscarriage_leave'
        },
        {
          key: '19_prenatal_exam_leave'
        },
        {
          key: '20_paternity_leaves'
        }
      ]
      break

    case 'alss':
      alss_col_range.map((col_key) => {
        alss_row_range.map((row_key) => {
          worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            alss_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: '0_available_days'
        },
        {
          key: '1_used_days'
        },
        {
          key: '2_current_month_used'
        },
        {
          key: '3_monthly_carried_over'
        },
        {
          key: '4_remaining_days'
        }
      ]
      break

    case 'ctss':
      ctss_col_range.map((col_key) => {
        ctss_row_range.map((row_key) => {
          worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            ctss_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: '0_yearly_total_hours'
        },
        {
          key: '1_unused_hours'
        },
        {
          key: '2_current_month_used'
        },
        {
          key: '3_remaining_hours'
        },
        {
          key: '4_current_month_carried_over'
        }
      ]
      break

    case 'lds':
      lds_col_range.map((col_key) => {
        lds_row_range.map((row_key) => {
          if (row_key == '1') {
            worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['white']
            worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['black']
          } else {
            worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
            worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          }
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            lds_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'todolist_no'
        },
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: 'leave_category_name'
        },
        {
          key: 'start_date'
        },
        {
          key: 'end_date'
        },
        {
          key: 'create_desc'
        },
        {
          key: 'apply_hour'
        },
        {
          key: 'create_date'
        }
      ]
      break

    case 'otss':
      otss_col_range.map((col_key) => {
        otss_row_range.map((row_key) => {
          worksheet.getCell(`${col_key}${row_key}`)
          worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            otss_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: 'yearly_total_hours'
        },
        {
          key: 'ge_regular_150'
        },
        {
          key: 'ge_rest_200'
        },
        {
          key: 'ge_holiday_200'
        },
        {
          key: 'ge_dayoff_200'
        },
        {
          key: 'monthly_total_hours'
        }
      ]
      break

    case 'otds':
      otds_col_range.map((col_key) => {
        otds_row_range.map((row_key) => {
          if (row_key == '1') {
            worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['white']
            worksheet.getCell(`${col_key}${row_key}`).font = text_style_bold['black']
          } else {
            worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
            worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          }
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            otds_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'todolist_no'
        },
        {
          key: 'employ_category_name'
        },
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: 'apply_hour'
        },
        {
          key: 'break_hour'
        },
        {
          key: 'overtime_hour'
        },
        {
          key: 'clock_in_time'
        },
        {
          key: 'clock_out_time'
        },
        {
          key: 'overtime_clock_diff'
        },
        {
          key: 'pay_hours'
        },
        {
          key: 'tex_hours'
        },
        {
          key: 'overtime_diet'
        },
        {
          key: 'overtime_fee'
        },
        {
          key: 'audit_date'
        },
        {
          key: 'clock_out_create_date'
        }
      ]

      break

    case 'mal':
      mal_col_range.map((col_key) => {
        mal_row_range.map((row_key) => {
          worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue']
          worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all']
          worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white']
          worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center']
          worksheet.getCell(`${col_key}${row_key}`).value =
            mal_header_text[`${col_key}`][`${row_key}`]
        })
      })

      worksheet.columns = [
        {
          key: 'employee_no'
        },
        {
          key: 'user_name'
        },
        {
          key: 'employ_category_name'
        },
        {
          key: 'meal_allowance'
        }
      ]
      break

    case 'otprsge':
      otprsge_col_range.map(col_key => {
        otprsge_row_range.map(row_key => {
            if (row_key == '1') {
                worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['white'];
                worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['black'];
            } else {
              worksheet.getCell(`${col_key}${row_key}`).fill = header_bg['blue'];
              worksheet.getCell(`${col_key}${row_key}`).font = text_style_normal['white'];
            }
            worksheet.getCell(`${col_key}${row_key}`).border = general_border_style['all'];
            worksheet.getCell(`${col_key}${row_key}`).alignment = general_alignment_n['center'];
            worksheet.getCell(`${col_key}${row_key}`).value = otprsge_header_text[`${col_key}`][`${row_key}`];
        });
    });

    /** 表格欄位對應資料欄位 */
    worksheet.columns = [{
            key: 'todolist_no'
        },
        {
            key: 'employee_no'
        },
        {
            key: 'user_name'
        },
        {
            key: 'overtime_date'
        },
        {
            key: 'clock_hours'
        }, /** ['Payroll']['current_hours'] */
        {
            key: 'compensate_leave_hours'
        }, /** ['Payroll']['rate_hours']['compensate_leave_hours'] */
        {
            key: 'paid_hours'
        }, /** ['Payroll']['rate_hours']['paid_hours'] */
        {
            key: 'date_type_str'
        }, /** ['Payroll']['day_type_str'] */
        {
            key: 'ge_regular_150'
        },
        {
            key: 'ge_rest_200'
        },
        {
            key: 'ge_holiday_200'
        },
        {
            key: 'ge_dayoff_200'
        },
        {
            key: 'note'
        },
    ];
      break
  }
}

const adjust_column_format = (worksheet_id, worksheet) => {
  switch (worksheet_id) {
    case 'srs':
      srs_col_range.map((col_key) => {
        worksheet.getColumn(col_key).width = 18
      })
      worksheet.getColumn('A').width = 12
      worksheet.getColumn('B').width = 21.57
      worksheet.getColumn('C').width = 21
      worksheet.getColumn('D').width = 18
      worksheet.getColumn('E').width = 18
      worksheet.getColumn('F').width = 18
      worksheet.getColumn('G').width = 18
      worksheet.getColumn('H').width = 20.57
      worksheet.getColumn('I').width = 20.57
      worksheet.getRow(2).height = 33
      worksheet.getCell('A1').fill = header_bg['white']
      worksheet.getCell('A1').font = text_style_bold['black']
      worksheet.getCell('A3').font = text_style_bold['white']
      worksheet.getCell('B3').font = text_style_bold['white']
      ;['C1', 'C2', 'C3', 'C4'].map((cell) => {
        worksheet.getCell(`${cell}`).font = text_style_bold['red']
      })

      worksheet.getCell('C3').alignment = general_alignment_n['center']
      worksheet.getCell('A1').alignment = general_alignment_n['center']
      worksheet.mergeCells('A1:I1')
      worksheet.mergeCells('A2:B2')
      worksheet.mergeCells('A3:B3')
      break

    case 'lss':
      lss_col_range.map((col_key) => {
        worksheet.getColumn(col_key).width = 7
      })
      worksheet.getRow(2).height = 66
      worksheet.getRow(3).height = 16.5
      worksheet.getRow(4).height = 16.5

      worksheet.getColumn('A').width = 12
      worksheet.getColumn('B').width = 25
      worksheet.getColumn('C').width = 14
      worksheet.getColumn('F').width = 12
      worksheet.getColumn('G').width = 12
      worksheet.getColumn('T').width = 15
      worksheet.getColumn('U').width = 10
      worksheet.getColumn('V').width = 10
      worksheet.getColumn('W').width = 10

      /** 字體、字型、顏色、背景顏色、框線、對齊 */
      ;['A3', 'A4', 'F2', 'F3', 'F4', 'F5'].map((cell) => {
        worksheet.getCell(`${cell}`).font = text_style_bold['white']
      })
      ;['G2', 'G3', 'G4', 'G5'].map((cell) => {
        worksheet.getCell(`${cell}`).font = text_style_bold['red']
      })
      worksheet.getCell('A1').font = text_style_bold['black']

      /** 儲存格合併 */
      worksheet.mergeCells('A1:W1')
      worksheet.mergeCells('A2:C2')
      worksheet.mergeCells('A3:C3')
      worksheet.mergeCells('A4:C4')
      break

    case 'alss':
      worksheet.getCell('A1').fill = header_bg['white']
      worksheet.getCell('A1').font = text_style_bold['black']
      worksheet.getColumn('A').width = 22.29
      worksheet.getColumn('B').width = 24.86
      worksheet.getColumn('C').width = 15.43
      worksheet.getColumn('D').width = 10.29
      worksheet.getColumn('E').width = 10.29
      worksheet.getColumn('F').width = 20.14
      worksheet.mergeCells('A1:G1')
      break

    case 'ctss':
      worksheet.getCell('A1').fill = header_bg['white']
      worksheet.getCell('A1').font = text_style_bold['black']
      worksheet.getColumn('A').width = 22.29
      worksheet.getColumn('B').width = 24.86
      worksheet.getColumn('C').width = 15.43
      worksheet.getColumn('D').width = 10.29
      worksheet.getColumn('E').width = 10.29
      worksheet.getColumn('F').width = 20.14
      worksheet.getColumn('G').width = 20.14
      worksheet.mergeCells('A1:G1')
      break

    case 'lds':
      worksheet.mergeCells('A1:I1')
      worksheet.getRow(2).height = 16.5
      worksheet.getColumn('A').width = 18
      worksheet.getColumn('B').width = 12.25
      worksheet.getColumn('C').width = 12.25
      worksheet.getColumn('D').width = 63.5
      worksheet.getColumn('E').width = 21.43
      worksheet.getColumn('F').width = 21.43
      worksheet.getColumn('G').width = 76.68
      worksheet.getColumn('H').width = 12.25
      worksheet.getColumn('I').width = 21.43
      worksheet.getCell('A1').font = text_style_bold['black']
      break

    case 'otss':
      worksheet.getRow('1').fill = header_bg['white']
      worksheet.getRow('1').font = text_style_bold['black']
      worksheet.getColumn('A').width = 11.57
      worksheet.getColumn('B').width = 24.86
      worksheet.getColumn('C').width = 5.57
      worksheet.getColumn('D').width = 5.57
      worksheet.getColumn('E').width = 8.14
      worksheet.getColumn('F').width = 8.14
      worksheet.getColumn('G').width = 10.57
      worksheet.getColumn('H').width = 5.57
      worksheet.mergeCells('A1:H1')
      worksheet.mergeCells('A2:A4')
      worksheet.mergeCells('B2:B4')
      worksheet.mergeCells('C2:C4')
      worksheet.mergeCells('D2:H2')
      worksheet.mergeCells('H3:H4')
      break

    case 'otds':
      worksheet.getRow('2').height = 31.5
      worksheet.getColumn('A').width = 18
      worksheet.getColumn('B').width = 15
      worksheet.getColumn('C').width = 12
      worksheet.getColumn('D').width = 12
      worksheet.getColumn('E').width = 14
      worksheet.getColumn('F').width = 14
      worksheet.getColumn('G').width = 14
      worksheet.getColumn('H').width = 22
      worksheet.getColumn('I').width = 22
      worksheet.getColumn('J').width = 14.14
      worksheet.getColumn('K').width = 14.14
      worksheet.getColumn('L').width = 14.14
      worksheet.getColumn('M').width = 5.57
      worksheet.getColumn('N').width = 10
      worksheet.getColumn('O').width = 22
      worksheet.getColumn('P').width = 22
      worksheet.mergeCells('A1:P1')
      worksheet.getCell('A1').font = text_style_bold['black']
      break

    case 'mal':
      worksheet.getCell('A1').fill = header_bg['white']
      worksheet.getCell('A1').font = text_style_bold['black']
      worksheet.mergeCells('A1:D1')
      worksheet.getColumn('A').width = 22.29
      worksheet.getColumn('B').width = 24.86
      worksheet.getColumn('C').width = 15
      worksheet.getColumn('D').width = 15
      break

    case 'otprsge':
      worksheet.getColumn('A').width = 17.29
      worksheet.getColumn('B').width = 11.57
      worksheet.getColumn('C').width = 11.57
      worksheet.getColumn('D').width = 11.86
      worksheet.getColumn('E').width = 5.57
      worksheet.getColumn('F').width = 5.57
      worksheet.getColumn('G').width = 5.57
      worksheet.getColumn('H').width = 5.57
      worksheet.getColumn('I').width = 10
      worksheet.getColumn('J').width = 10
      worksheet.getColumn('K').width = 10
      worksheet.getColumn('L').width = 10
      worksheet.getColumn('M').width = 70

      worksheet.mergeCells('A1:M1')
      worksheet.mergeCells('A2:A3')
      worksheet.mergeCells('B2:B3')
      worksheet.mergeCells('C2:C3')
      worksheet.mergeCells('D2:D3')
      worksheet.mergeCells('E2:E3')
      worksheet.mergeCells('F2:F3')
      worksheet.mergeCells('G2:G3')
      worksheet.mergeCells('H2:H3')
      worksheet.mergeCells('M2:M3')
      worksheet.getCell('A1').font = text_style_bold['black']
      break
  }
}

const fill_data = (worksheet_id, worksheet, statistical_data) => {
  switch (worksheet_id) {
    case 'srs':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          '0_minus_by_leave': item['0_minus_by_leave'],
          '1_monthly_annual_leave_used': item['1_monthly_annual_leave_used'],
          '2_monthly_annual_leave_carried_over': item['2_monthly_annual_leave_carried_over'],
          '3_monthly_compensate_leave': item['3_monthly_compensate_leave'],
          '4_monthly_compensate_leave_carried_over':
            item['4_monthly_compensate_leave_carried_over'],
          '5_yearly_overtime_used': item['5_yearly_overtime_used'],
          '6_monthly_overtime_used': item['6_monthly_overtime_used']
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']
          cell.fill = header_bg['white']

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }

          if (
            cell.fullAddress.col == 3 ||
            cell.fullAddress.col == 4 ||
            cell.fullAddress.col == 6 ||
            cell.fullAddress.col == 8
          ) {
            cell.font = text_style_normal['red']
          } else {
            cell.font = text_style_normal['black']
          }
        })
      })
      break

    case 'lss':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          '0_total_leave': item['0_total_leave'],
          '1_annual_leave': item['1_annual_leave'],
          '2_compensation_leave': item['2_compensation_leave'],
          '3_total_except_1_2': item['3_total_except_1_2'],
          '4_minus_except_1_2': item['4_minus_except_1_2'],
          '5_personal_leave_full': item['5_personal_leave_full'],
          '6_sick_leave_full': item['6_sick_leave_full'],
          '7_public_leave': item['7_public_leave'],
          '8_occupational_sickness_leave': item['8_occupational_sickness_leave'],
          '9_sick_leave_half': item['9_sick_leave_half'],
          '10_company_outing': item['10_company_outing'],
          '11_funeral_leave': item['11_funeral_leave'],
          '12_wedding_leave': item['12_wedding_leave'],
          '13_family_care_leave': item['13_family_care_leave'],
          '14_personal_leave_no': item['14_personal_leave_no'],
          '15_sick_leave_no': item['15_sick_leave_no'],
          '16_menstrual_leave': item['16_menstrual_leave'],
          '17_maternity_leave': item['17_maternity_leave'],
          '18_maternity_miscarriage_leave': item['18_maternity_miscarriage_leave'],
          '19_prenatal_exam_leave': item['19_prenatal_exam_leave'],
          '20_paternity_leaves': item['20_paternity_leaves']
        })

        row.eachCell(function (cell) {
          if (cell.fullAddress.col == 3) {
            cell.font = general_cell_text_b['black']
          } else if (cell.fullAddress.col == 6) {
            cell.font = general_cell_text_b['black']
          } else if (cell.fullAddress.col == 7) {
            cell.font = general_cell_text_b['red']
          } else {
            cell.font = text_style_normal['black']
          }
          if (cell.fullAddress.col == 1) {
            cell.alignment = general_alignment_nWT['right']
          } else {
            cell.alignment = general_alignment_nWT['center']
          }

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
          cell.border = general_border_style['all']
        })
      })

      break

    case 'alss':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          '0_available_days': item['0_available_days'],
          '1_used_days': item['1_used_days'],
          '2_current_month_used': item['2_current_month_used'],
          '3_monthly_carried_over': item['3_monthly_carried_over'],
          '4_remaining_days': item['4_remaining_days']
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']
          cell.fill = header_bg['white']

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
        })
      })
      break

    case 'ctss':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          '0_yearly_total_hours': item['0_yearly_total_hours'],
          '1_unused_hours': item['1_unused_hours'],
          '2_current_month_used': item['2_current_month_used'],
          '3_remaining_hours': item['3_remaining_hours'],
          '4_current_month_carried_over': item['4_current_month_carried_over']
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']
          cell.fill = header_bg['white']

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
        })
      })
      break

    case 'lds':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          todolist_no: item['todolist_no'],
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          leave_category_name: item['leave_category_name'],
          start_date: item['start_date'],
          end_date: item['end_date'],
          create_desc: item['create_desc'],
          apply_hour: parseFloat(item['apply_hour']),
          create_date: item['create_date']
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']

          if (cell.fullAddress.col == 4 || cell.fullAddress.col == 7) {
            cell.alignment = general_alignment_nWT['left']
          } else {
            cell.alignment = general_alignment_nWT['center']
          }

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
        })
      })
      break

    case 'otss':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          user_name: item['user_name'],
          employee_no: item['employee_no'],
          yearly_total_hours: item['yearly_total_hours'],
          ge_regular_150: item['ge_regular_150'],
          ge_rest_200: item['ge_rest_200'],
          ge_holiday_200: item['ge_holiday_200'],
          ge_dayoff_200: item['ge_dayoff_200'],
          monthly_total_hours: item['monthly_total_hours']
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']
          cell.fill = header_bg['white']

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
        })
      })
      break

    case 'otds':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          todolist_no: item['todolist_no'],
          employ_category_name: item['employ_category_name'],
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          apply_hour: parseFloat(item['apply_hour']).toFixed(2),
          break_hour: parseFloat(item['break_hour']).toFixed(2),
          overtime_hour: parseFloat(item['overtime_hour']).toFixed(2),
          clock_in_time: item['clock_in_time'],
          clock_out_time: item['clock_out_time'],
          overtime_clock_diff: parseFloat(item['overtime_clock_diff']).toFixed(2),
          pay_hours: '--',
          tex_hours: '--',
          overtime_diet: parseInt(item['overtime_diet']),
          overtime_fee: item['overtime_fee'],
          audit_date: item['audit_date'],
          clock_out_create_date: item['clock_out_create_date']
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']
          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
        })
      })
      break

    case 'mal':
      Object.values(statistical_data).forEach(function (item) {
        const row = worksheet.addRow({
          employee_no: item['employee_no'],
          user_name: item['user_name'],
          employ_category_name: item['employ_category_name'],
          meal_allowance: parseInt(item['meal_allowance'])
        })

        row.eachCell(function (cell) {
          cell.font = text_style_normal['black']
          cell.alignment = general_alignment_nWT['center']
          cell.border = general_border_style['all']
          cell.fill = header_bg['white']

          if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow']
          } else {
            cell.fill = header_bg['white']
          }
        })
      })
      break

    case 'otprsge':

  //   {
  //     "user_uuid": "0C557601-0402-3A77-3836-D1F736518D16",
  //     "employee_no": "212456248",
  //     "user_name": "張修維",
  //     "employ_category_uuid": "D9EEAF9F-C8C9-4C51-BB39-96404300851E",
  //     "employ_category_name": "Field Engineer",
  //     "overtime_date": "2025-03-01",
  //     "todolist_no": "03012025000008",
  //     "ge_regular_150": 0,
  //     "ge_rest_200": 10,
  //     "ge_holiday_200": 0,
  //     "ge_dayoff_200": 0,
  //     "date_type_str": "休息",
  //     "original_date_type_str": "休息",
  //     "note": {
  //         "merage_report": null,
  //         "merage_todolist": null,
  //         "leave_info": null,
  //         "date_type_str": "休息",
  //         "original_date_type_str": "休息",
  //         "overflow_hours": null
  //     },
  //     "working_record": [
  //         {
  //             "clock_hours": 11,
  //             "break_hours": 1,
  //             "pay_hours": 10,
  //             "overtime_fee": 0,
  //             "is_regular": false,
  //             "is_represent_record": true,
  //             "record_detail": {
  //                 "todolist_uuid": "1242C437-7672-68F8-923D-A9774BC1DCC2",
  //                 "shift_schedule_uuid": null,
  //                 "clock_in_uuid": "C298DD5C-9692-D8BB-9261-C2A68FA4B5A0",
  //                 "clock_in_time": "2025-03-01 09:00:16",
  //                 "clock_in_create_date": "2025-03-25 18:47:46",
  //                 "clock_out_uuid": "69C29492-16B2-DE9E-5135-3EC10AABDDFE",
  //                 "clock_out_time": "2025-03-01 20:00:41",
  //                 "clock_out_create_date": "2025-03-25 18:47:46",
  //                 "todolist_overtime_fee": "0",
  //                 "todolist_apply_hour": "10.0",
  //                 "todolist_overtime_hour": "10.0",
  //                 "todolist_break_hour": "1.0",
  //                 "todolist_create_date": "2025-03-14 03:59:46",
  //                 "todolist_audit_date": "2025-03-17 10:12:14",
  //                 "todolist_no": "03012025000008"
  //             }
  //         }
  //     ],
  //     "unflat_payroll_info": {
  //         "working_record": [
  //             {
  //                 "clock_hours": 11,
  //                 "break_hours": 1,
  //                 "pay_hours": 10,
  //                 "overtime_fee": 0,
  //                 "is_regular": false,
  //                 "is_represent_record": true,
  //                 "record_detail": {
  //                     "todolist_uuid": "1242C437-7672-68F8-923D-A9774BC1DCC2",
  //                     "shift_schedule_uuid": null,
  //                     "clock_in_uuid": "C298DD5C-9692-D8BB-9261-C2A68FA4B5A0",
  //                     "clock_in_time": "2025-03-01 09:00:16",
  //                     "clock_in_create_date": "2025-03-25 18:47:46",
  //                     "clock_out_uuid": "69C29492-16B2-DE9E-5135-3EC10AABDDFE",
  //                     "clock_out_time": "2025-03-01 20:00:41",
  //                     "clock_out_create_date": "2025-03-25 18:47:46",
  //                     "todolist_overtime_fee": "0",
  //                     "todolist_apply_hour": "10.0",
  //                     "todolist_overtime_hour": "10.0",
  //                     "todolist_break_hour": "1.0",
  //                     "todolist_create_date": "2025-03-14 03:59:46",
  //                     "todolist_audit_date": "2025-03-17 10:12:14",
  //                     "todolist_no": "03012025000008"
  //                 }
  //             }
  //         ],
  //         "hours_info": {
  //             "previous_hours": 0,
  //             "total_daily_hours": 10
  //         },
  //         "payroll_detail": {
  //             "regular_100": 0,
  //             "regular_134": 0,
  //             "regular_167": 0,
  //             "rest_134": 2,
  //             "rest_167": 6,
  //             "rest_267": 2,
  //             "holiday_100": 0,
  //             "holiday_134": 0,
  //             "holiday_167": 0,
  //             "dayoff_100": 0,
  //             "dayoff_200": 0,
  //             "overflow_hours": 0,
  //             "origin_holiday_hours": 0,
  //             "origin_dayoff_hours": 0,
  //             "compensate_leave_hours": 0,
  //             "paid_hours": 10,
  //             "paid_as": false,
  //             "clock_hours": 10,
  //             "note": {
  //                 "merage_report": null,
  //                 "merage_todolist": null,
  //                 "leave_info": null,
  //                 "date_type_str": "休息",
  //                 "original_date_type_str": "休息",
  //                 "overflow_hours": null
  //             }
  //         }
  //     },
  //     "regular_100": 0,
  //     "regular_134": 0,
  //     "regular_167": 0,
  //     "rest_134": 2,
  //     "rest_167": 6,
  //     "rest_267": 2,
  //     "holiday_100": 0,
  //     "holiday_134": 0,
  //     "holiday_167": 0,
  //     "dayoff_100": 0,
  //     "dayoff_200": 0,
  //     "overflow_hours": 0,
  //     "origin_holiday_hours": 0,
  //     "origin_dayoff_hours": 0,
  //     "compensate_leave_hours": 0,
  //     "paid_hours": 10,
  //     "paid_as": false,
  //     "clock_hours": 10,
  //     "previous_hours": 0,
  //     "total_daily_hours": 10
  // }
  Object.values(statistical_data).forEach(function(item) {
    const row = worksheet.addRow({
        'todolist_no': item['todolist_no'],
        'employee_no': item['employee_no'],
        'user_name': item['user_name'],
        'overtime_date': item['overtime_date'],
        'clock_hours': item['clock_hours'],
        'compensate_leave_hours': item['compensate_leave_hours'],
        'paid_hours': item['paid_hours'],
        'date_type_str': item['date_type_str'],
        'ge_regular_150': item['ge_regular_150'],
        'ge_rest_200': item['ge_rest_200'],
        'ge_holiday_200': item['ge_holiday_200'],
        'ge_dayoff_200': item['ge_dayoff_200'],
        'note': '--'
    });

    row.eachCell(function(cell, colNumber) {
        // if (item['Payroll']['rate_hours']['paid_as']) {
        //     cell.font = text_style_normal['red'];
        // } else {
        //     cell.font = text_style_normal['black'];
        // }

        // if (colNumber == 8) {
        //     /** 給付型態 */
        //     if (item['Payroll']['note']['leave_no'] != null) {
        //         cell.font = text_style_normal['red'];
        //     }
        // }

        cell.font = text_style_normal['black']
        cell.alignment = general_alignment_nWT['center'];
        cell.border = general_border_style['all'];

        if (cell.fullAddress.row % 2 == 1) {
            cell.fill = header_bg['light_yellow'];
        } else {
            cell.fill = header_bg['white'];
        }

        if (cell.fullAddress.col == 13) {
            cell.alignment = general_alignment_nWT['left'];
        }
    });
});
      break
  }
}

export const export_excel = (
  summary_result_items,
  leave_statistic_items,
  annual_leave_usage_items,
  compensate_leave_usage_items,
  leave_detail_items,
  overtime_statistics_items,
  overtime_detail_items,
  overtime_meal_allowance_items,
  overtime_statistics_payroll_items
) => {
  generate_table_settings('2025-03')
  const workbook = new ExcelJS.Workbook()

  // sheet1 - 總表
  const srs_sheets = workbook.addWorksheet(srs_worksheet_name)
  fill_header_text('srs', srs_sheets)
  adjust_column_format('srs', srs_sheets)
  fill_data('srs', srs_sheets, summary_result_items)

  // sheet2 - 請假明細
  const lss_sheets = workbook.addWorksheet(lss_worksheet_name)
  fill_header_text('lss', lss_sheets)
  adjust_column_format('lss', lss_sheets)
  fill_data('lss', lss_sheets, leave_statistic_items)

  // sheet3 - 特休假
  const alss_sheets = workbook.addWorksheet(alss_worksheet_name)
  fill_header_text('alss', alss_sheets)
  adjust_column_format('alss', alss_sheets)
  fill_data('alss', alss_sheets, annual_leave_usage_items)

  // sheet4 - 補休假
  const ctss_sheets = workbook.addWorksheet(ctss_worksheet_name)
  fill_header_text('ctss', ctss_sheets)
  adjust_column_format('ctss', ctss_sheets)
  fill_data('ctss', ctss_sheets, compensate_leave_usage_items)

  // sheet5 - 本月異動請假單
  const lds_sheets = workbook.addWorksheet(lds_worksheet_name)
  fill_header_text('lds', lds_sheets)
  adjust_column_format('lds', lds_sheets)
  fill_data('lds', lds_sheets, leave_detail_items)

  // sheet6 - 延長工時報表
  const otss_sheets = workbook.addWorksheet(otss_worksheet_name)
  fill_header_text('otss', otss_sheets)
  adjust_column_format('otss', otss_sheets)
  fill_data('otss', otss_sheets, overtime_statistics_items)

  // sheet7 - 延長工時給付清冊
  const otds_sheets = workbook.addWorksheet(otds_worksheet_name)
  fill_header_text('otds', otds_sheets)
  adjust_column_format('otds', otds_sheets)
  fill_data('otds', otds_sheets, overtime_detail_items)

  // sheet8 - 誤餐費
  const mal_sheets = workbook.addWorksheet(mal_worksheet_name)
  fill_header_text('mal', mal_sheets)
  adjust_column_format('mal', mal_sheets)
  fill_data('mal', mal_sheets, overtime_meal_allowance_items)

  // sheet9 - 延長工時給付清冊
  const otprsge_sheets = workbook.addWorksheet(otprsge_worksheet_name)
  fill_header_text('otprsge', otprsge_sheets)
  adjust_column_format('otprsge', otprsge_sheets)
  fill_data('otprsge', otprsge_sheets, overtime_statistics_payroll_items)

  // download excel file
  workbook.xlsx.writeBuffer().then((content) => {
    // eslint-disable-next-line no-undef
    const link = document.createElement('a')
    // eslint-disable-next-line no-undef
    const blobData = new Blob([content], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    })
    link.download = `${file_name}.xlsx`
    // eslint-disable-next-line no-undef
    link.href = URL.createObjectURL(blobData)
    link.click()
  })
}
