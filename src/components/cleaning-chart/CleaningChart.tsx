import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type Cleaning = {
    prevWeekCleaning: number;
    currWeekCleaning: number;
};

type CleaningChartProps = {
    data: Cleaning;
};

export const CleaningChart = ({ data }: CleaningChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);

        const margin = { top: 20, right: 0, bottom: 30, left: 20 };
        const width = 400;
        const height = 300;

        const x = d3
            .scaleBand()
            .domain(["Current Week", "Previous Week"])
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(5));

        const bars = svg
            .selectAll("rect")
            .data([data.currWeekCleaning, data.prevWeekCleaning]);

        bars.enter()
            .append("rect")
            .attr(
                "x",
                (d, i) => x(i === 0 ? "Current Week" : "Previous Week") || 0
            )
            .attr("y", (d) => y(d))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d) - margin.bottom)
            .attr("fill", (d, i) => (i === 0 ? "steelblue" : "orange"));

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

export default CleaningChart;
