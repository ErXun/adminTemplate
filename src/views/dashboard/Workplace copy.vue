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
export default {
  name: "App",
  data() {
    this.components = {
      header: {
        cell: (h, props, children) => {
          const { key, ...restProps } = props;
          const col = this.columns.find((col) => {
            const k = col.dataIndex || col.key;
            return k === key;
          });

          if (!col) {
            return h("th", { ...restProps }, [...children]);
          }

          const dragProps = {
            key: col.dataIndex || col.key,
            class: "table-draggable-handle",
            attrs: {
              w: 10,
              x: col.width,
              z: 1,
              axis: "x",
              draggable: true,
              resizable: false,
            },
            on: {
              dragging: (x, y) => {
                col.width = Math.max(x, 50);
              },
            },
          };
          const drag = h("vue-draggable-resizable", { ...dragProps });
          return h("th", { ...restProps, class: "resize-table-th" }, [
            ...children,
            drag,
          ]);
        },
      },
    };
    return {
      data: [
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
      ],
      columns: [
        {
          title: "Date",
          dataIndex: "date",
          width: 10,
        },
        {
          title: "Amount",
          dataIndex: "amount",
          width: 10,
        },
        {
          title: "Type",
          dataIndex: "type",
          width: 10,
        },
        {
          title: "Note",
          dataIndex: "note",
          width: 10,
        },
        {
          title: "Action",
          key: "action",
            width: 10,
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
};
</script>
<style>
.resize-table-th {
  position: relative;
}
.table-draggable-handle {
  /* width: 10px !important; */
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
}
</style>
