import { useRef, useEffect } from "react";
import * as d3 from "d3";

type DayData = {
    day: string;
    SummedDispensingCurrent: number;
    SummedDispensingPrevious: number;
};

interface WeekData {
    week: string;
    dayData: DayData[];
}

type DispensingChartProps = {
    data: WeekData[];
};

export const DispensingChart = ({ data }: DispensingChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        const svg = d3.select(svgRef.current);

        const margin = { top: 20, right: 0, bottom: 30, left: 20 };
        const width = 600;
        const height = 400;
        const x = d3
            .scaleBand()
            .domain(data[0].dayData.map((d) => d.day))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const getMaxValue = (data: WeekData[]): number => {
            const values = data.flatMap((d) =>
                d.dayData.map((day) =>
                    Math.max(
                        day.SummedDispensingCurrent,
                        day.SummedDispensingPrevious
                    )
                )
            );
            const filteredValues = values.filter(
                (value) => value !== undefined
            ) as number[];
            return d3.max(filteredValues) || 0;
        };

        const y = d3
            .scaleLinear()
            .domain([0, getMaxValue(data)])
            .range([height, margin.top]);

        svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${x(d.week) || 0}, 0)`)
            .selectAll(".bar")
            .data((d) => d.dayData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.day)! || 0)
            .attr("y", (d) => y(d.SummedDispensingCurrent))
            .attr("height", (d) => height - y(d.SummedDispensingCurrent))
            .attr("width", x.bandwidth() / 2)
            .attr("fill", "steelblue");

        svg.selectAll("g")
            .data(data)
            .selectAll(".bar2")
            .data((d) => d.dayData)
            .enter()
            .append("rect")
            .attr("class", "bar2")
            .attr("x", (d) => (x(d.day) || 0) + x.bandwidth() / 2) // Using '|| 0' to handle the case where x(d.day) is undefined
            .attr("y", (d) => y(d.SummedDispensingPrevious))
            .attr("height", (d) => height - y(d.SummedDispensingPrevious))
            .attr("width", x.bandwidth() / 2)
            .attr("fill", "orange");

        svg.append("g")
            .attr("transform", `translate( 0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(5));
        svg.attr("width", width)
            .attr("height", height)
            .attr("viewBox", [
                0,
                0,
                width + margin.left + margin.right,
                height + margin.top + margin.bottom,
            ])
            .attr("style", "max-width: 100%; height: auto;");
    }, [data]);

    return <svg ref={svgRef} />;
};
