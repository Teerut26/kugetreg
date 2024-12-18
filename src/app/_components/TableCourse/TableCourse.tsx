"use client";

import React from "react";
import { type Course } from "@/types/responses/IGroupCourseResponse";
import clsx from "clsx";
import _ from "lodash";
import { Text } from "@mantine/core";

interface Props {
    scheduleData: Course[];
    canClick?: boolean;
}

const dayColors: Record<string, { bg: string; bgHover: string; border: string; text: string }> =
{
    MON: { bg: "bg-red-100", bgHover: "hover:bg-red-200", border: "border-red-300", text: "text-red-800" },
    TUE: {
        bg: "bg-orange-100",
        bgHover: "hover:bg-orange-200",
        border: "border-orange-300",
        text: "text-orange-500",
    },
    WED: {
        bg: "bg-yellow-100",
        bgHover: "hover:bg-yellow-200",
        border: "border-yellow-300",
        text: "text-yellow-500",
    },
    THU: {
        bg: "bg-green-100",
        bgHover: "hover:bg-green-200",
        border: "border-green-300",
        text: "text-green-500",
    },
    FRI: {
        bg: "bg-blue-100",
        bgHover: "hover:bg-blue-200",
        border: "border-blue-300",
        text: "text-blue-500",
    },
    SAT: {
        bg: "bg-indigo-100",
        bgHover: "hover:bg-indigo-200",
        border: "border-indigo-300",
        text: "text-indigo-500",
    },
    SUN: {
        bg: "bg-purple-100",
        bgHover: "hover:bg-purple-200",
        border: "border-purple-300",
        text: "text-purple-500",
    },
    NONE: {
        bg: "bg-gray-100",
        bgHover: "hover:bg-gray-200",
        border: "border-gray-300",
        text: "text-gray-500",
    },
};

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const timeMap: { time: string; pos: number }[] = [
    { time: "8:00", pos: 3 },
    { time: "8:30", pos: 4 },
    { time: "9:00", pos: 5 },
    { time: "9:30", pos: 6 },
    { time: "10:00", pos: 7 },
    { time: "10:30", pos: 8 },
    { time: "11:00", pos: 9 },
    { time: "11:30", pos: 10 },
    { time: "12:00", pos: 11 },
    { time: "12:30", pos: 12 },
    { time: "13:00", pos: 13 },
    { time: "13:30", pos: 14 },
    { time: "14:00", pos: 15 },
    { time: "14:30", pos: 16 },
    { time: "15:00", pos: 17 },
    { time: "15:30", pos: 18 },
    { time: "16:00", pos: 19 },
    { time: "16:30", pos: 20 },
    { time: "17:00", pos: 21 },
    { time: "17:30", pos: 22 },
    { time: "18:00", pos: 23 },
    { time: "18:30", pos: 24 },
    { time: "19:00", pos: 25 },
    { time: "19:30", pos: 26 },
    { time: "20:00", pos: 27 },
    { time: "20:30", pos: 28 },
    { time: "21:00", pos: 29 },
    { time: "21:30", pos: 30 },
    { time: "22:00", pos: 31 },
    { time: "22:30", pos: 32 },
    { time: "23:00", pos: 33 },
    { time: "23:30", pos: 34 },
];

const TableCourse = (props: Props) => {
    const getPosition = (time: string) => {
        const hour = parseInt(time.split(":")[0]!);
        const minute = parseInt(time.split(":")[1]!);
        const timeString = `${hour}:${minute === 0 ? "00" : "30"}`;
        const timeObj = timeMap.find((t) => t.time === timeString);
        if (timeObj) {
            return timeObj.pos;
        }
        return 0;
    };

    const CourseSorting = (courses: Course[] | undefined) => {
        const sortedItems = _.orderBy(courses, ["time_start"], "asc");
        return sortedItems;
    };

    const maxTime = _.maxBy(CourseSorting(props.scheduleData), (o) => {
        return parseInt(o.time_to.split(":")[0] ?? "0");
    });

    const maxIndex = _.findIndex(hours, (time) => time === parseInt(maxTime?.time_to.split(":")[0] ?? "0")) + 1;

    const gridRepeat = hours.slice(0, maxIndex).length * 2

    const widthClass = `w-full`;
    const heightClass = `h-[80px]`;

    return (
        <div className={clsx("flex flex-col w-full")}>
            <div className={`grid`} style={{
                gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
            }}>
                <div className={clsx("border-b border-r border-l border-t col-span-2 border-[#e3e5f8] bg-[#fafaff] p-2 font-semibold", widthClass)}>
                    Day/Time
                </div>
                {hours.slice(0, maxIndex).map((hour) => (
                    <React.Fragment key={hour}>
                        <div className={clsx("col-span-2 flex border-b border-t border-r border-[#e3e5f8] bg-[#fafaff] pl-1 items-center text-center", widthClass)}>
                            {hour}
                        </div>
                    </React.Fragment>
                ))}
            </div>
            {days.map((day) => (
                <div className="relative" key={day}>
                    <div className={`grid`} style={{
                        gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                    }}>
                        <div className={clsx("border-r flex items-center justify-center border-l col-span-2 border-[#e3e5f8] bg-[#fafaff] p-2 font-semibold", "border-b", widthClass, heightClass)}>
                            {day}
                        </div>
                        {hours.slice(0, maxIndex).map((hour) => (
                            <div className={clsx("col-span-2 border-r border-[#e3e5f8]", "border-b", widthClass, heightClass)} key={hour} />
                        ))}
                    </div>
                    <div className={`grid absolute z-10 top-0 left-0 right-0 bottom-0`} key={day} style={{
                        gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                    }}>
                        {props.scheduleData.filter(course => course.day_w.trim() === day).map((course, index) => {
                            const day_w = course.day_w.trim();
                            return (
                                <div key={`${index}_${course.section_id}_${day}_${course.subject_code}`} className={clsx("w-full border rounded-md px-1 flex-col flex items-center justify-center", heightClass, dayColors[day_w]?.bg, dayColors[day_w]?.border, dayColors[day_w]?.text, props.canClick && dayColors[day_w]?.bgHover, props.canClick && "cursor-pointer")} style={{
                                    gridColumn: `${getPosition(course.time_from!)}/${getPosition(course.time_to!)}`,
                                }} >
                                    <Text fw={600} lineClamp={1}>{course.subject_code}</Text>
                                    <Text fw={600} size="sm" lineClamp={1}>{course.subject_name_en}</Text>
                                    <Text fw={400} size="xs" lineClamp={1}>{course.room_name_en} | Sec {course.section_code}</Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableCourse;
