<template>
  <a-table
    bordered
    :columns="columns"
    :components="components"
    :data-source="data"
  >
  </a-table>
</template>

<script>
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 200,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 200,
  },
  {
    title: "Type",
    dataIndex: "type",
    width: 200,
  },
  {
    title: "Note",
    dataIndex: "note",
    width: 200,
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "App",
  data() {
    this.components = {
      header: {
        cell: (h, props, children) => {
          console.log(`props`, props);
          const { key, ...restProps } = props;
          const col = columns.find((col) => {
            const k = col.dataIndex || col.key;
            return k === key;
          });
          if (!col.width) {
            return <th {...restProps}>{children}</th>;
          }
          const onDrag = (x) => {
            col.width = Math.max(x, 1);
          };
          return (
            <th {...restProps} width={col.width} class="resize-table-th">
              {children}
              <vue-draggable-resizable
                key={col.key}
                class="table-draggable-handle"
                w={10}
                x={col.width}
                z={1}
                axis="x"
                draggable={true}
                resizable={false}
                onDragging={onDrag}
              ></vue-draggable-resizable>
            </th>
          );
        },
      },
    };
    return {
      data: [],
      columns,
    };
  },
  mounted() {
    setTimeout(() => {
      this.data = [
        {
          key: 0,
          date: "2018-02-11",
          amount: 120,
          type: "income",
          note: "transfer",
        },
        {
          key: 1,
          date: "2018-03-11",
          amount: 243,
          type: "income",
          note: "transfer",
        },
        {
          key: 2,
          date: "2018-04-11",
          amount: 98,
          type: "income",
          note: "transfer",
        },
      ];
    }, 3000);
  },
};
</script>
<style>
.resize-table-th {
  position: relative;
}
.table-draggable-handle {
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
}
</style>
