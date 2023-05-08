import React from "react";
import StageOne from "./stages/StageOne";
import StageTwo from "./stages/StageTwo";

export default function CoursesAssignment({course}) {

    const [data, setData] = React.useState(course);

    return (
        <div>
            {data.stage === 1 && <StageOne data={data} setData={setData} />}
            {data.stage === 2 && <StageTwo data={data} setData={setData} />}
        </div>
    )
}