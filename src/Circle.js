import { useRef, useEffect, useState } from 'react'
import { select } from 'd3'

function Circle() {
  const [data, setData] = useState([10, 20, 30, 20, 5, 20, 50])
  const circleSvgRef = useRef()

  useEffect(() => {
    const svgCircle = select(circleSvgRef.current)
    svgCircle
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('class', 'updated')
      .attr('r', (val) => val)
      .attr('cx', (val) => val)
      .attr('cy', (val) => val)
  }, [data])

  return (
    <div>
      <svg ref={circleSvgRef}></svg>
    </div>
  )
}

export default Circle
