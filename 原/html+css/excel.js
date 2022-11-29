function JSONToExcelConvertor(JSONData, FileName, ShowLabel) {
    // 先转化json
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData

    var excel = '<table>'

    // 设置表头
    var row = '<tr>'
    for (var i = 0, l = ShowLabel.length; i < l; i++) {
        if (typeof ShowLabel[i] === 'object') {
            row += `<th ${ShowLabel[i].width ? `width=${ShowLabel[i].width}` : ''}>` + ShowLabel[i].value + '</th>'
        } else {
            row += '<th>' + ShowLabel[i] + '</th>'
        }
        
    }
    // 换行
    excel += row + '</tr>'

    // 设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = '<tr>'
        let labelIndex = 0
        for (var index in arrData[i]) {
            var value = arrData[i][index] === '.' ? '' : arrData[i][index]
            if (typeof value === 'object') {
                row += `<td style="text-align:center;background-color:${value.backgroundColor};color:${value.color}" ${value.rowspan ? `rowspan=${value.rowspan}` : ''} ${value.colspan ? `colspan=${value.colspan}` : ''} ${value.width ? `width=${value.width}` : ''} >` + value.value + '</td>'
            } else {
                row += `<td style="text-align:center">` + value + '</td>'
            }
            labelIndex++
        }
        excel += row + '</tr>'
    }

    excel += '</table>'

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'
    excelFile += '; charset=UTF-8">'
    excelFile += '<head>'
    excelFile += '<!--[if gte mso 9]>'
    excelFile += '<xml>'
    excelFile += '<x:ExcelWorkbook>'
    excelFile += '<x:ExcelWorksheets>'
    for(let i=0;i<2;i++) {
        excelFile += '<x:ExcelWorksheet>'
        excelFile += '<x:Name>'
        excelFile += `第${i+1}页`
        excelFile += '</x:Name>'
        excelFile += '<x:WorksheetOptions>'
        excelFile += '<x:DisplayGridlines/>'
        excelFile += '</x:WorksheetOptions>'
        excelFile += '</x:ExcelWorksheet>'
    }
    
    excelFile += '</x:ExcelWorksheets>'
    excelFile += '</x:ExcelWorkbook>'
    excelFile += '</xml>'
    excelFile += '<![endif]-->'
    excelFile += '</head>'
    excelFile += '<body>'
    excelFile += excel
    excelFile += '</body>'
    excelFile += '</html>'

    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)

    var link = document.createElement('a')
    link.href = uri

    link.style = 'visibility:hidden'
    link.download = FileName + '.xls'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

