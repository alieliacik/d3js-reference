import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from 'd3'

const Bar = () => {
  const [data, setData] = useState([20, 30, 45, 20, 70, 65])
  const barSvgRef = useRef()
  useEffect(() => {
    const svgBar = select(barSvgRef.current)

    const xScale = scaleBand()
      .domain(data.map((val, ind) => ind))
      .range([0, 300])
      .padding(0.5)

    const yScale = scaleLinear().domain([0, 150]).range([150, 0])

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true) // below 75 still green, above 300 still red

    const yAxis = axisLeft(yScale).ticks(10)
    svgBar.select('.y-axis').call(yAxis)

    const xAxis = axisBottom(xScale).ticks(data.length - 1)
    svgBar.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis)

    svgBar
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (val, ind) => xScale(ind))
      .attr('y', -150)
      .attr('width', xScale.bandwidth()) // bandwidth(), width for each band.
      .style('transform', 'scale(1,-1)')
      .style('animation-delay', (val, ind) => `${ind}s`)
      .transition()
      .attr('fill', colorScale)
      .delay((val, ind) => ind * 50)
      .attr('height', (value) => 150 - yScale(value))
  }, [data])

  return (
    <>
      <Svg ref={barSvgRef}>
        <g className='x-axis' />
        <g className='y-axis' />
      </Svg>
      <button
        onClick={() => setData((prevState) => prevState.map((val) => val + 10))}
      >
        Update Data
      </button>
    </>
  )
}

export default Bar

const Svg = styled.svg`
  width: 100%;
  height: 300px;
  overflow: visible;
`
