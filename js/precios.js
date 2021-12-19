let dynamicTable = document.getElementById("dynamicTable");
let largeTable = document.getElementById("largeTable");
let fullTable = largeTable;
let firstColumnRows = [];
let columnTitles = [];
let tableData = {};

let nameOfRowItems = document.getElementsByClassName("name_of_row");
for (let i = 0; i < nameOfRowItems.length; i++) {
  const element = nameOfRowItems[i];
  firstColumnRows.push(element.innerText);
}

let tableHeadItems = document.getElementsByClassName(
  "table-module__table_head"
);
for (let i = 0; i < tableHeadItems.length; i++) {
  const element = tableHeadItems[i];
  columnTitles.push(element.innerText);
}

let rowIconItems = document.querySelectorAll("[class^=table-module__row-icon]");
columnTitles.forEach((columItem, columnIndex) => {
  let dataTemp = [];
  let currentIndex = columnIndex;
  rowIconItems.forEach((rowItem, index) => {
    if (currentIndex <= rowIconItems.length && index == currentIndex) {
      dataTemp.push(rowItem);
      currentIndex += 3;
    }
  });
  tableData[columItem] = dataTemp;
});


const dynamicTables = Object.entries(tableData).map((product, index) => {
    return `<table class = "table-module" id="largeTable">
        <tr class = "table-module__row">
         ${generateHeader(product[0])}
         ${product[1].map((item, index) =>
           generateColumnData(item.outerHTML, index)
         ).join('')}
        </tr>
        <tr class = "table-module__row">
        <td> </td>
        ${index == 0 
            ? `
                <td>
                    <div class="table-module__button_principal">
                        <div class="table-module__button_wrapp">
                            <a class = "table-module__button_standar">Pruebalo ahora</a>
                        </div>
                    </div>
                </td>` 
            : `
                <td class="table-module__button_principal">
                    <div class="table-module__button_wrapp">
                        <a class = "table-module__button_standar">Comprar</a>
                    </div>
                </td>`
        }
    </tr>

        </table>`
});

function generateHeader(headerInfo) {
  return `<tr class = "table-module__row">
    <td class = "table-module__rows"></td>
    <td class = "table-module__rows">
        <span class = "table-module__recommended">Recomendado
        </span>
        <p class = "table-module__table_head"> ${headerInfo}
        </p>
    </td>
</tr>`;
}

function generateColumnData(columnInfo, index) {
  return `<tr class = "table-module__row">
    <td class = table-module__rows--back-color>
        <p class = "name_of_row">
            <span>${firstColumnRows[index]}</span>
        <a class = "explane_poup_btn" data-href="explane_lesson_plans">
            <i class="far fa-question-circle"></i>
        </a>
        </p>
    </td>
    ${columnInfo}
</tr>
`;
}

window.addEventListener("resize", function (event) {
  if (window.innerWidth < 768) {
    largeTable.style.display = "none";
    dynamicTable.innerHTML = dynamicTables;
} else {
    dynamicTable.innerHTML = fullTable.outerHTML;
    largeTable.style.display = "block";
  }
});
