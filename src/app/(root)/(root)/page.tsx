"use client"
import { Card } from "@mantine/core";
import { redirect } from "next/navigation";


export default function Page() {
    return (<div className="flex gap-3">
        <Card withBorder>
            <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    <div>
                        <h2>บริหารหน่วยกิต</h2>
                    </div>
                    <div>
                        <button onClick={() => redirect("/credit-management")}>เข้าสู่หน้าบริหารหน่วยกิต</button>
                    </div>
                </div>
            </div>
        </Card>
    </div>)
}