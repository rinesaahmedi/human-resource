import { Anchor, Table } from "@mantine/core";

export const EmployeeTable = (props) => {
  const rows = props.data.map((row) => {
    return (
      <Table.Tr key={row.name}>
        <Table.Td key={row.id}>{row.name}</Table.Td>
        <Table.Td>{row.departmentId || "N/A"}</Table.Td>
        <Table.Td>{row.contact}</Table.Td>
        {props.actions && (
          <Table.Td className="flex gap-4">
            {props.actions.map((item) => {
              return (
                <button
                  className="p-2 rounded bg-slate-200"
                  key={item.title}
                  onClick={() => item.handleClick(row)}
                >
                  {item.icon}
                </button>
              );
            })}
          </Table.Td>
        )}
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            {props.headers &&
              props.headers.map((item) => {
                return <Table.Th key={item.title}>{item.title}</Table.Th>;
              })}
            {props.actions && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default EmployeeTable;
