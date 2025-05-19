const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200
        // sorter: (a: any, b: any) => a.age - b.age
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 200
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName'
      }
    ]
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right'
  }
]

const columnsGroup = [
  [
    {
      title: 'Name',
      rowSpan: 4,
      colSpan: 1,
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Other',
      rowSpan: 1,
      colSpan: 4
    },
    {
      title: 'Compnay',
      rowSpan: 1,
      colSpan: 2
    },
    {
      title: 'Gender',
      rowSpan: 4,
      colSpan: 1,
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      fixed: 'right'
    }
  ],
  [
    {
      title: 'Age',
      rowSpan: 3,
      colSpan: 1,
      dataIndex: 'age',
      key: 'age',
      width: 200
    },
    {
      title: 'Address',
      rowSpan: 1,
      colSpan: 3
    },
    {
      title: 'Compnay Address',
      rowSpan: 3,
      colSpan: 1,
      dataIndex: 'companyAddress',
      key: 'companyAddress',
      width: 200
    },
    {
      title: 'Company Name',
      rowSpan: 3,
      colSpan: 1,
      dataIndex: 'companyName',
      key: 'companyName'
    }
  ],
  [
    {
      title: 'Street',
      rowSpan: 2,
      colSpan: 1,
      dataIndex: 'street',
      key: 'street',
      width: 200
    },
    {
      title: 'Block',
      rowSpan: 1,
      colSpan: 2
    }
  ]
  [
    {
      title: 'Building',
      rowSpan: 1,
      colSpan: 1,
      dataIndex: 'building',
      key: 'building',
      width: 100
    },
    {
      title: 'Door No.',
      rowSpan: 1,
      colSpan: 1,
      dataIndex: 'number',
      key: 'number',
      width: 100
    }
  ]
]

function getThColumnsGroup(columns) {
  const maxDepth = getMaxDepth(columns);
  const result = [];

  for (let i = 0; i < maxDepth; i++) {
    result.push([]);
  }

  function processColumns(cols, depth, rowSpan = 1) {
    cols.forEach((col, index) => {
      const groupCol = {
        title: col.title,
        dataIndex: col.dataIndex,
        key: col.key,
        width: col.width,
        fixed: col.fixed,
        rowSpan: rowSpan,
        colSpan: 1
      };

      if (col.children && col.children.length > 0) {
        const childDepth = getMaxDepth(col.children);
        const childRowSpan = rowSpan - childDepth;

        if (childRowSpan > 0) {
          groupCol.rowSpan = childRowSpan;
        } else {
          delete groupCol.rowSpan;
        }

        if (depth === 0) {
          groupCol.colSpan = countLeafNodes(col);
        }

        result[depth].push(groupCol);

        processColumns(col.children, depth + 1, childRowSpan);
      } else {
        result[depth].push(groupCol);
      }
    });
  }

  processColumns(columns, 0);

  return result;
}

function getMaxDepth(columns, currentDepth = 1) {
  let maxDepth = currentDepth;

  columns.forEach((col) => {
    if (col.children && col.children.length > 0) {
      const childDepth = getMaxDepth(col.children, currentDepth + 1);
      if (childDepth > maxDepth) {
        maxDepth = childDepth;
      }
    }
  });

  return maxDepth;
}

function countLeafNodes(column) {
  if (!column.children || column.children.length === 0) {
    return 1;
  }

  let count = 0;
  column.children.forEach((child) => {
    count += countLeafNodes(child);
  });

  return count;
}
const res = getThColumnsGroup(columns);
console.log('res', res)