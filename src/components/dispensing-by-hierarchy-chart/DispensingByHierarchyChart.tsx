import { useRef, useEffect } from "react";
import * as d3 from "d3";

type DispensingByHierarchyChartProps = { data: number };

export const DispensingByHierarchyChart = ({
    data,
}: DispensingByHierarchyChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data) return;

        const svg = d3.select(svgRef.current);

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleLinear().domain([0, data]).range([0, width]);

        const y = d3
            .scaleBand()
            .domain(["TAT"])
            .range([height, 0])
            .padding(0.1);

        svg.selectAll("g").remove();

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g.selectAll(".bar")
            .data([data])
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", y("TAT")! + y.bandwidth() / 4)
            .attr("width", x(data))
            .attr("height", y.bandwidth() / 2)
            .attr("fill", "steelblue");

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append("g").call(d3.axisLeft(y));

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
