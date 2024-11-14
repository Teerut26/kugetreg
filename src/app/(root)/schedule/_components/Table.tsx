"use client";

import { Table, Text } from "@mantine/core";
import { type Course } from "types/responses/IGroupCourseResponse";
import { DaysMap } from "utils/daysMap";
import { timeMap, timesDisplay } from "utils/timeMap";

interface Props {
  data: Course[];
}

export default function TableCourse(props: Props) {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  const width = 120;
  const height = 80;

  return (
    <div>
        asdf
    </div>
    // <Table withTableBorder withColumnBorders withRowBorders>
    //   <Table.Thead>
    //     <Table.Tr>
    //       <Table.Th className="bg-blue-50" miw={width} h={20}>
    //         Day/Time
    //       </Table.Th>
    //       {timeMap.map((time, index) => (
    //         <Table.Th className="bg-blue-50" miw={width} h={20} key={index}>
    //           {time.label}
    //         </Table.Th>
    //       ))}
    //     </Table.Tr>
    //   </Table.Thead>
    //   <Table.Tbody>
    //     {DaysMap.map((day, index) => (
    //       <Table.Tr key={index}>
    //         <Table.Th className="bg-blue-50 text-center" miw={width} h={height}>
    //           <Text>{day.key}</Text>
    //         </Table.Th>
    //         {props.data
    //           .filter((course) => course.day_w.trim() === day.key)
    //           .map((course, courseIndex) => (
    //             <Table.Th colSpan={1}  className="bg-green-50" key={courseIndex}>
    //               <Text lineClamp={1} size="xs">
    //                 {course.subject_code}
    //               </Text>
    //               <Text lineClamp={2} size="sm" fw={600}>
    //                 {course.subject_name_en}
    //               </Text>
    //             </Table.Th>
    //           ))}
    //       </Table.Tr>
    //     ))}
    //   </Table.Tbody>
    // </Table>
  );
}
