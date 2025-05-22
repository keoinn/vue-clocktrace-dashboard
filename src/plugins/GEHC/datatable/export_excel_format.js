export const general_border_style = {
  all: {
    top: {
      style: 'thin'
    },
    left: {
      style: 'thin'
    },
    bottom: {
      style: 'thin'
    },
    right: {
      style: 'thin'
    }
  }
}

export const general_alignment_n = {
  center: {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true
  },
  right: {
    vertical: 'middle',
    horizontal: 'right',
    wrapText: true
  },
  left: {
    vertical: 'middle',
    horizontal: 'left',
    wrapText: true
  }
}

export const general_alignment_nWT = {
  center: {
    vertical: 'middle',
    horizontal: 'center'
  },
  right: {
    vertical: 'middle',
    horizontal: 'right'
  },
  left: {
    vertical: 'middle',
    horizontal: 'left'
  }
}

/** 表頭:背景格式 (fill): 籃底 */
export const header_bg = {
  blue: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {
      argb: '3C8DBC'
    }
  },
  white: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {
      argb: 'FFFFFFFF'
    }
  },
  light_yellow: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {
      argb: 'FFFFFFCC'
    }
  }
}

/** 文型色定 (font): 白字 */
export const text_style_normal = {
  white: {
    name: 'Calibri',
    /** PMingLiU -> 新細明 */
    color: {
      argb: 'FFFFFFFF'
    },
    family: 2,
    size: 12
  },
  black: {
    name: 'Calibri',
    color: {
      argb: 'FF000000'
    },
    family: 2,
    size: 12
  },
  red: {
    name: 'Calibri',
    color: {
      argb: 'FFFF0000'
    },
    family: 2,
    size: 12
  }
}

export const text_style_bold = {
  white: {
    name: 'Calibri',
    color: {
      argb: 'FFFFFFFF'
    },
    family: 2,
    size: 12,
    bold: true
  },
  red: {
    name: 'Calibri',
    color: {
      argb: 'FFFF0000'
    },
    family: 2,
    size: 12,
    bold: true
  },
  black: {
    name: 'PMingLiU',
    color: {
      argb: 'FF000000'
    },
    family: 2,
    size: 11,
    bold: true
  }
}

export const general_cell_text_b = {
  red: {
    name: 'Calibri',
    color: {
      argb: 'ffff0000'
    },
    family: 2,
    size: 12,
    bold: true
  },
  black: {
    name: 'Calibri',
    color: {
      argb: 'ff000000'
    },
    family: 2,
    size: 12,
    bold: true
  }
}
