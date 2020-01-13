import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../lib/style-guide'

const Circle = styled.circle`
  fill: none;
  stroke: ${Colors.AccordBlue1};
  stroke-linecap: round;
  stroke-linejoin: round;
`

const CircleBackground = styled.circle`
  fill: none;
  stroke: ${Colors.Border};
  stroke-linecap: round;
  stroke-linejoin: round;
`

const CircleProgressBar = ({ percentage }: { percentage: any }) => (
  <svg
    width={80}
    height={80}
    style={{ position: 'absolute' }}
    viewBox={'0, 0, 80, 80'}
  >
    <CircleBackground cx={40} cy={40} r={39} strokeWidth={`1px`} />
    <Circle
      cx={40}
      cy={40}
      r={39}
      strokeWidth={'1px'}
      transform={'rotate(-90 40 40)'}
      style={{
        strokeDasharray: 40 * Math.PI * 2,
        strokeDashoffset: (1 - percentage / 100) * 40 * Math.PI * 2
      }}
    />
  </svg>
)

export default CircleProgressBar
