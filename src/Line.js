import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisRight,
  svg,
} from 'd3'

function Line() {
  const [data, setData] = useState([10, 20, 30, 20, 5, 20, 50, 1])
  const pathSvgRef = useRef()

  useEffect(() => {
    const svgPath = select(pathSvgRef.current)

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300])

    const highestScore = [...data].sort((a, b) => b - a)[0]
    const yScale = scaleLinear().domain([0, 65]).range([150, 0])

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickFormat((index) => index + 1)
    svgPath
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis)

    const yAxis = axisRight(yScale).ticks(7)
    svgPath
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(yAxis)

    const myLine = line()
      .x((val, ind) => xScale(ind))
      .y((val) => yScale(val)) // .y(yScale) in case of using val.
      .curve(curveCardinal)

    svgPath
      .selectAll('.line')
      .data([data])
      .attr('class', 'line')
      .join('path')
      .attr('d', (val) => myLine(val)) // .attr('d', myLine) in case of using val.
      .attr('fill', 'none')
      .attr('stroke', 'red')
  }, [data])

  return (
    <div>
      <Svg ref={pathSvgRef}>
        <g className='x-axis' />
        <g className='y-axis' />
      </Svg>
    </div>
  )
}

export default Line

const Svg = styled.svg`
  height: 100%;
  width: 350px;
  overflow: 'visible';
`
