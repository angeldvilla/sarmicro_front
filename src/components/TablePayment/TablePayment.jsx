import MUIDataTable from "mui-datatables";

/* TABLE DESIGN */
const columns = [
  {
    name: "Nombre",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Empresa",
    label: "Empresa",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Ciudad",
    label: "Ciudad",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Estado",
    label: "Estado",
    options: {
      filter: true,
      sort: true,
    },
  },
];
const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];
const options = {
  filterType: "checkbox",
};
/* ----------------- */
const TablePayment = () => {
  return (
    <div style={{display: "flex", justifyContent:"center"}}>
    <MUIDataTable
    title={"Valores de Polizas"}
    data={data}
    columns={columns}
    options={options}
    responsive
    ></MUIDataTable>
    </div>
  );
};


export default TablePayment;